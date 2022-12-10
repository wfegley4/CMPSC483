let SQL = require("sql-template-strings");
let createCsvWriter = require("csv-writer").createObjectCsvWriter;
let fs = require("fs");

// ==================================== CSV WRITING FROM TABLES ====================================

const {
  databaseConnection,
  connectToMySQL,
  connectToDatabase,
} = require("./db.js");

function databaseSetup(callback) {
  connectToMySQL(() => {
    connectToDatabase(() => {
      callback();
    });
  });
}
async function writeAssignmentsCSV(callback) {
  const csvWriter = createCsvWriter({
    path: "tempStudentAssignments.csv",
    header: [
      { id: "major", title: "Major" },
      { id: "projectID", title: "ProjectID" },
      { id: "timeA", title: "TimeA" },
      { id: "timeB", title: "TimeB" },
      { id: "timeC", title: "TimeC" },
      { id: "comment", title: "Comments" },
      { id: "nda", title: "Student_NDA" },
      { id: "ip", title: "Student_IP" },
      { id: "studentID", title: "campus_id" },
      { id: "lastName", title: "last_name" },
      { id: "firstName", title: "first_name" },
      { id: "onCampus", title: "OnCampus" },
    ],
  });

  let data = [];
  let assignments = await getAssignments();
  for (const assignment of assignments) {
    let row = {};
    row["studentID"] = assignment.student_id;

    let student = await getStudentDataForWrite(assignment.student_id);
    student = student[0];
    row["firstName"] = student.first_name;
    row["lastName"] = student.last_name;
    row["major"] = student.major;
    row["nda"] = student.nda;
    row["ip"] = student.ip;
    row["onCampus"] = student.on_campus == 1 ? "Yes" : "No";

    console.log(assignment.project_id);
    if (assignment.project_id !== null) {
      row["projectID"] = assignment.project_id;
      let preference = await getPreferenceDataForWrite(
        assignment.student_id,
        assignment.project_id
      );
      preference = preference[0];
      row["comment"] = preference.comment;
      row["timeA"] = preference.time_a;
      row["timeB"] = preference.time_b;
      row["timeC"] = preference.time_c;
    } else {
      row["projectID"] = "&nbsp;";
      const preferenceList = await getNoSurveyTimeForWrite(
        assignment.student_id
      );
      if (preferenceList.length !== 0) {
        row["comment"] = "&nbsp;";
        row["timeA"] = preferenceList[0].time_a;
        row["timeB"] = "&nbsp;";
        row["timeC"] = "&nbsp;";
      }
    }
    data.push(row);
  }
  await csvWriter.writeRecords(data);
  console.log("CSV Written!");
  callback();
}

// ==================================== QUERIES ====================================

// Gets all assignments.
function getAssignments() {
  return new Promise(function (resolve, reject) {
    const query = SQL`SELECT * FROM assignments`;
    databaseConnection.query(query, function (err, result) {
      if (err) reject(err);
      else {
        console.log("Assignments Retrieved!");
        resolve(result);
      }
    });
  });
}

function getStudentDataForWrite(studentID) {
  return new Promise(function (resolve, reject) {
    const query = SQL`SELECT first_name, last_name, major, nda, ip, on_campus
                            FROM students
                            WHERE id = ${studentID}`;
    databaseConnection.query(query, function (err, result) {
      if (err) reject(err);
      else {
        console.log("Student Data Retrieved!");
        resolve(result);
      }
    });
  });
}

function getPreferenceDataForWrite(studentID, projectID) {
  return new Promise(function (resolve, reject) {
    const query = SQL`SELECT comment, time_a, time_b, time_c
                            FROM preferences
                            WHERE student_id = ${studentID} AND project_id = ${projectID}`;
    databaseConnection.query(query, function (err, result) {
      if (err) reject(err);
      else {
        console.log("Preferences Retrieved!");
        resolve(result);
      }
    });
  });
}

function getNoSurveyTimeForWrite(studentID) {
  return new Promise(function (resolve, reject) {
    const query = SQL`SELECT time_a
                            FROM preferences
                            WHERE student_id = ${studentID}`;
    databaseConnection.query(query, function (err, result) {
      if (err) reject(err);
      else {
        console.log("Preferred Time Retrieved!");
        resolve(result);
      }
    });
  });
}

module.exports = {
  writeAssignmentsCSV,
};
