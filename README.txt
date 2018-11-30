README (with nice formatting):
https://docs.google.com/document/d/1-KWoKyu6tmTp3O7bchcDixfaKW7GgqFf_R9AiCsp_Zc/edit?usp=sharing

Milestone 4B
Christian Hill, Hayley Grey, Eri Rogers, Julia Hanson, Oliver Hahn, Molly O’Donnell, Marjorie Antohi, Radhika Kaicker

How to run code
http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/home.
Is not entirely responsive to browser resize. 
How to run test cases

To run tests for the js components, enter the test file, and run the following for each spec file: 
“jasmine <filename>.spec.js”
Unit testing output will print to the console.
Alternatively, run the “SpecRunner.html” file from the top level directory.

Make/Play Level Acceptance Tests
*Additional notes*: default win conditions are talk to all npcs, and kill all enemies. So you must put an an npc or an enemy on your stage so you dont automatically win
Balance your item strength and character’s health, otherwise you may be too weak, or overpowered.

Test Item Collection.
Pick up items by running into them and watch them move with their character.
Test Effect Customization
Alter settings in the sidebar options menu as you create your game and watch as placed sprites interact differently with the character.
Test Sprite Uploading
Paste an image URL in the box to make a custom sprite.
Test Enemy item interaction
Collect an item with the damage effect and press q when near an enemy to deal damage to it.
Collect an item with the heal effect and press q when near an enemy or npc to increase their health level.


Database Acceptance Tests
Browser backend test
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/api/v1/backend-up
A message saying “BACKEND RUNNING” will appear
Browser display all DB entries test
Point browser to http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/home
A list of entries representing level titles will be queried from the database and appear on-screen. 
Browser search level test:
Point browser to: http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/home 
Type level names in the search bar: results will update automatically.

What is implemented

Making/Editing a Level

For iteration two, we built on the skeleton of our level editor. Players can now title their level and  can now upload custom images for each game element. Levels now scroll in editing mode, too. We also implemented increased customization options such as the ability to define effects, damage levels, gravity levels (high, medium, low) for characters, win conditions, targets for items, and environmental effects. The menus involved in creating a level have been expanded and given improved organization Users now place items by “stamping” instead of dragging and dropping elements into the grid. 

Playing a Level

In iteration two interactions between items, the player character, enemies, and the environment were finalized. The player can now pick up items and switch which of them is equipped using the inventory. The player can also use the equipped item using the q key, which can have effects like “damage” and “heal” and can apply those effects to enemies and NPCs in addition to the player themselves. Environmental effects have also been implemented so that the player can be damaged or healed by the environment itself (e.g. spikes). Enemies now can move around the level, and items can wobble in midair to give a floating effect. Win conditions have been implemented so that they player can complete the level upon succeeding in killing all enemies, speaking to all NPCs, or collecting all items. The player character can also die if they take too much damage.

Saving/Loading a Level (Database)

The database and controller components are now fully integrated with the game editor and player. These components interact with the backend through a well-defined API, handling a variety of errors for each possible situation invocations of the API might trigger. 

Who did what: who paired with who, which part is implemented by which pair

The groups:
Christian Hill
Julia Hanson
Eri Rogers, and Molly O’Donnell
Oliver Hahn, Hayley Gray, Radhika Kaicker and Marjorie Antohi

Christian Hill and Marjorie Antohi:
Christian updated the Flask webserver to handle the new pages for this iteration, like the homepage and the updated make level and play level pages. Christian added functionality to the webserver to handle unique level urls (automatically loads a level to play given the title in the URL) and updated the REST API to handle this functionality. Christian added new functionality to the database, including the new features “update grid,”“delete grid,” and “query all titles.” Christian also updated the database unit tests to handle a new style of return from the REST API functions (using JavaScript’s async await feature), given the difficulty encountered in the previous iteration with iQuery AJAX and the Jasmine unit testing suite. 

Julia Hanson 
	Julia implemented all of the updates to make level listed above, including the functionality and display of all of the buttons and menus. In addition, she helped christian connect make level to save to the database.

Eri Rogers and Molly O’Donnell 
This team implemented all the unit two updates to play level. Molly implemented item collection, updated item interactions with enemies and NPCs, and created an inventory structure that allowed for equipping and switching of items. Molly also implemented several game win conditions and performed dynamic testing for the engine class. Molly also implemented character death. She also wrote the script for the homepage, and helped debug unit tests. Eri added movement and animation to NPCs, enemies, and items. Eri also implemented dynamically scrolling levels with larger canvases and designed the aesthetics of the front-end UI. In addition, Eri made UI for the homepage from which playLevel and makeLevel can be accessed.

Oliver Hahn, Hayley Gray, Radhika Kaicker and Marjorie Antohi
This group was primarily in charge of unit and acceptance testing. Since a major factor of iteration two was making certain that everything implemented in iteration one worked with the iteration two updates, and that all the iteration two updates worked even in very rare edge cases, this was a significant portion of the unit two work. Hayley worked on unit tests and finalization for enemy, player, engine, environment, and parsing. She also helped play test the game. Oliver worked primarily on unit tests and type checking for utility, player, npc, and more. Marjorie worked on unit tests and fixing bugs for class documents in flask. Marjorie also added documentation and comments to the files in the static and tests folders.

Changes: have you made any design changes or unit test changes from earlier milestones?
	Changes were made the database unit tests, as the return method for the REST API functions was changed from success/failure callback methods to leverage JavaScript’s async await functionality. The unit tests were also updated to test the new functionality of the database (update, delete, etc.). 
	Unit tests from iteration one have been fully updated and made comprehensive. Some unit tests submitted for iteration 4A have been altered slightly as parameter types have changed, but overall the unit test suite is similar.


Notes:
We have not been able to play test all of the different combinations of made levels, so we assume there will be some small bugs that need to be fixed in that regard. Additionally, you cannot set your own background image right now, and you can place two objects in make level on top of eachother, which will break that level when played. We will do our best to fix these bugs as they surface.

Extensive play testing will occur.

Background image and win conditions will be fixed in the coming week. 


