
var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

var CAN_WIDTH = 960;
var CAN_HEIGHT = 640;
var HERO_WIDTH = 310;
var HERO_HEIGHT = 310;
var HERO_COL_X = 100; // colision a partir du centre
var TEXT_BOX_HEIGHT = 140;
var SPEED_X = 10;



var imgMonsterARun = new Image();
var imgMonsterIdle = new Image();

function init() {
	
	// Our hero can be moved with the arrow keys (left, right)
	//document.onkeydown = handleKeyDown;
	//document.onkeyup = handleKeyUp;
    canvas = document.getElementById("testCanvas");

    imgMonsterARun.onload = handleImageLoad;
    imgMonsterARun.onerror = handleImageError;
    imgMonsterARun.src = "MonsterARun.png";
    
//    imgMonsterIdle.onload = handleImageLoad;
//    imgMonsterIdle.onerror = handleImageError;
//    imgMonsterIdle.src = "image/MonsterIdle.png";
}

function reset() {
	
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    stage.update();
}

function handleImageLoad(e) {
    
    
   startgame();
}

function startGame() {
	
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
	
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
    
    //@@@@@@@@@@@@@@@@ IDLE @@@@@@@@@@@@@@@@@@@@@
    
//    var spriteSheetIdle = new createjs.SpriteSheet({
//	    // image to use
//	    images: [imgMonsterIdle], 
//	    // width, height & registration point of each sprite
//	    frames: {width: HERO_WIDTH, height: HERO_HEIGHT, regX: HERO_WIDTH/2, regY: HERO_HEIGHT/2}, 
//	    animations: {	
//		    walk: [0, 10, "idle"]
//	    }
//    });
//    
//    bmpAnimationIdle = new createjs.BitmapAnimation(spriteSheetIdle);
//	bmpAnimationIdle.name = "monsteridle1";
//    bmpAnimationIdle.x = HERO_WIDTH/2 ;
//    bmpAnimationIdle.y = CAN_HEIGHT - TEXT_BOX_HEIGHT - HERO_HEIGHT/2;
//    
    
    
    //@@@@@@@@@@@@@@@@@@@ WALK LEFT TO RIGHT (H) AND RIGHT TO LEFT @@@@@@@@@@@@@
    
     // create spritesheet and assign the associated data.
	var spriteSheet = new createjs.SpriteSheet({
	    // image to use
	    images: [imgMonsterARun], 
	    // width, height & registration point of each sprite
	    frames: {width: HERO_WIDTH, height: HERO_HEIGHT, regX: HERO_WIDTH/2, regY: HERO_HEIGHT/2}, 
	    animations: {	
		    walk: [0, 9, "walk", 4]
	    }
    });
    
    
    // to save file size, the loaded sprite sheet only includes left facing animations
	// we could flip the display objects with scaleX=-1, but this is expensive in most browsers
	// instead, we generate a new sprite sheet which includes the flipped animations
    createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
	
    // create a BitmapAnimation instance to display and play back the sprite sheet:
	bmpAnimation = new createjs.BitmapAnimation(spriteSheet);
	
	// set the registration point (the point it will be positioned and rotated around)
	// to the center of the frame dimensions:
	
	//@TODO
	bmpAnimation.regX = bmpAnimation.spriteSheet.frameWidth/2|0;
	bmpAnimation.regY = bmpAnimation.spriteSheet.frameHeight / 2 | 0;

    // start playing the first sequence:
    bmpAnimation.gotoAndPlay("walk_h"); 	//animate
	
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimation.shadow = new createjs.Shadow("#454", 0, 5, 4);

    bmpAnimation.name = "monster1";
    bmpAnimation.direction = 90;
    bmpAnimation.vX = SPEED_X;
    bmpAnimation.x = HERO_WIDTH/2 ;
    bmpAnimation.y = CAN_HEIGHT - TEXT_BOX_HEIGHT - HERO_HEIGHT/2;
		
    // have each monster start at a specific frame
    bmpAnimation.currentFrame = 1;
    stage.addChild(bmpAnimation);
    
    
    //@@@@@@@@@@@@@@@@@@@@@@@@@ TICK @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		
    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(10);
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}


// @@@@@@ OTHER FUNCTIONS @@@@@@@@@@@@@

function tick() {
	
//	if (bmpAnimation.x < 16) {
//    // We've reached the left side of our screen
//    // We need to walk right now
//    bmpAnimation.direction = 90;
//    bmpAnimation.gotoAndStop("walk");
//    stage.removeChild(bmpAnimation);
//    bmpAnimationIdle.gotoAndPlay("idle");
//    stage.addChild(bmpAnimationIdle);
//	}

	 
    // Hit testing the screen width, otherwise our sprite would disappear
    if (bmpAnimation.x >= (screen_width - HERO_COL_X)) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        bmpAnimation.direction = -90;
        bmpAnimation.gotoAndPlay("walk");
    }

    if (bmpAnimation.x < HERO_COL_X) {
	alert("pouek");
        // We've reached the left side of our screen
        // We need to walk right now
        bmpAnimation.direction = 90;
        bmpAnimation.gotoAndPlay("walk_h");
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimation.direction == 90) {
        bmpAnimation.x += bmpAnimation.vX;
    }
    else {
        bmpAnimation.x -= bmpAnimation.vX;
    }
    


    // update the stage:
    stage.update();
    
    
}

