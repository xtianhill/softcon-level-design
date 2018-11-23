README (with nice formatting):
https://docs.google.com/document/d/1L92fzM5cJ2UfKXFGMYAqnKL7D4wrc8WgGPYlPnLmvuE/edit?usp=sharing

Unit Test Cases
How to Run: Open “SpecRunner.html” from the top-level directory in Google Chrome. The results for each test will render in the web page. This webpage has options, like to display all tests or just those that failed, and to randomize order of test execution.

Milestone 4a: 
 
Marjorie Antohi, Molly O’Donnell, Hayley Gray, Oliver Hahn, 
Julia Hanson, Christian Hill, Eri Rogers, Radhika Kaicker

Iteration 2 plan:

High Level Summary
Our goals for iteration 2 are, overall, similar to those we stated in the original design document: “Create Level and Play Level will be fully fleshed out with more options for game creation and more complex object interactions” and “Share Level, Search for Level, and Use Link to Play” will be implemented. Below we have described these and other additional goals with greater specificity. 

Connecting Create Level, Play Level, and the Database
At the end of Iteration 1, we implemented the structures needed to allow levels to be saved  from Create Level→ Database and loaded from Database→ Play level but didn’t link them together--this is our first goal for iteration 2. Linking the components together requires an additional menu in the Create Level editor with buttons for saving a created game with a title and playing a game by searching for it by title.

Adding more configurable options in Create Level
We plan to make many more elements of gameplay configurable in Create Level for iteration 2. Users will be able to: 
Upload a sprite from an image url
Choose effects for each item and terrain element (heal or damage)
Give items a list of “targets” they can be used on
Set the win conditions for their game 
Choose the width of their canvas (within a range)
Give their level a title 
Test their level 
Adding this level of customization requires some changes to the design of the user interface, namely additional buttons or drop down menus for each game element that allow the user to specify the attributes of each element they add to their game.

UI changes
We also plan to change the following for the UI in create level:
-Instead of dragging and dropping elements into the grid (iteration 1), a user will be able to select elements from the menu and then “stamp” them in their desired location. This facilitates easier addition of multiple blocks of the same type.
-Users will not be able to drag two items on top of one another (a bug from iteration 1)
-Users will be limited to adding one Player character to their game per game

Added gameplay complexity 
We plan to make gameplay more complex and visually engaging in iteration 2 by implementing the following features:
Side scrolling/camera view for moving around in a level whose width is larger than the screen
Moving enemies (walking back and forth)
More object interactions:  collision detection for using an item to trigger an effect on a target
More types of terrain with effects (heal or damage)
Items and Item inventory: 
making items move with the player on the screen
modify screen when item is picked up and when a new picked up but the player has nonempty inventory
the ability to select which item from the inventory a player would like to use 
The ability to die (for players, npcs, and enemies)
The ability to win (for a player)

Sharing and using link to play; Database updates 
-Share level/use link to play
-Null input checking and HTTP responses. The database will check inputs (as in, search title, add grid, update grid, etc.) and make sure that they are valid and well-formed.
-The database will also return HTTP response codes indicating the status of each request made to the database. For instance, if search title is given a title that doesn’t exist in the database, it will return a 404 “Not Found” HTTP response; if add grid is given a title that already exists in the database, it will return a 409 “Conflict” response; etc.
-The database now will have functionality to display all grids stored, allowing users to list and try out all levels available.

What we aren’t doing (that was in original design document)
Right now, we don’t have plans to add music or sound effects.

