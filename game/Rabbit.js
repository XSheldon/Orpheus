(function (window) {
    function Rabbit(RabbitName, imgRabbit, x_end) {
        this.initialize(RabbitName, imgRabbit, x_end);
    }
	
	var CAN_WIDTH = 960;
	var CAN_HEIGHT = 640;
	var Rabbit_WIDTH = 100;
	var Rabbit_HEIGHT = 100;
	var Rabbit_COL_X = 50; // colision a partir du centre
	var TEXT_BOX_HEIGHT = 140;
	var SPEED_X = 10;

    Rabbit.prototype = new createjs.BitmapAnimation();

    // public properties:
    Rabbit.prototype.IDLEWAITTIME = 40;
    Rabbit.prototype.bounds = 0; //visual radial size
    Rabbit.prototype.hit = 0;     //average radial disparity
	Rabbit.prototype.height = Rabbit_HEIGHT;
	Rabbit.prototype.width = Rabbit_WIDTH;

    // constructor:
    Rabbit.prototype.BitmapAnimation_initialize = Rabbit.prototype.initialize; //unique to avoid overiding base class

    // variable members to handle the idle state
    // and the time to wait before walking again
    this.isInIdleMode = false;
    this.idleWaitTicker = 0;

    var quaterFrameSize;

    Rabbit.prototype.initialize = function (RabbitName, imgRabbit, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgRabbit], //image to use
            frames: {width: Rabbit_WIDTH, height: Rabbit_HEIGHT, 
			regX: Rabbit_WIDTH/2, regY: Rabbit_HEIGHT/2},
            animations: {
                walk: [0, 8, "walk"],
                idle: [9, "idle"]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(
			localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        // start playing the first sequence:
        this.gotoAndPlay("walk");     //animate

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated Rabbit if you disabled the shadow.
        //this.shadow = new createjs.Shadow("#000", 3, 2, 2);

        this.name = RabbitName;
        // 1 = right & -1 = left
        this.direction = 1;
        // velocity
        this.vX = SPEED_X;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 21;
    }

    Rabbit.prototype.tick = function () {
        if (!this.isInIdleMode) {
            // Moving the sprite based on the direction & the speed
            this.x += this.vX * this.direction;
            this.y += this.vY * this.direction;

            // Hit testing the screen width, otherwise our sprite would disappear
            if (this.x >= this.x_end - (quaterFrameSize + 1) || this.x < (quaterFrameSize + 1)) {
                this.gotoAndPlay("idle");
                this.idleWaitTicker = this.IDLEWAITTIME;
                this.isInIdleMode = true;
            }
        }
        else {
            this.idleWaitTicker--;

            if (this.idleWaitTicker == 0) {
                this.isInIdleMode = false;

                // Hit testing the screen width, otherwise our sprite would disappear
                if (this.x >= this.x_end - (quaterFrameSize + 1)) {
                    // We've reached the right side of our screen
                    // We need to walk left now to go back to our initial position
                    this.direction = -1;
                    this.gotoAndPlay("walk_h");
                }

                if (this.x < (quaterFrameSize + 1)) {
                    // We've reached the left side of our screen
                    // We need to walk right now
                    this.direction = 1;
                    this.gotoAndPlay("walk");
                }
            }
        }
    }

    Rabbit.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Rabbit.prototype.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }

    window.Rabbit = Rabbit;
} (window));