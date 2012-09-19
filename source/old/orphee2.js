// declaration de variables

var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;



var imgMonsterRun = new Image();
var imgMonsterIdle = new Image();


function init() {
   
	canvas = document.getElementById("testCanvas");
	
	// marche
	imgMonsterRun.onload = handleImageLoad;
	imgMonsterRun.onerror = handleImageError;
	imgMonsterRun.src = "MonsterRun.png";
	
	// idle
	imgMonsterIdle.onload = handleImageLoad;
	imgMonsterIdle.onerror = handleImageError;
	imgMonsterIdle.src = "MonsterIdle.png";
	
	
}

function reset() {
	
	stage.removeAllChildren();
	createjs.Ticker.removeAllListeners();
	stage.update();
	
}

function handleImageLoad(e) {

	startGame();
}

function startGame() {

	stage = new createjs.Stage(canvas);
	
	screen_width = canvas.width;
	screen_height = canvas.height;
	
	   //@@@@@@@@@@@@@@@@ IDLE @@@@@@@@@@@@@@@@@@@@@
    
    var spriteSheetIdle = new createjs.SpriteSheet({
	    // image to use
	    images: [imgMonsterIdle], 
	    // width, height & registration point of each sprite
	    frames: {width: HERO_WIDTH, height: HERO_HEIGHT, regX: HERO_WIDTH/2, regY: HERO_HEIGHT/2}, 
	    animations: {	
		    walk: [0, 10, "idle"]
	    }
    });
//    
   bmpAnimationIdle = new createjs.BitmapAnimation(spriteSheetIdle);
	bmpAnimationIdle.name = "monsteridle1";
    bmpAnimationIdle.x = HERO_COL_X ;
    bmpAnimationIdle.y = CAN_HEIGHT - TEXT_BOX_HEIGHT - HERO_HEIGHT/2;
//    

//@@@@@@@@@@@@@@@@@@ WALK LEFT TO RiGHT (H) AND RiGHT TO LEFT	@@@@@@@@@@@@@@@
var spriteSheet = new createjs.SpriteSheet({

	images: [imgMonsterRun],
	
	frames: {width: HERO_WIDTH, height: HERO_HEIGHT, 
	regX: HERO_WIDTH/2, regY: HERO_HEIGHT/2},
	animations: {
		walk: [0,9, "walk"]
	}
});

//creation du walk_h
	createjs.SpriteSheetUtils.addFlippedFrames(
		spriteSheet, true, false, false);

	bmpAnimation = new createjs.BitmapAnimation(spriteSheet);

	bmpAnimation.regX = bmpAnimation.spriteSheet.frameWidth/2|0;
	bmpAnimation.regY = bmpAnimation.spriteSheet.frameHeight/2 | 0;
	
	bmpAnimation.gotoAndPlay("walk_h");
	
	bmpAnimation.name = "monster1";
	bmpAnimation.direction = 90;
	bmpAnimation.vX = SPEED_X;
	bmpAnimation.x = HERO_COL_X;
	bmpAnimation.y = CAN_HEIGHT - TEXT_BOX_HEIGHT - HERO_HEIGHT/2;
	
	bmpAnimation.currentFrame = 0;
	stage.addChild(bmpAnimation);
	
//@@@@@@@@@@@@@@@@@@@@@ TICK @@@@@@@@@@@@@@@@@@@@@@

	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(10);
	
}
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}

function tick() {

	if (bmpAnimation.x < HERO_COL_X) {
    // We've reached the left side of our screen
    // We need to walk right now
	
    bmpAnimation.direction = 90;
    bmpAnimation.gotoAndStop("walk");
    stage.removeChild(bmpAnimation);
    bmpAnimationIdle.gotoAndPlay("idle");
    stage.addChild(bmpAnimationIdle);
	}

	if (bmpAnimation.x >= (screen_width - HERO_COL_X)) {
	
		bmpAnimation.direction = -90;
		bmpAnimation.gotoAndPlay("walk");
	
	}
	
	
	if (bmpAnimation.direction == 90) {
	
        bmpAnimation.x += bmpAnimation.vX;
		
    }
    else {
	
        bmpAnimation.x -= bmpAnimation.vX;
    
	}

    // update the stage:
    stage.update();
	
}