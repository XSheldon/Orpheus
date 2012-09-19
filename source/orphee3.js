// declaration de variables

var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

var CAN_WIDTH = 960;
var CAN_HEIGHT = 640;
var TEXT_BOX_HEIGHT = 140;

var hero;
var item;
var scene_id = 0;

var currentMessage;



function handleClick(mouseEvent) {
    	
    	
  	
	// vérifier que le clic touche un objet
	var myitem = checkTouched(mouseEvent.clientX, mouseEvent.clientY, scene_id);
	
	
	
	// si oui il devient objet courrant
	if(myitem != null){

		//alert("Item id : "+myitem.id);
		currentMessage = displayOptions(scene_id, myitem.id);
		
	
	}
	else{
		
		
	// sinon le personnage se déplace
	if(hero == null){
		
		
				
	}
	else{
			hero.setGoalX(mouseEvent.clientX);						
   		
   							
			
		}
	
	}	
		
		
}

function init() {
   
   
	//find canvas and load images, wait for last image to load
    canvas = document.getElementById("testCanvas");
	canvas.addEventListener("click", handleClick);
    //canvas.onClick = handleClick;
    currentMessage = "";
    // create a new stage and point it at our canvas:
    stage = new createjs.Stage(canvas);
    // grab canvas width and height for later calculations:
    screen_width = canvas.width;
    screen_height = canvas.height;

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();
	
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

    // Our hero can be moved with the arrow keys (left, right)
  //  document.onkeydown = handleKeyDown;
    //document.onkeyup = handleKeyUp;

    // Creating the Hero
    
    hero = new Hero(contentManager.imgHero);
    //rabbit = new Rabbit("Rabbit", contentManager.imgRabbit, screen_width);
	//rabbit.x = CAN_WIDTH/2;
	//rabbit.y = TEXT_BOX_HEIGHT + rabbit.height/2;
	background = new createjs.Bitmap(contentManager.imgBackground);
       // cerberus = new Cerberus("Cerberus", contentManager,ilgRabbit, screen_width);
      //  cerberus.x = CAN_WIDTH/3;
     //   cerberus.y = TEXT_BOX_HEIGHT + cerberus.height/2;
        
	
	
    stage.addChild(background);
	
	
	
   // stage.addChild(cerberus);
	
   //stage.addChild(rabbit);
    
    stage.addChild(hero);
        
    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    // Best Framerate targeted (60 FPS)
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(15);
	
}
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}



function tick() {

       
        // Calling explicitly each tick method 
        // to launch the update logic of each monster
        //rabbit.tick();
        
        // If the Hero is still alive and if he's too near
        // from one of the monster...
        // if ( rabbit.hitRadius(Hero.x, Hero.y, Hero.hit)) {
            //...he must die unfortunately!
           // alert("Oh, un lapin");
        
    

    // Update logic of the hero
    hero.tick();

    // update the stage:
    stage.update();
	
}