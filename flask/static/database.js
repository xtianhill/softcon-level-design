/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";

function storeGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        return false;
    }
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            alert("success! yassssssss");
            console.log(data);
            return data;
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
            alert("success! found item with title " + title + " in DB");
            console.log(data);
            return data;
        },
        failure: function(errMsg) {
            alert("failure: didn't find item in DB");
            return false;
        }
    });
}

function getAllTitles() {
    $.ajax({
        type: "GET",
        url: AWS_URL + "/api/v1/query-all-titles/",
        contentType: "application/json",
        success: function(data) {
            
        }
    });
}

function validJSON(myJSON) {
    if(myJSON.type == 'string') {
        myJSON = JSON.parse(myJSON);
    }
    try {
        var myTitle = myJSON["title"]
        var myData = myJSON["data"]
        if(myTitle.length == 0 || myData.length == 0) {
            return false;
        }
        if(typeof myData != 'string') {
            return false;
        }
    }
    catch(err) {
        return false;
    }
    return true;
}

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;