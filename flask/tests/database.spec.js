const Database = require('../static/database-browserify.js');
// const jasmine = require('../../node_modules/jasmine-core/lib/jasmine-core/');
// const jasmine = require('../../node_modules/jasmine-ajax');
// const jasmine = require('../../spec/helpers/mock-ajax.js')

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";

describe('Valid JSON Tests', function() {
    var validJSON1 = JSON.parse('{ "title" : "mytitle1", "data" : "my data 1" }');
    var validJSON2 = JSON.parse('{ "title" : "mytitle2", "data" : "my data 12" }');
    var validJSON3 = JSON.parse('{ "title" : "mytitle3", "data" : "my data 123" }');

    var invalidJSON1 = JSON.parse('{ "title" : "", "data" : "my data 123" }');
    var invalidJSON2 = JSON.parse('{ "title" : "mytitle3", "data" : "" }');
    var invalidJSON3 = JSON.parse('{ "title" : "", "data" : "" }');
    var invalidJSON4 = JSON.parse('{ "notatitle" : "bad title", "notdata" : "bad data" }');
    var invalidJSON5 = JSON.parse('{ "title" : "atitle", "data" : 123456789 }');
    var invalidJSON6 = JSON.parse('{ "title" : "anothertitle", "data" : 0}');

    it('should test that a given JSON with nonempty title and data fields is treated as valid', function() {
        expect(Database.validJSON(validJSON1)).toBeTruthy();
        expect(Database.validJSON(validJSON2)).toBeTruthy();
        expect(Database.validJSON(validJSON3)).toBeTruthy();
    });
    it('should test that a given JSON has title and data fields', function(){
        expect(Database.validJSON(invalidJSON4)).toBeFalsy();
    });
    it('should test that a given JSON does not have an empty data field', function() {
        expect(Database.validJSON(invalidJSON2)).toBeFalsy();
        expect(Database.validJSON(invalidJSON3)).toBeFalsy();
    });
    it('should test that a given JSON does not have an empty title field', function(){
        expect(Database.validJSON(invalidJSON1)).toBeFalsy();
        expect(Database.validJSON(invalidJSON3)).toBeFalsy();
    });
    it('should test that a given JSON does not have an incorrectly filled data field', function() {
        expect(Database.validJSON(invalidJSON5)).toBeFalsy();
        expect(Database.validJSON(invalidJSON6)).toBeFalsy();
    });
});

describe('REST API Tests', function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    it('should test if the backend is running', function() {
        // console.log(Database.getByTitle('vcbc'))
        // expect(Database.isRunning()).toBeTruthy();
        var doneFn = jasmine.createSpy("success");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(args) {
            if (this.readyState == this.DONE) {
              doneFn(this.responseText);
            }
        };
        xhr.open("GET", AWS_URL);
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL);
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status" : 200,
            "contentType" : "application/json",
            "responseText" : "SUCCESS: backend is running" 
        });
        expect(doneFn).toHaveBeenCalledWith('SUCCESS: backend is running');
    });
    it('should test if the backend is running', function() {
        var doneFn = jasmine.createSpy();

        Database.isRunning();
        console.log(Database.isRunning());

        console.log(jasmine.Ajax.requests.mostRecent().url);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL);
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status" : 200,
            "contentType" : "application/json",
            "responseText" : "SUCCESS: backend is running" 
        });
        expect(Database.isRunning()).toBeTruthy();
    });
});