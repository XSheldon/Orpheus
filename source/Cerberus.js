(function (window) {
    function Cerberus(CerberusName, imgCerberus, x_end) {
        this.initialize(CerberusName, imgCerberus, x_end);
    }
	
	var CAN_WIDTH = 960;
	var CAN_HEIGHT = 640;
	var Cerberus_WIDTH = 100;
	var Cerberus_HEIGHT = 100;
	var Cerberus_COL_X = 50; // colision a partir du centre
	var TEXT_BOX_HEIGHT = 140;
	var SPEED_X = 10;

    Cerberus.prototype = new createjs.BitmapAnimation();

    // public properties:
    Cerberus.prototype.IDLEWAITTIME = 40;
    Cerberus.prototype.bounds = 0; //visual radial size
    Cerberus.prototype.hit = 0;     //average radial disparity
	Cerberus.prototype.height = Cerberus_HEIGHT;
	Cerberus.prototype.width = Cerberus_WIDTH;

    // constructor:
    Cerberus.prototype.BitmapAnimation_initialize = Cerberus.prototype.initialize; //unique to avoid overiding base class

    // variable members to handle the idle state
    // and the time to wait before walking again
    this.isInIdleMode = false;
    this.idleWaitTicker = 0;

    var quaterFrameSize;

    Cerberus.prototype.initialize = function (CerberusName, imgCerberus, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgCerberus], //image to use
            frames: {width: Cerberus_WIDTH, height: Cerberus_HEIGHT, 
			regX: Cerberus_WIDTH/2, regY: Cerberus_HEIGHT/2},
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
        // of animated Cerberus if you disabled the shadow.
        //this.shadow = new createjs.Shadow("#000", 3, 2, 2);

        this.name = CerberusName;
        // 1 = right & -1 = left
        this.direction = 1;
        // velocity
        this.vX = SPEED_X;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 21;
    };

    Cerberus.prototype.tick = function () {
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

    Cerberus.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Cerberus.prototype.hitRadius = function(tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }
});
    window.Cerberus = Cerberus;
