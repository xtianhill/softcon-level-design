README (with nice formatting):
https://docs.google.com/document/d/1QcECvqFfoQWCoPCV4m_iU49NZZy4AurCyq78N7t2oe0/edit?usp=sharing

README (without nice formatting):
Milestone 3b
Christian Hill, Hayley Grey, Eri Rogers, Julia Hanson, Oliver Hahn, Molly O’Donnell, Marjorie Antohi

How to run code
To test play level, simply load the “playLevel.html” from your browser after cloning the repository. To view make level, go to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/db_tests.
How to run test cases
To run tests for the database/backend components, run:
 “npm run-script backend-test”
To run tests for the js components, enter the test file, and run the following for each spec file: 
“jasmine <filename>.spec.js”
Unit testing output will print to the console. 
Please suggest some acceptance cases for TA’s to try

UI Acceptance Tests
	Designing your game: Click and drag some of each element from the top of the screen onto the grid below. For Item (coin) and npc (gargoyle), a dialogue box will pop up when you click on them, where you can enter a string element effect for the item and a string message for the NPC.  If you want to remove something you’ve added, drag it back up into the boxed area containing the element buttons. 
	

Implementation Acceptance Tests
Moving your character
Using the wasd keys, move the Pumpkin Hero left and right on the platform.
Test gravity
Walk the Pumpkin Hero off of the platform to see them fall (the hitbox is the size of a grid square currently). 
Test NPC interaction
Walk the Pumpkin Hero into an NPC, and see the message displayed on the screen. 

Database Acceptance Tests
Browser backend test
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/
A message saying “Level Design backend is running” will appear
Browser search level test:
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/db_tests 
Open browser’s console function (in Chrome, right-click, choose “inspect,” click “console” in the window that opens)
Click any of the buttons “Get test-title”, “Get cbh-title”, “Get vcbc”
Observe the data queried from the database in the console output
Browser display all DB entries test
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/api/v1/query-all/
A list of JSON entries representing Grid data will be queried from the database and appear on-screen. 
Client side search
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/api/v1/search-grid/<search-title> (where <search-title> is replaced with the title to search)
A JSON entry will appear on screen if an entry with the given search title is stored in the database, “None” otherwise.
Command line add grid entry
Open terminal/command line
Install curl utility
Type ‘curl http://http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/api/v1/add-grid/ -X POST -H "Content-Type: application/json" -d '{"title":"yourtesttitle","data":"yourtestdata"}'
“SUCCESS” should appear on the command prompt; if not, check JSON formatting and make sure to include the above flags.
To check if entry was entered into database, try either acceptance test 3 or 4 (the latter with the title you just entered).

What is implemented

Making/Editing a Level
We implemented a basic level editor environment. Users can drag and drop an Environment, Player, Item, NPC, or Enemy element from a menu of elements into a visual representation of the canvas for the level. When adding an element, the position of the item snaps to a grid displayed on the screen. When finished editing the level, all of the elements and their properties (location, size, image url, etc) can be exported in JSON format.
For Iteration 2, many more attributes of each element and the game dynamics will be customizable in the level editor environment.

Playing a Level
We implemented the basic functions of the game, rendering, updating, and looping. The character is now able to move left and right while standing on platforms, and is affected by gravity. The character detects when it collides with other objects, and while specific functionality for what should happen when colliding with each element (npc, item, enemy) has been worked on pretty extensively, it is not complete. NPCs will display messages when walked over. Iteration 2 will involve adding jumping and completing object interaction (attacking/being attacked by enemies, and using items/inventory management).

Saving/Loading a Level (Database stuff)
The bulk of the backend and database work was spent in setting these components up and connecting them to the view and model through implementing a REST API. The database currently implements its load/search for level feature. This functionality is enabled in the client-side code (HTML and JavaScript), and can also be test via browser or command line. The mechanism to save levels and display all levels currently stored on the database is also implemented, but currently only runs over web browser and command line. Additionally, the backend also hosts and serves the HTML and JavaScript files which run the game.

Who did what: who paired with who, which part is implemented by which pair

The pairs:
Christian Hill and Marjorie Antohi; 
Julia Hanson and Eri Rogers; 
Hayley Gray, Oliver Hahn, Molly O’Donnell

Christian Hill and Marjorie Antohi worked on the model and controller components of the game: the database and its controlling web server. Christian set up the infrastructure for the backend, namely: the Amazon Web Services (AWS) Relational Database Service (RDS) MySQL, the AWS Elastic Beanstalk (EB) instance for deploying the website and web server, and the Flask web server itself. Christian also connected these individual components into a working backend. Christian enabled the controller Flask web server to authenticate through a password its connection to the MySQL RDS. After creating the infrastructure, Christian worked on the routing and page-serving aspects of the web server--that is, serving web pages after a user types a certain URL. Christian also implemented the web API for loading and saving levels from the database. Christian and Marjorie worked on creating an internal library for the implementation and UI teams to call functions to save levels and search for/load levels after creating them.

Julia Hanson and Eri Rogers:
Julia implemented the functionality of makelevel: dragging and snapping objects to the grid, as well as the conversion of objects added to the grid toJSON( to be sent to the database) and fromJSON (to load json data and convert it to element objects to be displayed in play level). Eri focused on the visuals for makelevel and also assisted in implementing the game physics for movement (specifically jumping and gravity implementation).

Hayley Gray, Oliver Hahn and Molly O’Donnell worked on the game engine. Together they sketched out the order of functions to implement and delegated the necessary functions. Molly had considerable experience with JavaScript and therefore worked on a variety of different aspects. She focused primarily on play level: working on collision detection, rendering the level, and movement and physics (with Eri), and the html. She assisted both Oliver and Hayley on their work as well. Oliver focused on the movement of the character (which occurred in the update function), mapping keys to “wasd” keys and bounding the movement to the canvas borders. Hayley focused on object interactions for collisions, unit test updates and improving the basic class/subclass structure. 


Changes: have you made any design changes or unit test changes from earlier milestones?
One significant change to our design has been the removal of the grid object. We decided for the ease of movement, interactions and playability to instead refer to objects by their pointwise location rather than their grid placement. Our unit tests for testing the grid have therefore been changed accordingly. 

Another change involved the use of a controller between the model and view components. The controller was implemented as an Amazon Elastic Beanstalk instance running a Python Flask server. This server defined a web API for the UI and game components to interact safely with the database. This change necessitated the use of an additional programming language, Python, and the use of Amazon EB instances.

Things to note:
While the three teams each implemented their specific sections, we have yet to link the parts together so that the user can use them in conjunction, but the data type is consistent across the parts. This will be a focus of iteration 2. We are also aware that our unit test suite should be expanded, and will continue to do this in iteration 2. 

Additionally, our initial iteration one proposal assumed we would have 8 team members, but for this iteration, we only had 7, so we were not able to complete as much as we had hoped. 
