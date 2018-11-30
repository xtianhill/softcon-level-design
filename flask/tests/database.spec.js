/*
|------------------------------------------------------------------------------
| Tests for Database
|------------------------------------------------------------------------------
|
| This file contains tests for the Database.
| We test valid and invalid input for information to be stored in the Databse.
| The two necessary fields for JSONs to be stored in the Database are  
| "title" and "data", so the existence and validity of these fields are tested.
|
|------------------------------------------------------------------------------
*/

/*
    |--------------------------------------------------------------------------
    | Valid JSON Tests
    |--------------------------------------------------------------------------
    */
const Database = require('../static/database-browserify.js');
// const jasmine = require('../../node_modules/jasmine-core/lib/jasmine-core/');
// const jasmine = require('../../node_modules/jasmine-ajax');
// const jasmine = require('../../spec/helpers/mock-ajax.js')

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
// const AWS_URL = "http://127.0.0.1:5000/";

const ISRUNNING_URL    = "api/v1/backend-up/";
const STOREGRID_URL    = "api/v1/add-grid/";
const DELETEGRID_URL   = "api/v1/delete-grid/";
const UPDATEGRID_URL   = "api/v1/update-grid/"
const GETGRID_URL      = "api/v1/search-grid/";
const GETALLTITLES_URL = "api/v1/query-all-titles/";

