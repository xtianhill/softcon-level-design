database = require('./database.js');
async function populateList(){
    var data;
    try{
        data = await database.getAllTitles();
        return data;
    } catch (error){
        data = "error";
        return data;
    }
}

populateList().then((response) => {
    var ul = document.getElementById("allTitles");
    for (var i = 0; i < response.length; i++) {
        var listItem = document.createElement("li");
        listItem.classList.add('name');
        var a = document.createElement('a');
        var linkText = document.createTextNode(response[i]);
        a.appendChild(linkText);
        a.title = response[i];
        a.href = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/play/" + response[i];
        listItem.appendChild(a);
        ul.appendChild(listItem);
    }

    var input = document.getElementById('input');
    input.onkeyup = function () {
        var filter = input.value.toUpperCase();
        var lis = document.getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            var name = lis[i].innerText;
            if (name.toUpperCase().indexOf(filter) == 0) 
                lis[i].style.display = 'list-item';
            else
                lis[i].style.display = 'none';
    }
}

});