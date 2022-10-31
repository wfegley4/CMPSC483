let csv = require('csv-parse');
let createCsvWriter = require('csv-writer').createObjectCsvWriter;
let fs = require('fs');
let mySQL = require('mysql')
let SQL = require('sql-template-strings');


// Edit with your MySQL Password:
const mySQLPassword = 'Best40MSOfMyLife'

const preferencesCSV = 'studentsFinal.csv';
const projectsCSV = 'projectsFinal.csv';
const studentsCSV = 'studentAssignments.csv';
const studentsNoSurveyCSV = 'Students Without Prefs.csv';

const majors = ['BME', 'CMPEN', 'CMPSC', 'DS', 'ED', 'EE', 'EGEE', 'ESC', 'IE', 'MATSE', 'ME'];

let preferences;
let projects;
let students;
let studentsNoSurvey;

// MySQL connection objects.
const mySQLConnection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: mySQLPassword
});

const databaseName = 'capstone'
const databaseConnection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: mySQLPassword,
    database: databaseName
});


// Main code.
databaseSetup(function () {
    readCSVs(function () {
        // Test Data.
        addStudent('drs5972', 'Dan', 'Stebbins', 'CMPSC', 1, 1, 0, function() {});
        addProject('XKCD', 'PSU', 'Test Project', 'CMPSC', 'EE', 'ME; CMPEN', 1, 0, '4 AM', 'CMPSC -2^10', 1, function() {});
        addPreference('XKCD', 'drs5972', '8 AM', '10 AM', '4 AM', 2, 'Please no anything but this project I hate it.', function() {});
        addAssignment('XKCD', 'drs5972', function() {});
        writeAssignmentsCSV(function() {});
        // loadTables(function () { });
    });
});


// ==================================== DATABASE SETUP ====================================

function databaseSetup(callback) {
    connectToMySQL(function () {
        createDatabase(function () {
            connectToDatabase(function () {
                createTables(function () {
                    callback();
                });
            });
        });
    });
}

function connectToMySQL(callback) {
    mySQLConnection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to MySQL!');
        callback();
    });
}

function createDatabase(callback) {
    mySQLConnection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, function (err, result) {
        if (err) throw err;
        console.log('Database created!');
        callback();
    });
}

function connectToDatabase(callback) {
    databaseConnection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to the database!');
        callback();
    });
}

// Really does delete all data, be careful.
function dropDatabase(callback) {
    databaseConnection.query(`DROP DATABASE ${databaseName}`, function (err, result) {
        if (err) throw err;
        console.log('Database dropped!');
        callback();
    });
}


// ==================================== TABLE CREATION ====================================

function createTables(callback) {
    createAssignmentsTable(function () {
        createPreferencesTable(function () {
            createProjectsTable(function () {
                createStudentsTable(function () {
                    callback();
                });
            });
        });
    });
}

function createAssignmentsTable(callback) {
    const query = (SQL `CREATE TABLE IF NOT EXISTS assignments (
                        project_id          VARCHAR(64),
                        student_id          VARCHAR(64))`);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        console.log('Assignments table created!');
        callback();
    });
}

function createPreferencesTable(callback) {
    const query = (SQL `CREATE TABLE IF NOT EXISTS preferences (
                        project_id          VARCHAR(64),
                        student_id          VARCHAR(64),
                        time_a              VARCHAR(64),
                        time_b              VARCHAR(64), 
                        time_c              VARCHAR(64),
                        preference          TINYINT(1),
                        comment            TEXT)`);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        console.log('Preferences table created!');
        callback();
    });
}

function createProjectsTable(callback) {
    const query = (SQL `CREATE TABLE IF NOT EXISTS projects (
                        id                  VARCHAR(64),
                        company             VARCHAR(255),
                        title               VARCHAR(255),
                        primary_major       VARCHAR(16),
                        secondary_major     VARCHAR(16),
                        tertiary_majors     VARCHAR(255),
                        confidentiality     TINYINT(1),
                        ip                  TINYINT(1),
                        course_time         VARCHAR(64),
                        course_name         VARCHAR(64),
                        prototype           TINYINT(1))`);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        console.log('Projects table created!');
        callback();
    });
}

