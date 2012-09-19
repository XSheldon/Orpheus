(function (window) {
    function Hero(imgHero) {
        this.initialize(imgHero);
    }
    Hero.prototype = new createjs.BitmapAnimation();


	
	var CAN_WIDTH = 960;
	var CAN_HEIGHT = 640;
	var HERO_WIDTH = 310;
	var HERO_HEIGHT = 310;
	var HERO_COL_X = 100; // colision a partir du centre
	var TEXT_BOX_HEIGHT = 140;
	var SPEED_X = 15;
	
    // public properties:
 
    Hero.prototype.hit = 0;
	Hero.prototype.width = HERO_WIDTH;
	Hero.prototype.height = HERO_HEIGHT;
	Hero.prototype.colX = HERO_COL_X;
	Hero.prototype.goalX ;
	Hero.prototype.speedX = SPEED_X;
	Hero.prototype.setGoalX = function (newX){
		this.goalX = newX;
	};

    // constructor:
    Hero.prototype.BitmapAnimation_initialize = Hero.prototype.initialize; //unique to avoid overiding base class

   
    Hero.prototype.initialize = function (imgHero) {
        
		
		
		
		
		// todo
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgHero], //image to use
            frames: { width:HERO_WIDTH, height:HERO_HEIGHT, 
				regX:HERO_WIDTH/2, regY: HERO_HEIGHT/2 },
            animations: {
                walk: [0,1,2,3,4,5,"walk"],
	        idle: [0,0]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(
			localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);

        // start playing the first sequence:
        this.gotoAndPlay("walk");     //animate
        this.isInIdleMode = true;
		
		//@todo
		this.x = HERO_COL_X;
		this.y = CAN_HEIGHT - HERO_HEIGHT + 32;
		this.goalX = HERO_COL_X;

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated monster if you disabled the shadow.
        //this.shadow = new createjs.Shadow("#000", 3, 2, 2);
        this.name = "Hero";
        // 1 = right & -1 = left
        this.direction = 1;

        // velocity
        this.vX = SPEED_X;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 0;

        //Size of the Bounds for the collision's tests
        this.bounds = HERO_COL_X;
        this.hit = this.bounds;
    }

    Hero.prototype.tick = function () {
    	
    	
        
        if((this.x-this.goalX) < (0-this.colX/2)){
        	
        	
        	// si la cible est a droite on va a droite
        	   this.direction = 1;
        	   this.gotoAndPlay("walk");
        	   this.x += this.speedX * this.direction;
               
              //bmpAnimation.gotoAndStop("walk");
    		//stage.removeChild(bmpAnimation);
    		//bmpAnimationIdle.gotoAndPlay("idle");
    		//stage.addChild(bmpAnimationIdle);
    		
        	
        }
        else{
        	
        	// si la cible est a gauche on va a gauche
        if((this.x-this.goalX) > (this.colX/2)){
        	 this.direction = -1;
               this.gotoAndPlay("walk_h");	
               this.x += this.speedX * this.direction;
              
        
        }
        else{
        	// si on n'est pas trop loin on s'arrete
        	 	this.gotoAndPlay("idle");
              
        	
        	
        }
        
        if((HERO_COL_X == CAN_WIDTH - 10)){
           background2 = new createjs.Bitmap(contentManager.imgBackground2);
            stage.addChild(background2);
        }
        }
        
        
    }

    window.Hero = Hero;
} (window));