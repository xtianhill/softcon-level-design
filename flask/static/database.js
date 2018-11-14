/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

const AWS_URL = "https://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";

function storeGrid(grid) {
    console.log('grid is: '+ grid);
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(grid),
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