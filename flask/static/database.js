/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";

function storeGrid(grid) {
    var grid123 = {width:100, height:100, title:"test grid 2", squares:[[element1, element2]]}
    console.log('grid123 is: ' + JSON.stringify(grid123)),
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(grid123),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            alert("success! yassssssss");
            console.log(data);
            return true;
        },
        failure: function(errMsg) {
            alert("you're straight :(");
            return false;
        }
    });
}

function getByTitle(title) {
    console.log('title is: '+ title);
    $.ajax({
        type: "GET",
        url: AWS_URL + "api/v1/search-grid/" + title,
        // The key needs to match your method's input parameter (case-sensitive).
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            alert("success! yassssssss");
            console.log(data);
            return true;
        },
        failure: function(errMsg) {
            alert("you're straight :(");
            return false;
        }
    });
}

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