function createStudentsTable(callback) {
    const query = (SQL `CREATE TABLE IF NOT EXISTS students (
                        id                  VARCHAR(64),
                        first_name           VARCHAR(255),
                        last_name           VARCHAR(255),
                        major               VARCHAR(16),
                        nda                 TINYINT(1),
                        ip                  TINYINT(1),
                        on_campus           TINYINT(1))`);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        console.log('Students table created!');
        callback();
    });
}


// ==================================== CSV READING AND TABLE LOADING ====================================

function readCSVs(callback) {
    readCSV(preferencesCSV, csv.parse({ delimiter: ',' }, function (err, data) { preferences = data.slice(1, data.length) }), function () {
        readCSV(projectsCSV, csv.parse({ delimiter: ',' }, function (err, data) { projects = data.slice(1, data.length) }), function () {
            readCSV(studentsCSV, csv.parse({ delimiter: ',' }, function (err, data) { students = data.slice(1, data.length) }), function () {
                readCSV(studentsNoSurveyCSV, csv.parse({ delimiter: ',' }, function (err, data) { studentsNoSurvey = data.slice(1, data.length) }), function () {
                    callback();
                });
            });
        });
    });
}

function readCSV(file, parser, callback) {
    fs.createReadStream(file).pipe(parser).on('error', function (err) { console.log(err) }).on('close', callback);
}

function loadTables(callback) {
    loadAssignmentsTable(function () {
        loadPreferencesTable(function () {
            loadProjectsTable(function () {
                loadStudentsTable(function () {
                    callback();
                });
            });
        });
    });
}

async function loadAssignmentsTable(callback) {
    for (const student of students) {
        // projectID, studentID.
        await addAssignment(student[1], student[8], function () { });
    }
    callback();
}

async function loadPreferencesTable(callback) {
    for (const preference of preferences) {
        // projectID, studentID, timeA, timeB, timeC, preference, comment.
        await addPreference(preference[1], preference[9], preference[2], preference[3], preference[4], preference[5], preference[6], function () { });
    }
    callback();
}

async function loadProjectsTable(callback) {
    for (const project of projects) {
        // Getting primary, secondary, and tertiary majors from 1-2-3 format 
        let primary = "";
        let secondary = "";
        let tertiary = "";
        for (let j = 0; j < majors.length; j++) {
            if (project[j + 3] == 1) primary = majors[j];
            else if (project[j + 3] == 2) secondary = majors[j];
            else if (project[j + 3] == 3) tertiary += majors[j] + ";";
        }

        // id, company, title, primary, secondary, tertiary, confidentiality, ip, courseTime, courseName, prototype.
        await addProject(project[0], project[1], project[2], primary, secondary, tertiary, project[14], project[15], project[16], project[17], project[18], function () { });
    }
    callback();
}

async function loadStudentsTable(callback) {
    for (const student of students) {
        // id, first, last, major, nda, ip, onCampus.
        await addStudent(student[8], student[10], student[9], student[0], student[6], student[7], (student[11] == "Yes") ? 1 : 0, function () { });
    }
    for (const student of studentsNoSurvey) {
        // Assume NULL for major and 0 for NDA, IP, and onCampus until further notice.
        await addStudent(student[2].substring(0, student[2].indexOf("@")), student[0], student[1], '', 0, 0, 0, function () { });
    }
    callback();
}

// ==================================== CSV WRITING FROM TABLES ====================================

// I'm assuming the other CSVs don't need to be written to, but they can be added later if they do.
async function writeAssignmentsCSV(callback) {
    const csvWriter = createCsvWriter({
        path: 'tempStudentAssignments.csv',
        header: [
          {id: 'major', title: 'Major'},
          {id: 'projectID', title: 'ProjectID'},
          {id: 'timeA', title: 'TimeA'},
          {id: 'timeB', title: 'TimeB'},
          {id: 'timeC', title: 'TimeC'},
          {id: 'comments', title: 'Comments'},
          {id: 'nda', title: 'Student_NDA'},
          {id: 'ip', title: 'Student_IP'},
          {id: 'studentID', title: 'campus_id'},
          {id: 'lastName', title: 'last_name'},
          {id: 'firstName', title: 'first_name'},
          {id: 'onCampus', title: 'OnCampus'},
        ]
    });

    const data = [
        // {
        //   name: 'John',
        //   surname: 'Snow',
        //   age: 26,
        //   gender: 'M'
        // }, {
        //   name: 'Clair',
        //   surname: 'White',
        //   age: 33,
        //   gender: 'F',
        // }, {
        //   name: 'Fancy',
        //   surname: 'Brown',
        //   age: 78,
        //   gender: 'F'
        // }
    ];
    var assignments = await getAssignments();
    for (const assignment of assignments) {

    }
    console.log(temp)
    callback();
}


