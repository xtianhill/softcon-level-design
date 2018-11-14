(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.database = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    var grid_to_send = {
        title : grid123.title,
        data : JSON.stringify(grid123)
    };
    console.log('grid123 is: ' + JSON.stringify(grid123)),
    console.log('grid_to_send is: ' + JSON.stringify(grid_to_send)),
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(grid_to_send),
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

},{}]},{},[1])(1)
});
