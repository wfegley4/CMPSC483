import { parse } from '@vanillaes/csv';
import { createConnection } from 'mysql';
import { readFile } from 'fs';

// CONSTANTS
// This first block varies to make it run on your specific computer.
const studentsCSVPath = 'XXXXXXXXX/studentsFinal.csv'
const projectsCSVPath = 'XXXXXXXXX/projectsFinal.csv'
const assignmentsCSVPath = 'XXXXXXXXX/studentAssignments.csv'
const mySQLPassword = 'XXXXXXXXXXXXXXXX'


const databaseName = 'capstone'
const studentTableName = 'students'
const projectTableName = 'projects'
const assignmentsTableName = 'assignments'

const mySQLConnection = createConnection({
  host: 'localhost',
  user: 'root',
  password: mySQLPassword
});

const databaseConnection = createConnection({
  host: 'localhost',
  user: 'root',
  password: mySQLPassword,
  database: databaseName
});


// Main code.
connectToMySQL(function() {
  createDatabase(function() {
    connectToDatabase(function() {
      createTables(function() {
        // Comment out to keep database to view in mySQL workbench.
        dropDatabase(function() {

        });
      });
    });
  });
});


function connectToMySQL(callback) {
  mySQLConnection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL!');
    callback();
  });
}


function createDatabase(callback) {
  mySQLConnection.query(`CREATE DATABASE ${databaseName}`, function(err, result) {
    if (err) throw err;
    console.log('Database created!');
    callback();
  });
}

function connectToDatabase(callback) {
  databaseConnection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the Database!');
    callback();
  });
}

function dropDatabase(callback) {
  databaseConnection.query(`DROP DATABASE ${databaseName}`, function(err, result) {
    if (err) throw err;
    console.log('Database dropped!');
    callback();
  });
}

function csvToTable(filePath, tableName, callback) {
  readFile(filePath, 'utf8', function(err, data) {
    let students = parse(data.toString());
    let query = `CREATE TABLE ${tableName} (name VARCHAR(255), address VARCHAR(255))`;
    databaseConnection.query(query, function(err, result) {
      if (err) throw err;
      console.log('Table created!');
      callback();
    });
  });
}

function createTables(callback) {
  csvToTable(studentsCSVPath, studentTableName, function() {
    csvToTable(projectsCSVPath, projectTableName, function() {
      csvToTable(assignmentsCSVPath, assignmentsTableName, function() {
        callback();
      });
    });
  });
}