describe('Valid JSON Tests', function() {
    var validJSON1 = JSON.stringify(JSON.parse('{ "title" : "mytitle1", "data" : "my data 1" }'));
    var validJSON2 = JSON.stringify(JSON.parse('{ "title" : "mytitle2", "data" : "my data 12" }'));
    var validJSON3 = JSON.stringify(JSON.parse('{ "title" : "mytitle3", "data" : "my data 123" }'));

    var invalidJSON1 = JSON.stringify(JSON.parse('{ "title" : "", "data" : "my data 123" }'));
    var invalidJSON2 = JSON.stringify(JSON.parse('{ "title" : "mytitle3", "data" : "" }'));
    var invalidJSON3 = JSON.stringify(JSON.parse('{ "title" : "", "data" : "" }'));
    var invalidJSON4 = JSON.stringify(JSON.parse('{ "notatitle" : "bad title", "notdata" : "bad data" }'));
    var invalidJSON5 = JSON.stringify(JSON.parse('{ "title" : "atitle", "data" : 123456789 }'));
    var invalidJSON6 = JSON.stringify(JSON.parse('{ "title" : "anothertitle", "data" : 0}'));

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


/*
    |--------------------------------------------------------------------------
    | Tests for Storing Information in the Database and
    | Retrieving Information from the Database
    |--------------------------------------------------------------------------
    */

describe('REST API Tests', function() {
    /*
     * The beforeEach and afterEach functions act as helpers to setup and
     * teardown, respectively, to reset the AJAX connection creation - a step
     * that is necessary when using Jasmine as a testing suite.
     */
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    // tests to make sure the database is running
    describe('isRunning() tests', function() {
        it('should test if the backend is running with barebones AJAX call', function() {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                  doneFn(this.responseText);
                }
            };
            xhr.open("GET", AWS_URL+ ISRUNNING_URL);
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL + ISRUNNING_URL);
            expect(doneFn).not.toHaveBeenCalled();

            jasmine.Ajax.requests.mostRecent().respondWith({
                "status" : 200,
                "contentType" : "application/json",
                "responseText" : "SUCCESS: backend is running" 
            });
            expect(doneFn).toHaveBeenCalledWith('SUCCESS: backend is running');
        });
        it('should test if the backend is running with database.js function call', function() {
            var doneFn = jasmine.createSpy("success");
            expect(Database.isRunning()).toBeTruthy();
            expect(doneFn).not.toHaveBeenCalled();
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL + ISRUNNING_URL);
            expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
        });
    });

    // testing adding different grids to the database
    describe('storeGrid() tests', function() {
        it('should test adding a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var testGrid = {
                "title" : "unitTestTestGrid",
                "data" : "myfakedata123"
            };
            expect(Database.storeGrid(JSON.stringify(testGrid))).toBeTruthy();
            thisRequest = jasmine.Ajax.requests.mostRecent();
            expect(thisRequest.url).toBe(AWS_URL + STOREGRID_URL);
            expect(doneFn).not.toHaveBeenCalled();
            expect(thisRequest.method).toBe("POST");
        });
        it('should test adding a bad grid', function() {
            var doneFn = jasmine.createSpy("success");
            var badTestGrid = {
                "notATitle" : "badTitle",
                "notData" : "notData"
            };
            expect(function() {
                Database.storeGrid(JSON.stringify(badTestGrid))
            }).toThrowError();
            expect(doneFn).not.toHaveBeenCalled();
        });
    });

    // testing deleting different grids from database
    describe('deleteGrid() tests', function() {
        it('should test deleting a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var deleteGrid = {
                "title" : "unitTestDeleteGrid",
                "data" : "mydata123"
            };
            expect(Database.storeGrid(JSON.stringify(deleteGrid))).toBeTruthy();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + STOREGRID_URL);
            expect(Database.deleteGrid(deleteGrid.title)).toBeTruthy();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + DELETEGRID_URL + deleteGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should test deleting a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var badDeleteGridTitle = "titleOfGridWhichIsNotInDatabase";
            Database.deleteGrid(badDeleteGridTitle).then(function(result) {
                expect(result).toBeFalsy();
                doneFn();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + DELETEGRID_URL + badDeleteGridTitle);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should test deleting a grid given an empty string title', function() {
            var doneFn = jasmine.createSpy("success");
            var emptyTitle = "";
            Database.deleteGrid(emptyTitle).then(function(result) {
                expect(result).toBeFalsy();
                done();
            });
            expect(doneFn).not.toHaveBeenCalled();
        });
    });

    // testing updating different grids in database
    describe('updateGrid() tests', function() {
        it('should update a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var updateTestGrid = {
                "title" : "newUnitTestUpdateGrid",
                "data" : "myfakedata123"
            };
            var updateTestGrid2 = {
                "title" : "newUnitTestUpdateGrid2",
                "data" : "myfakedata123"
            };
            Database.storeGrid(JSON.stringify(updateTestGrid)).then(function(result) {
                expect(result).toBeTruthy();
                done();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + STOREGRID_URL);
            Database.updateGrid(JSON.stringify(updateTestGrid)).then(function(result) {
                expect(result).toBeTruthy();
                done();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + STOREGRID_URL);
            Database.updateGrid(JSON.stringify(updateTestGrid2)).then(function(result) {
                expect(result).toBeTruthy();
                done();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + STOREGRID_URL);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to update a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var updateTestGrid = {
                "title" : "updateTestGridWhichIsNotInDatabase",
                "data" : "myfakedata123"
            };
            Database.updateGrid(JSON.stringify(updateTestGrid)).then(function(result) {
                expect(result).toBeFalsy();
                done();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + UPDATEGRID_URL);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to update a grid with invalid data', function() {
            var doneFn = jasmine.createSpy("success");
            var badUpdateTestGrid = {
                "nottitle" : "updateTestGridWhichIsNotInDatabase",
                "notdata" : "myfakedata123"
            };
            expect(Database.updateGrid(JSON.stringify(badUpdateTestGrid))).toThrowError();
            expect(doneFn).not.toHaveBeenCalled();
        });
    });

    // testing retrieving different grids from database
    describe('getByTitle() tests', function() {
        it('should retrieve a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var addTestGrid = {
                "title" : "addTestGrid",
                "data" : "myfakedata123"
            };
            Database.addGrid(JSON.stringify(addTestGrid)).then(function(result) {
                expect(result).toBeTruthy();
                done();
            });;
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + GETGRID_URL);
            Database.getBytTitle(addTestGrid.title).then(function(result) {
                expect(result).toBeTruthy();
                done();
            });;
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + GETGRID_URL + addTestGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should retrieve a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var badAddTestGrid = {
                "title" : "badAddTestGrid",
                "data" : "myfakedata123"
            };
            Database.getBytTitle(JSON.stringify(badAddTestGrid.title));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/search-grid/" + badAddTestGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to retrieve a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var emptyTitle = "";
            Database.getByTitle(JSON.stringify(emptyTitle));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/search-grid/" + emptyTitle);
            expect(doneFn).not.toHaveBeenCalled();
        });
    });
    describe('getAllTitles() tests', function() {
        it('should get titles from the database', function() {
            var doneFn = jasmine.createSpy("success");
            Database.getAllTitles();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/query-all-titles/");
            expect(doneFn).not.toHaveBeenCalled();
        });
    });
});