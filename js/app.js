/*
Various constants are defined in the following block of declarations.

These constants are used to set the initial positions of the player, the distance of horizontal or vertical moves. Sounds are also created using the Howler library.
*/
var points = 0; 
var canvasWidth = 505;
var playerHeight = 50;
var playerWidth = 50;
var playerInitialX = 202;
var playerInitialY = 430;
var playerMinimumX = 102;
var playerMaximumX = 402;
var playerMaximumY = 390;
var playerMinimumY = 30;
var enemyInitialX = -400;
var playerVerticleMoveDistance = 40;
var playerHorizontalMoveDistance = 100;
var winSound = new Howl({urls: ['sounds/win.wav']});
var loseSound = new Howl({urls: ['sounds/lose.wav']});


/*
The following declarations are offsets, which act as helpers when determining whether an enemy has collided with the player. These offsets have been manually calculated to provide more precise collision detection.

Basically if player has been drawn at x,y, then we can draw a square around the player using x+px1, x+px2, y+py1, y+py2; similarly, if an enemy is drawn at x,y, then a square can be drawn around that enemy using x+px1,x+px2,y+py1 and y+py2.
*/
var ex1 = 0, ex2 = 100, ey1 = 89, ey2 = 145;
var px1 = 13, px2 = 88, py1 = 65, py2 = 140;


/*
The following function simply display the number of games won. It targets the div with the id 'points' and use innerHTML to add a message showing how many times the player has touched the water.
*/
var showPoints = function() { 
    pointsDiv = document.getElementById('points');
    switch(points){
        case(0): 
            message = "You never touched the water!";
            break;
        case(1):
            message = "You touched the water once!";
            break;
        case(2):
            message = "You touched the water twice!";
            break;
        default:
            message = "You touched the water " + points + " times!";
            break;
    }
    pointsDiv.innerHTML = message;
}

/*
This is the Player constructor; it sets the initial position of the player.
*/
var Player = function() {
        this.sprite = 'images/char-horn-girl.png';
        this.x = playerInitialX;
        this.y = playerInitialY;
}

/* 
The render() method draws the Player image on the canvas using drawImage method of the context object.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/*
The update() method checks if water has been reached, if there has been a collision and it updates the points.
*/
Player.prototype.update = function() {
    this.wasTheWaterReached();
    this.checkCollision();
    showPoints();
}

/*
If the y coordinate of the player is below 20, then the player has been water and then a sound is played, the reset function is called and the points variable is incremented.
*/
Player.prototype.wasTheWaterReached = function() {
    if (this.y<20) 
        {
            winSound.play();
            this.reset();
            points++;
        }
}

/*
This is a bit tricky to understand. 
Assuming e is an enemy and p is a player;

Then a collision occurs when e.x2>p.x1 and 
e.x1<p.x2 and e.y2>p.y1 and e.y1<p.y2. 

For a given object, a square can be drawn
around the object using x1,x2,y1,y2.

In this case, for example, x1 == this.x+px1
x2= this.x+px2, y2=this.x+py2, y1=this.y.py1

The offsets have been calculated for both
types of objects. These allow for more
precise collision detection.
*/
Player.prototype.checkCollision = function() { 
    for (i=0; i<allEnemies.length; i++)
        if (allEnemies[i].x + ex2 > this.x + px1 && 
            allEnemies[i].x + ex1 < this.x + px2 &&
            allEnemies[i].y + ey2 > this.y + py1 && 
            allEnemies[i].y + ey1 < this.y + py2)   
                this.reset();
}

/*
reset(): reset to the initial x,y position of the player objects and plays a sound.
*/
Player.prototype.reset = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
    loseSound.play();
}

/*
handleInput(): 
As the name suggests, this function gets called each time a key is pressed and the event listener using the keycode of the event (e.keyCode), passes the corresponding key to handleInput(). For example, if e.keyCode is 37, then it passes to handleInput() a string corresponding to the key pressed. The switch then modify the position of the player accordingly using the predefined move constants. It also checks whether the player is allowed to move further in the direction of the key that was pressed.
*/
Player.prototype.handleInput = function(key){
    switch(key){

        case 'left':
            if (this.x>=playerMinimumX)
                this.x-=playerHorizontalMoveDistance;
            break;

        case 'right':
            if (this.x<=playerMaximumY){
                this.x+=playerHorizontalMoveDistance;
            }    
            break;

        case 'up':
            if (this.y>=playerMinimumY){
                this.y-=playerVerticleMoveDistance;
            }
            break;

        case 'down':
            if (this.y<=playerMaximumY){
                this.y+=playerVerticleMoveDistance;
            }
            break;

        default:
            null;
    }
}

// a new player is instantiated and a new empty of array of enemies is declared
var player = new Player(), allEnemies = [];

/*
document.addEventListener('keyup', function(e){}:
if any key is pressed, the event object is passed to the anonymous function. The event has the key that was pressed defined as a property (e.keyCode).

37 is left; 38 is up; 39 is right; 40 is down.

*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
Enemy constructor:
    sprite: contains the image of the enemy
    x: the initial position of the enemy, which is completely off the canvas
    y: the initial vertical position can be passed as argument
    speed: the speed is randomized.
*/
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyInitialX;
    this.y = y;
    this.speed = Math.random() * 10;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed;
    this.isOffCanvas();
};
// If the enemy is off canvas, then reset.
Enemy.prototype.isOffCanvas = function() {
    if (this.x > canvasWidth) this.reset();
}

Enemy.prototype.reset = function() {
    this.x = enemyInitialX;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
Used to instantiate a random number of enemies.
All the enemies are then pushed along the lines of
bricks in the game.
*/
var instantiateEnemies = function() {
    numberOfEnemies = Math.floor((Math.random() * 4) + 5);

    for (i=0; i<numberOfEnemies; i++)
        if (i%2==0) allEnemies.push(new Enemy(140));
        else if (i%3==0) allEnemies.push(new Enemy(220));
        else allEnemies.push(new Enemy(60));
}

// instantiate all enemies
instantiateEnemies();   

