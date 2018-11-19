/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";

function storeGrid(gridJSON) {
    var success = false;
    console.log('gridJSON is: ' + gridJSON);
    if(!validJSON(gridJSON)) {
        return success;
    }
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: stored the following grid in DB: " + data);
            alert("Success: stored the following grid in DB");
            success = true;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't store grid");
            alert("failure: couldn't store grid");
            success = false;
        }
    });
    return success;
}

function isRunning() {
    return $.ajax({
        type: "GET",
        url: AWS_URL,
        async: false,
        success: function(data) {
            console.log("success: backend is running");
            return true;
        },
        failure: function(errMsg) {
            console.log("failure: backend cannot be reached");
            return false;
        }
    });
}

function deleteGrid(title) {
    console.log('title is: '+ title);
    var success;
    $.ajax({
        type: "GET",
        url: AWS_URL + "api/v1/delete-grid/" + title,
        success: function(data) {
            console.log("success: deleted grid wwith title " + title + " in DB");
            success = true;
        },
        failure: function(errMsg) {
            alert("failure: didn't delete item with title: " + title);
            success = false;
        }
    });
}

function updateGrid(gridJSON) {
    console.log('gridJSON is: ' + gridJSON);
    success = false;
    if(!validJSON(gridJSON)) {
        return success;
    }
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/update-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: updated the following grid in DB: " + data);
            console.log(data);
            success = true;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't store grid");
            success = false;
        }
    });
}

function getByTitle(title) {
    console.log('title is: '+ title);
    var grid;
    $.ajax({
        type: "GET",
        url: AWS_URL + "api/v1/search-grid/" + title,
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(data) {
            alert("success! found item with title " + title + " in DB");
            console.log(data);
            grid = data;
        },
        failure: function(errMsg) {
            alert("failure: didn't find item in DB");
            return null;
        }
    });
    return grid;
}

function getAllTitles() {
    $.ajax({
        type: "GET",
        url: AWS_URL + "/api/v1/query-all-titles/",
        contentType: "application/json",
        success: function(data) {
            console.log("success! found the following titles:");
            console.log(data);
            return data;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't retrieve titles")
            return null;
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

// module.exports.storeGrid = storeGrid;
// module.exports.getByTitle = getByTitle;
// module.exports.getAllTitles = getAllTitles;
// module.exports.validJSON = validJSON;

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;
module.exports.updateGrid = updateGrid;
module.exports.isRunning = isRunning;
module.exports.deleteGrid = deleteGrid;