# Front-End Web Developer Nanodegree

## Project: Arcade Game Clone

### Overview of the Project:

For this project in _Udacity_'s **Front-End Web Development Nanodegree**, I was provided with visual assets and a game loop engine. Using these tools, I needed to add a number of entities, including player characters and enemies, to recreate a classic arcade game called Frogger. 

### Basic functionality of the game

In this classic arcade game, you have a Player and Enemies (Bugs). The goal of the player is to reach the water without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won.

## Folders and files
This repository contains css, images, and js folders, as well as an index.html and a README.md file. 

- The **css** folder contains a *style.css* file.
- The **sounds** folder contains the two sounds used in the game.
- The **images** folder contains the png image files, which are used when displaying the game. The images for the player and enemy character are loaded from this folder.
- The **js** folder contains the app engine needed to run the game, app.js which contains the Enemy and Player classes, and a resources.js file used to load images. 
- **index.html** - opening index.html should load the game
- **README.md** contains instructions on how to load and play the game.

## The Enemy class found in app.js

In the **Enemy** class, I needed to implement the following functions:
- The Enemy function, which initiates the Enemy by:
	- Loading the image by setting this.sprite to the appropriate image in the image folder
	- Setting the Enemy initial location
	- Setting the Enemy speed
- The update method for the Enemy
	- Updates the Enemy location
	- Handles collision with the Player

## The Player class found in app.js
In the **Player** class, I needed to implement the following functions:
- The Player function, which initiates the Player by:
	- Loading the image by setting this.sprite to the appropriate image in the image folder
	- Setting the Player initial location
	- Setting the Enemy speed
- The update method for the Player
- The render method for the Player
- The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
	- Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
	- Recall that a player cannot move off the screen.
	- If a player reaches the water the game should be reset approprately
	- Handles collision with the Player

## The Player class found in app.js
	To play the game, simply open index.html in a browser.

### License 

MIT License

Copyright (c) 2016 minimal1st

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