// ==================================== QUERIES ====================================

// Gets all assignments.
function getAssignments() {
    return new Promise(function (resolve, reject) {
        const query = (SQL `SELECT * FROM assignments`);
        databaseConnection.query(query, function (err, result) {
            if (err) throw err;
            else {
                console.log('Assignments Retrieved!');
                resolve(result);
            }
        });
    });
}

// Adding rows to tables.
function addAssignment(studentID, projectID) {
    return new Promise(function (resolve, reject) {
        const query = (SQL `INSERT INTO assignments
                            (student_id, project_id)
                            VALUES (${studentID}, ${projectID})`);
        databaseConnection.query(query, function (err, result) {
            if (err) throw err;
            else {
                console.log('Assignment added!');
                resolve();
            }
        });
    });
}

function addPreference(projectID, studentID, timeA, timeB, timeC, preference, comment) {
    return new Promise(function (resolve, reject) {
        const query = (SQL `INSERT INTO preferences
                            (project_id, student_id, time_a, time_b, time_c, preference, comment)
                            VALUES (${projectID}, ${studentID}, ${timeA}, ${timeB}, ${timeC}, ${preference}, ${comment})`);
        databaseConnection.query(query, function (err, result) {
            if (err) reject(err);
            else {
                console.log('Preference added!');
                resolve();
            }
        });
    });
}

function addProject(id, company, title, primary, secondary, tertiary, confidentiality, ip, courseTime, courseName, prototype) {
    return new Promise(function (resolve, reject) {
        const query = (SQL `INSERT INTO projects
                            (id, company, title, primary_major, secondary_major, tertiary_majors, confidentiality, ip, course_time, course_name, prototype)
                            VALUES (${id}, ${company}, ${title}, ${primary}, ${secondary}, ${tertiary}, ${confidentiality}, ${ip}, ${courseTime}, ${courseName}, ${prototype})`);
        databaseConnection.query(query, function (err, result) {
            if (err) reject(err);
            else {
                console.log('Project added!');
                resolve();
            }
        });
    });
}

function addStudent(id, first, last, major, nda, ip, onCampus, callback) {
    return new Promise(function (resolve, reject) {
        const query = (SQL `INSERT INTO students
                            (id, first_name, last_name, major, nda, ip, on_campus)
                            VALUES (${id}, ${first}, ${last}, NULLIF(${major}, ''), ${nda}, ${ip}, ${onCampus})`);
        databaseConnection.query(query, function (err, result) {
            if (err) reject(err);
            else {
                console.log('Student added!');
                resolve();
            }
        });
    });
}


// Given a number, return all the teams that have less than that number of students.
function getTeamsAbove(n, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a number, return all the teams that have less than that number of students.
function getTeamsBelow(n, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a project and a major, return how many students of that major are on that project.
function getMajorCount(projectID, major, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a project, return whether or not it has the right amount of primary, secondary, and tertiary majors.
function holdsMajorInequality(projectID, callback) {
    // Put the query in the ``. Remember to use getMajorInequality().
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a student, return a list of other projects they could be moved to according to their preferences and major.
function getAlternateProjects(studentID, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a project, return all display information for that project.
function getProjectData(projectID, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a student, return all display information for that student.
function getStudentData(studentID, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a project, return all display information for all of it's students.
function getStudentsInProject(projectID, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}

// Given a student and a project, update the student’s entry in the assignments table to move them to that project.
function updateAssignment(studentID, projectID, callback) {
    // Put the query in the ``.
    const query = (SQL ``);
    databaseConnection.query(query, function (err, result) {
        if (err) throw err;
        // Do something with the result.
        callback();
    });
}