How the work will be divided among all pairs of people in your team.
In the previous iteration, people were flexible to work on different teams as needed, and in this iteration we anticipate that even more fluidity will be needed as different tasks arise. Within that flexibility, we will loosely be working in the following teams:
Julia, Eri
Julia: making make level ui changes listed above, linking MakeLevel, PlayLevel, and the database together with a Homepage UI
Eri: Side scrolling/camera view for moving around in a level whose width is larger than the screen, along with the ability to create such levels in the UI; other PlayLevel features as necessary (particularly physics-related additions such as moving enemies or animated objects)
Molly, Oliver, Hayley, Radhika
Molly: Implementing an inventory, item interactions, such as attacking and healing, win and lose conditions, character death, health and controls in the UI of the game
Oliver: Type validation for all methods and unit test updates. In the next iteration, more type validation for methods and unit test updating as well as working on polishing game physics.
Hayley: Type validation for all methods and unit test updates
Radhika: Type validation for all methods and unit test updates
Christian and Marjorie
Christian: adding null-input checking to database, adding HTTP response codes, connecting controller and view components, checking that valid JSONs are being sent to DB in API calls, further database unit tests.
Marjorie: Type validation and unit test updates for the database

Unit Test Cases
How to Run: Open “SpecRunner.html” from the top-level directory in Google Chrome. The results for each test will render in the web page. This webpage has options, like to display all tests or just those that failed, and to randomize order of test execution.
Alternatively, enter the “tests” directory, and run the following for each spec file: “jasmine <filename>.spec.js” Unit testing output will print to the console. 

General information
Depencies/requirements/things we used:
Jasmine (Javascript unit testing framework)
Browserify (converts Node.js javascript files to browser-compatible formats)
JQuery (Javascript AJAX library)
Flask (Python webserver)
Amazon AWS (Elastic Beanstalk, MySQL Database Instance)
Directory structure
Softcon-level-design: (top level directory)
Flask: holds the flask server files, the game content files and the elastic beanstalk configuration to deploy to web-server.
Application: holds the files necessary to create the Flask web-server on the Elastic Beanstalk instance
Flask-env: holds the Python dependencies for the Flask web-server that Elastic Beanstalk needs
Static: holds the javascript files
Templates: holds the HTML files served by the web-server
Tests: holds the unit testing files
Application.py: handles the application and routing logic of the flask webserver
Config.py: configuration information for the flask webserver
Models.py: defines a model for use in the MySQL database
Requirements.txt: lists the python dependencies necessary for the Flask webserver
Node_modules: holds dependencies relevant to the project structure (jasmine, SQLAlchemy, etc.).
Spec: holds configuration and default files for Jasmine.
SpecRunner.html: HTML file which runs and pretty-prints unit testing results and output.
Test-db.html: a test database file served by the Elastic Beanstalk web-server.

Notes
A note about the testing files: the test files (e.x. database.spec.js): there are other files in the same directory (such as database-browserify.spec.js) that are included in the SpecRunner.html testing suite. These files were created with the browserify utility to create a more compatible testing format for Jasmine’s AJAX testing functionality -- it otherwise has no effect on functionality or performance.
We were unable to complete the isolate unit tests for the Flask webserver due to difficulties with the Flask unit testing framework. The Flask unit testing framework proved to be difficult to build correctly and include in our project; however, our group was able to perform other tests on the Flask webserver, such as the “curl” requests mentioned in the previous unit testing milestone.
A comment we received on the previous unit test milestone suggested that we use multiple instances of the classes in our unit tests. In order to keep the code concise but thorough, we use a forEach() constructor that runs at the start of every unit test. This prevents any carryover of the data in the test object from test to test within a file, providing a fresh instance of the class, while also keeping the code short and easy to read. 

-------------------------------------------
Milestone 3b
Christian Hill, Hayley Grey, Eri Rogers, Julia Hanson, Oliver Hahn, Molly O’Donnell, Marjorie Antohi

How to run code
To test play level, simply load the “playLevel.html” from your browser after cloning the repository. To view make level, go to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/db_tests.

How to run test cases

To run tests for the js components, enter the test file, and run the following for each spec file: 
“jasmine <filename>.spec.js”
Unit testing output will print to the console. 

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
Point browser to: http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/db_tests 
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

For Iteration 2, many more attributes of each element and the game dynamics will be customizable in the level editor environment, including options for players to upload custom images and further specify behaviors of elements.

