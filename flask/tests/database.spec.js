const Database = require('../static/database.js');

describe('Database', function() {
    var validJSON1 = JSON.parse('{ "title" : "mytitle1", "data" : "my data 1" }');
    var validJSON2 = JSON.parse('{ "title" : "mytitle2", "data" : "my data 12" }');
    var validJSON3 = JSON.parse('{ "title" : "mytitle3", "data" : "my data 123" }');

    var invalidJSON1 = JSON.parse('{ "title" : "", "data" : "my data 123" }');
    var invalidJSON2 = JSON.parse('{ "title" : "mytitle3", "data" : "" }');
    var invalidJSON3 = JSON.parse('{ "title" : "", "data" : "" }');
    var invalidJSON4 = JSON.parse('{ "notatitle" : "bad title", "notdata" : "bad data" }');
    
    it('should test given JSONs for title and data fields', function() {
        expect(Database.validJSON(validJSON1)).toBeTruthy();
        expect(Database.validJSON(validJSON2)).toBeTruthy();
        expect(Database.validJSON(validJSON3)).toBeTruthy();
        
        expect(Database.validJSON(invalidJSON1)).toBeFalsy();
        expect(Database.validJSON(invalidJSON2)).toBeFalsy();
        expect(Database.validJSON(invalidJSON3)).toBeFalsy();
        expect(Database.validJSON(invalidJSON4)).toBeFalsy();
    });

});