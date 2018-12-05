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

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
// const AWS_URL = "http://127.0.0.1:5000/";
const SUCCESS_MSG = "BACKEND RUNNING";

//store a grid, which is a JSON, in the database
function storeGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw new Error("invalid JSON given");
    }
    var success;
    try {
        success = $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/add-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("Success: stored [" + data + "] in database.");
                alert("Success: grid successfully stored.");
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
                alert("Error: operation could not be performed.");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_CONFLICT) {
                    console.log("Error: HTTP CONFLICT (" + HTTP_CONFLICT + ")");
                    alert("That title is taken; please choose another name.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

// checks if the database is running
async function isRunning() {
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            dataType: "text",
            url: AWS_URL + "api/v1/backend-up/",
            success: function(data) {
                alert("Backend is running");
                console.log("success: backend is running");
            },
            failure: function(errMsg) {
                console.log("failure: backend cannot be reached");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("error: " + textStatus);
            }
        });
    } catch(err) {
        console.log(err);
        return false;
    }
    return success==SUCCESS_MSG;
}

async function deleteGrid(title) {
    if(title.length <= 0 || title == null) {
        throw new Error("invalid title given");
    }
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            async: true,
            url: AWS_URL + "api/v1/delete-grid/" + title,
            success: function(data) {
                alert("Success: grid successfully deleted.");
                console.log("success: deleted grid in DB via success callback");
            },
            failure: function(errMsg) {
                alert("Sorry, something went wrong. The grid was not deleted.");
                console.log("failure: didn't delete item");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_NOTFOUND) {
                    alert("Error: the grid was not found.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

//update a grid that is already in the database
async function updateGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
        throw new Error("invalid JSON given");
    }
    try {
        var success = await $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/update-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("success: updated the following grid in DB: " + data);
                console.log(data);
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

//retrieve a grid from the database using its title
async function getByTitle(title) {
    if(title.length == 0) {
        throw new Error("invalid title given");
    }
    var grid;
    try {
        grid = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/search-grid/" + title,
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log("success: found item with title " + title + " in DB");
            },
            failure: function(errMsg) {
                console.log("failure: didn't find item in DB");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(error) {
        console.log(error);
    }
    if(grid == null) {
        throw new Error("didn't retrieve grid with title [" + title + "]");
    }
    return grid;
}

//return all the titles of the levels stored in the database
async function getAllTitles() {
    var titles;
    try {
        titles = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/query-all-titles/",
            contentType: "application/json",
            // dataType: "json",
            success: function(data) {
                console.log("success! found the following titles:");
                console.log(data);
                // titles = data;
            },
            failure: function(errMsg) {
                console.log("failure: couldn't retrieve titles")
                // titles = null;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The titles could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(err) {
        console.log(err);
    }
    if(titles == null) {
        throw new Error("didn't retrieve titles");
    }
    return titles;
}


//function to check if a JSON is valid to store in the database
function validJSON(myJSON) {
    myJSON = JSON.parse(myJSON);
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
