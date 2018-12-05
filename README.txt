README

**Level Editor**
Christian Hill, Hayley Grey, Eri Rogers, Julia Hanson, Oliver Hahn, Molly O’Donnell, Marjorie Antohi, Radhika Kaicker

**Accessing our Project**
The Level Editor homepage can be found at this link: http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/ 
No installation of software is necessary. For best results, we recommend using Google Chrome on macOS, though other operating systems and browsers should not cause extreme issues.
 
**Functionality Description**
The purpose of our product is to create a scrolling platform level editor that provides a large extent of freedom of customization to the user. Our vision is that creative users should be able to create platform-based games that can be saved and shared without having to rely on restrictive software or building game engines from scratch. Our project has two main functions: level creation and level playing. From the homepage, users can follow the links to enter the lever editor or play a level from searching by title or  by selecting a level from the list of existing levels. From these pages, users can press the home button to return to the home page. On the play level pages, the user can control their character to play the game using the WAD keys.
 
**Tutorial**
The Homepage —
The Homepage is the connection point between making a level and playing a level. The user begins here, and can navigate to the level editor by clicking the button on the righthand side, or can choose to play any one of the levels that is already in the database by clicking the correct title from the list on the lefthand side. The user can also search for a level by title. Here’s a quick-reference guide:
To make a level — Click square button “Click to go to the Level Editor!”
To play a level — Click level’s title in list titled “Saved Levels”
To find a level — Type level’s title into the search bar under “Saved Levels”
 
**Making a Level** —
In the level editor, the user can add characters, items, and other customizable game elements to their level using the menu across the top of the screen, The level is displayed in the window in the center of the screen.  Elements are added to the level by clicking on the menu to select an element type and then clicking in the level where you would like to add the element. You can use the default sprite images given in the menu, or elements can be customized using the menus that display on the righthand side of the screen when an element type is selected. 
We recommend choosing .png images with transparent backgrounds that are constrained to a square aspect ratio for elements, and higher-resolution images that are wider than they are tall for the background. Grid lines are present on top of the level in the editor environment to aid element placement during the editing process. All levels are a fixed size, which is larger than the window they are displayed in. To edit further right in the level, the user can scroll using a laptop’s trackpad.
 
Explore at the top to browse the element types and configurable features of a level. 
Here’s a guide to the menu across the top of the screen in the editor (from left to right):
-Move Mode (arrow cursor icon): when selected, allows the user to move elements around in the level. You will notice that you cannot drag elements on top of eachother.
-Eraser: when selected, allows the user to remove an element from the level by clicking it.
-Terrain (stone block): when selected, allows the user to add Terrain elements to the level. You can choose the image url, solidity, and effect of the terrain elements  you add using the menu that displays on the right. 
-Player (pumpkin man): when selected, allows the user to add a Player character to the level. Levels must have exactly one -Player character to be saved. You can choose the image url, speed, maximum health and gravity amount  for the player you add using the menu that displays on the right. 
-NPC (gargoyle): when selected, allows the user to add a NPC to the level. NPCs will say a message to your player character when you run into them in play level. You can choose this message, as well as the image url, speed, maximum health and gravity amount for each NPC you add using the menu that displays on the right. 
-Enemy(wild boar): when selected, allows the user to add an Enemy to the level. Enemies deal damage to a player character when a player character collides with an enemy in play level. You can choose how much damage the enemy deals, as well as the image url, speed, maximum health and gravity amount for each Enemy you add using the menu that displays on the right. 
-Item(sword): when selected, allows the user to add an Item to the level. Items can heal or deal damage to different character types. When a player character collides with an item in play level, the item will be added to its inventory, where it can be used by a player char on a target. You can choose the effect and strength of an item, what character types it can be used on (targets), and the image url for each Item you add using the menu that displays on the right. 
-Win Conditions(trophy): when selected, the right-side menu will display your options for the win conditions of your level: what a player needs to do in order to win the level. You can select any combination of the options.
-Set Background (background image): when selected, allows the user to set the background image of your level using the menu on the right by pasting a url in the input box.
-Get Link: once your game has been successfully saved with a title, you can click get link to get the url at which you can play your level.
-Save Grid: if you click this button, you will be prompted to enter a title for your level. If that title has not been taken by another user, your level will be saved with that title and available to play at the link displayed after pressing “get link”
-Homepage: clicking this button will navigate you back to the home page. If you’ve saved your level with a valid title, it will be searchable by title there.
 
**Playing a Level** —
In the level playing mode, the user can play any level that has been saved to the database. Some levels may not be winnable, and some may be extremely ugly depending on what the user who made that level decided to use as image sprites.
To move right — D key
To move left — A key
To jump — W key
To pick up an item — Run into it
To switch active items — E key; if there is more than 1 item in inventory
To use item — Q key
To attack a character — Equip an item that does damage, and press Q near the character
To heal a character — Equip an item that does damage, and press Q near the character
To talk to an NPC — Run into it
To die — Fall off a platform, stand next to an enemy or on a tile that damages for too long
To heal — Stand on a platform with a healing effect, or use a healing item with Player target
To win — Meet the conditions listed in the footer of the page.
To reset the level — Press the Reset button in the top right
To return to the homepage — Press the Homepage button in the top right
 
 
** Bugs and Non-Functionalities **

MakeLevel
-No input validation for url entries in makelevel:  we can only guarantee correctness for .png files at valid urls
-No input validation for level titles (other than being non-empty or not already in the database)
-Getting a link: if you click “get link,” you will be alerted with the link to the level with the title you inputted. The small bug here is: if you click “get link” after trying to save with an invalid title (that is already in the database) but before you save with a new title, you will be alerted with the link to the game with the title you inputted, which is whichever level is in the database with that title. 
-Users can’t do any sort of re-loading and editing levels once they’ve navigated away from the editor; more generally, there’s no functionality to test a level. 
-Users can make unwinnable levels (this is not a bug).

PlayLevel
-Health bar display doesn’t reflect input values but are fractions of 100 (actual health amounts for characters are correct)
-Health for enemies and NPCs doesn’t have a default value, causing issues with interactions and the health bar displays if the user doesn’t enter a value while editing.
-Sometimes rules in the footer repeat for unknown reasons.
-On a few computers, the D key only worked while shift was held down.
-The player’s hitbox is hard-coded to the size of the Pumpkin Man. If wider or thinner sprites are used for the player, it may appear as if collisions are being ignored.

Database
-Not secure against SQL injection attacks

UI/UX
-Responsiveness on various devices: all pages are optimized for laptop screens and Chrome.
-The text/background contrast is not high enough in some areas to be accessible to people with impaired vision.
-When Homepage is resized to be too small, images spread out on the MakeLevel side and disappear on the PlayLevel side. This should not be an issue for a normal browser window on a laptop screen.
-When MakeLevel is resized to be too small, the menu buttons overlap with the Homepage/Save Grid buttons. This should not be an issue for a normal browser window on a laptop screen.
-The inventory selected-item box in PlayLevel slightly overlaps with the item images inside it.



