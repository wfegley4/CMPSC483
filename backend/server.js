const cors = require("cors");
const { application } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const SQL = require("sql-template-strings");
const writeCSV = require("./csvWrite.js");
const app = express();
const corsOptions = {};

console.log("Server is running");

const {
  addAssignment,
  addPreference,
  addProject,
  addStudent,
  databaseConnection,
  connectToMySQL,
  connectToDatabase,
  getAssignmentsQuery,
} = require("./db.js");

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

let preferences = undefined;
let projects = undefined;
let students = undefined;
let studentsNoSurvey = undefined;

function databaseSetup(callback) {
  connectToMySQL(() => {
    connectToDatabase(() => {
      callback();
    });
  });
}

databaseSetup(() => {
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
});
const PORT = process.env.PORT || 8081;

// Gets all assignments.
app.get("/api/assignments", async (req, res) => {
  const query = getAssignmentsQuery();
  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Assignments Retrieved!");
    res.json(result);
  });
});

app.get("/api/projects", async (req, res) => {
  const query = SQL`SELECT Projects.id, Projects.company, Projects.title, Projects.primary_major, Projects.secondary_major, Projects.tertiary_majors, Projects.confidentiality, Projects.ip, Projects.course_time, Projects.course_name, Projects.prototype, COUNT(Assignments.student_id) as count,
  Count(case when students.major = projects.primary_major then 1 else null end) as primary_count, Count(case when students.major = projects.secondary_major then 1 else null end) as secondary_count
  FROM Projects
  Inner JOIN Assignments ON Projects.id = Assignments.project_id
  INNER JOIN Students ON Assignments.student_id = Students.id
  GROUP BY Projects.id
  ORDER BY Projects.id`;
  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Projects Retrieved!");
    res.json(result);
  });
});

app.get("/api/students", async (req, res) => {
  const query = SQL`SELECT s.id, s.first_name, s.last_name, s.major, 
                                    s.nda, s.ip, s.on_campus,
                                    a.project_id
                            FROM assignments AS a
                            INNER JOIN students AS s
                                ON a.student_id = s.id`;
  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Students Retrieved!");
    res.json(result);
  });
});

app.put("/api/students/:id", async (req, res) => {
  const { studentID, projectID } = req.body;

  const query = SQL`UPDATE assigments 
            SET project_id = ${projectID} 
            WHERE student_id = ${studentID}`;
  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Students Updated!");
    res.json(result);
  });
});

app.get("/api/dashboard-major", async (req, res) => {
  const query = SQL`SELECT
                        s.major, COUNT(*) AS count
                        FROM students AS s
                        GROUP BY s.major;`;

  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Major Distribution Retrieved!");
    res.json(result);
  });
});

app.get("/api/student-assignments", async (req, res) => {
  const query = SQL`SELECT *
                    FROM students AS s
                    INNER JOIN assignments AS a
                    ON s.id = a.student_id`;

  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Student Assignments Received!");
    res.json(result);
  });
});

app.get("/api/student-preferences/:id", async (req, res) => {
  const { studentID } = req.body;
  const query = SQL`SELECT *
                    inner join projects as p
                    on pr.project_id = p.id 
                    where pr.student_id = ${studentID}`;

  databaseConnection.execute(query, (error, result) => {
    if (error) {
      res
        .status(401)
        .json({ message: `Error occurred when querying database: ${error}` });
    }
    console.log("Student Assignments Received!");
    res.json(result);
  });
});

app.put("/api/write", async (req, res) => {
  writeCSV.writeAssignmentsCSV(() => {
    res.status(200).json("OK");
  });
});

app.put("/api/switch/", async (req, res) => {
  console.log(req.body);
  const studentID = req.body.studentID;
  const projectID = req.body.projectID;
  const query = SQL`UPDATE assignments 
  SET project_id = ${projectID} 
  WHERE student_id = ${studentID}`;

  databaseConnection.execute(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(401).json({
        message: `Error occurred when swapping student database: ${error}`,
      });
    } else {
      console.log("Student Swapped!");
      res.status(200).json("OK");
    }
  });
});
