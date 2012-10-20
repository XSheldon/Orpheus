// declaration de variables

var canvas;
var stage;
var observePanel;
var activatePanel;
var takePanel;
var screen_width;
var screen_height;
var bmpAnimation;

var CAN_WIDTH = 960;
var CAN_HEIGHT = 640;
var TEXT_BOX_HEIGHT = 140;
var NB_SCENES = 9;

var hero;
// item de l'inventaire selectionne ?
var item;
var scene_id = 0;

// chiffre (id)
var currentItem;
var inventaire;
// Les bitmaps de la scene
var bitmaps;

function handleClick(mouseEvent) {

	// verifier que le clic touche un objet et le retourner
	var item = checkTouched(mouseEvent.clientX, mouseEvent.clientY, scene_id);

	// si oui il devient objet courrant
	if (item != null) {
		currentItem = item;
	} else {
		resetDisplay();
		hero.setGoalX(mouseEvent.clientX);

	}

	// si on a bien un objet courant 
	if (currentItem != null) {

		// on va ecrire dans la zone de texte sa description
		currentMessage = displayOptions(scene_id, currentItem.id, currentItem);
		// on va regarder si jamais le clic est dans la zone de texte ou d inventaire et agir 

	}

}

function handleObserve(mouseEvent) {
	// handler du clic dans la zone de texte

	if (currentItem != null) {

		// on va regarder si jamais le clic est dans la zone de texte ou d inventaire et agir 
		checkAction(0, currentItem);

	}

}

function handleActivate(mouseEvent) {
	// handler du clic dans la zone de texte

	if (currentItem != null) {

		// on va regarder si jamais le clic est dans la zone de texte ou d inventaire et agir 
		checkAction(1, currentItem);

	}

}

function handleTake(mouseEvent) {
	// handler du clic dans la zone de texte

	if (currentItem != null) {

		// on va regarder si jamais le clic est dans la zone de texte ou d inventaire et agir 
		checkAction(2, currentItem);

	}

}

function init() {

	//find canvas and load images, wait for last image to load
	canvas = document.getElementById("testCanvas");
	canvas.addEventListener("click", handleClick);

	observePanel = document.getElementById("observer");
	observePanel.addEventListener("click", handleObserve);
	activatePanel = document.getElementById("activer");
	activatePanel.addEventListener("click", handleActivate);
	takePanel = document.getElementById("prendre");
	takePanel.addEventListener("click", handleTake);

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
	bitmaps = new Array();
	inventaire = new Inventaire();

	contentManager = new ContentManager();
	//contentManager.SetDownloadCompleted(startGame);
	contentManager.StartDownload();
	contentManager.downloadNewScene(0);

}

function displayItems(){
	

	
	// on enleve les bitmaps de la scene precedente
	for(var k=0;k<bitmaps.length;k++){
		stage.removeChild(bitmaps[k]);
	}
	// on remet a jour la liste
	bitmaps = new Array();
	
	// on "telecharge" les images (items) associees
	contentManager.downloadItemsImages(scene_id);
	
	// on cree les bitmaps et on les ajoute a la scene aux bonnes coordonees
	var howManyObjects = contentManager.itemArray.length;
	
	for ( var i = 0; i < howManyObjects; i++) {
		
		var itemu = new createjs.Bitmap(contentManager.itemArray[i]);
		itemu.x = contentManager.xItems[i];
		itemu.y = contentManager.yItems[i];
		
		stage.addChildAt(itemu, 1);
		bitmaps.push(itemu);
	}
}

function next(next_scene_id) {

	if (next_scene_id < NB_SCENES && next_scene_id >= 0) {

		scene_id = next_scene_id;
		contentManager.downloadNewScene(scene_id);
		hero.setupXY();

		displayItems();
	}

}

function reset() {

	stage.removeAllChildren();
	createjs.Ticker.removeAllListeners();
	resetDisplay();
	stage.update();

}

function handleImageLoad(e) {

	startGame();
}

function handleImageLoadInGame(e) {

}

function startGame() {
	
	alert("startgame");

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
	displayItems();

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
	if (hero.leaveRight() == true) {
		next(scene_id + 1);
	}

	if (hero.leaveLeft() == true) {
		next(scene_id - 1);
	}

	// update the stage:
	stage.update();

}