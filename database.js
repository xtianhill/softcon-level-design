/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'softcon-leveldesign-database.cliymerdn9rz.us-east-1.rds.amazonaws.com',
  user     : 'hillcb',
  password : 'password',
  port     : 0,
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
    console.log('Connected to database.');
    var insertSQL = "INSERT INTO grid (title, width, height) VALUES ('test title', 69, 420)";
    connection.query(insertSQL, function(err, rows, fields) {
        if (err) {
          console.error('Database query failed: ' + err.stack);
          return;
        }
        if(rows) {
            console.log('Query successful.');
        }
    });
});

// connection.end();

 function toGrid(json) {
    var grid = JSON.parse(json);
    return grid;
 }

 function searchByTitle(title, database) {
    databas
 }