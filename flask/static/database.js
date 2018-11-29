/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

/*
|------------------------------------------------------------------------------
| Database
|------------------------------------------------------------------------------
|
| This file contains the Database utility functions.
|
|------------------------------------------------------------------------------
*/


const HTTP_OK = "200";
const HTTP_CREATED = "201";
const HTTP_BADREQUEST = "400";
const HTTP_NOTFOUND = "404";
const HTTP_CONFLICT = "409";

// const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
const AWS_URL = "http://127.0.0.1:5000/";

//store a grid, which is a JSON, in the database
function storeGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw "invalid JSON given";
    }
    var success = false;
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: stored the following grid in DB: " + data);
            alert("Success: stored the following grid in DB via success callback");
        },
        failure: function(errMsg) {
            console.log("failure: couldn't store grid");
            alert("failure: couldn't store grid");
        }
    }).done(function(data) {
            alert("Success: stored the following grid in DB via done callback");
        success = true;
    });
    return success;
}

//check if the database is running
function isRunning() {
    var success = false;
    $.ajax({
        type: "GET",
        url: AWS_URL,
        success: function(data) {
            console.log("success: backend is running");
        },
        failure: function(errMsg) {
            console.log("failure: backend cannot be reached");
        }
    }).done(function(data) {
        success = true;
    });
    return success;
}


//delete a grid from the database
function deleteGrid(title, cb) {
    if(title.length <= 0 || title == null) {
        throw "invalid title given";
    }
    var success;
    $.ajax({
        type: "GET",
        async: true,
        url: AWS_URL + "api/v1/delete-grid/" + title,
        success: function(data) {
            console.log("success: deleted grid with title " + title + " in DB via success callback");
            success = true;
            cb(data);
        },
        failure: function(errMsg) {
            alert("failure: didn't delete item with title: " + title);
            success = false;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status
            if (status == HTTP_NOTFOUND) {
                alert("Error: title [" + title + "] not found.");
            } else {
                alert("Error: operation could not be performed.");
            }
        }
    });
    return success;
}


//update a grid that is already in the database
function updateGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw "invalid JSON given";
    }
    var success = false;
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/update-grid/",
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
    return success;
}


//retrieve a grid from the database using its title
function getByTitle(title) {
    console.log('title is: '+ title);
    if(title.length == 0) {
        throw "invalid title given";
    }
    var grid = null;
    $.ajax({
        type: "GET",
        url: AWS_URL + "api/v1/search-grid/" + title,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: found item with title " + title + " in DB");
            grid = data;
        },
        failure: function(errMsg) {
            console.log("failure: didn't find item in DB");
            grid = null;
        }
    });
    if(grid == null) {
        throw "didn't retrieve grid with title [" + title + "]";
    }
    return grid;
}


//return all the titles of the levels stored in the database
function getAllTitles() {
    var titles = null;
    $.ajax({
        type: "GET",
        url: AWS_URL + "/api/v1/query-all-titles/",
        contentType: "application/json",
        success: function(data) {
            console.log("success! found the following titles:");
            console.log(data);
            titles = data;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't retrieve titles")
            titles = null;
        }
    });
    if(titles == null) {
        throw "didn't retrieve titles";
    }
    return titles;
}


//function to check if a JSON is valid to store in the database
function validJSON(myJSON) {
    myJSON = JSON.parse(myJSON);
    console.log("validJSON: myJSON: " + myJSON);
    console.log("validJSON: myJSON type: " + myJSON.type);
    if(myJSON.type == 'string') {
        console.log("validJSON: given a string");
        myJSON = JSON.parse(myJSON);
    }
    try {
        var myTitle = myJSON["title"]
        var myData = myJSON["data"]
        if(myTitle.length == 0 || myData.length == 0) {
            console.log("validJSON: field(s) are length 0");
            return false;
        }
        if(typeof myData != 'string') {
            console.log("validJSON: data isn't a string");
            return false;
        }
    }
    catch(err) {
        console.log("validJSON: caught error");
        console.log(err)
        return false;
    }
    return true;
}

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;
module.exports.updateGrid = updateGrid;
module.exports.isRunning = isRunning;
module.exports.deleteGrid = deleteGrid;