Playing a Level

We implemented the basic functions of the game, rendering, updating, and looping. The character is now able to move left and right while standing on platforms, and is affected by gravity. The character detects when it collides with other objects, and while specific functionality for what should happen when colliding with each element (npc, item, enemy) has been worked on pretty extensively, it is not complete. NPCs will display messages when walked over. 

Iteration 2 will involve adding jumping and completing object interaction (attacking/being attacked by enemies, and using items/inventory management).

Saving/Loading a Level (Database)

The bulk of the backend and database work was spent in setting these components up and connecting them to the view and model through implementing a REST API. The database currently implements its load/search for level feature. This functionality is enabled in the client-side code (HTML and JavaScript), and can also be test via browser or command line. The mechanism to save levels and display all levels currently stored on the database is also implemented, but currently only runs over web browser and command line. Additionally, the backend also hosts and serves the HTML and JavaScript files which run the game.

Who did what: who paired with who, which part is implemented by which pair

The pairs:
Christian Hill and Marjorie Antohi; 
Julia Hanson and Eri Rogers; 
Hayley Gray, Oliver Hahn, Molly O’Donnell

Christian Hill and Marjorie Antohi:
Worked together on the model and controller components of the game: the database and its controlling web server. Christian set up the infrastructure for the backend, namely: the Amazon Web Services (AWS) Relational Database Service (RDS) MySQL, the AWS Elastic Beanstalk (EB) instance for deploying the website and web server, and the Flask web server itself. Christian also connected these individual components into a working backend. Christian enabled the controller Flask web server to authenticate through a password its connection to the MySQL RDS. After creating the infrastructure, Christian worked on the routing and page-serving aspects of the web server--that is, serving web pages after a user types a certain URL. Christian also implemented the web API for loading and saving levels from the database. Christian and Marjorie worked on creating an internal library for the implementation and UI teams to call functions to save levels and search for/load levels after creating them.

Julia Hanson and Eri Rogers:
Julia implemented the functionality of makelevel: dragging and snapping objects to the grid, as well as the conversion of objects added to the grid toJSON( to be sent to the database) and fromJSON (to load json data and convert it to element objects to be displayed in play level). Eri focused on the visuals for makelevel and also worked on implementing the game physics for movement (specifically working on jumping, gravity implementation, and some parts of object collision).

Hayley Gray, Oliver Hahn and Molly O’Donnell 
Worked together on the game engine. Together they sketched out the order of functions to implement and delegated the necessary functions. Molly had considerable experience with JavaScript and therefore worked on a variety of different aspects. She focused primarily on play level: working on collision detection, rendering the level, movement and physics (with Eri), and the html. She assisted both Oliver and Hayley on their work as well. Oliver focused on the movement of the character (which occurred in the update function), mapping keys to “wasd” keys and bounding the movement to the canvas borders. Hayley focused on object interactions for collisions, unit test updates and improving the basic class/subclass structure. 


Changes: have you made any design changes or unit test changes from earlier milestones?
One significant change to our design has been the removal of the grid object class. We decided for the ease of movement, interactions and playability to instead refer to objects by their pointwise location rather than their grid placement. Our unit tests for testing the grid have therefore been changed accordingly, or removed in some cases. 

Another change involved the use of a controller between the model and view components. The controller was implemented as an Amazon Elastic Beanstalk instance running a Python Flask server. This server defined a web API for the UI and game components to interact safely with the database. This change necessitated the use of an additional programming language, Python, and the use of Amazon EB instances.

A Note:
While the three teams each implemented their specific sections, we have yet to link the parts together so that the user can use them in conjunction, but the data type is consistent across the parts. This will be a focus of iteration 2. We are also aware that our unit test suite should be expanded, and will continue to do this in iteration 2. 

Additionally, our initial iteration one proposal assumed we would have 8 team members, but for this iteration, we only had 7, so we were not able to complete as much as we had hoped. 

