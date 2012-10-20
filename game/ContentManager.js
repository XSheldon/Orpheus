// Used to download all needed resources from oure
// webserver
function ContentManager() {
    // Method called back once all elements
    // have been downloaded
    //var ondownloadcompleted;
    // Number of elements to download
    //var NUM_ELEMENTS_TO_DOWNLOAD = 4;

    // setting the callback method
//    this.SetDownloadCompleted = function (callbackMethod) {
//        ondownloadcompleted = callbackMethod;
//    };

    // We have 4 type of enemies, 1 hero & 1 type of tile
    this.imgRabbit = new Image();
    this.imgHero = new Image();
    this.imgBackground = new Image();
    this.imgInventaire = new Image();
    this.imgBackground2 = new Image();
    this.imgCerberus = new Image();
    this.itemArray = new Array();
    this.xItems = new Array();
    this.yItems = new Array();
    
    //var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
    	
    //@TODO : le loader est a revoir	
       SetDownloadParameters(this.imgHero, "assets/img/Hero_mov.png", handleImageLoad, handleImageError);
      // SetDownloadParameters(this.imgRabbit, "assets/img/Rabbit.png", handleImageLoad, handleImageError);
       
        
	//SetDownloasParameters(this.imgCerberus, "assets/img/cerberus.png", handleImageLoad, handleImageonError);
        
 };
 
 this.downloadItemsImages = function (scene_id){
	 

	 
	 this.itemArray = new Array();
	 
	this.xItems = new Array();
	 this.yItems = new Array();

	 //@todo ICI
	
	 // r�cup�rer les id des items pr�sents, ainsi que leurs coordonn�es
	 var items = parseScene(scene_id);
	 var j=0;
	 
	 for(var i=0;i<items.length;i++){
		 

		 if(items[i].takable == true){
//			 
//			
//			
			 this.itemArray.push(new Image());
//			 
			
			 this.xItems.push(items[i].x-items[i].w/2);
			 this.yItems.push(items[i].y-items[i].h/2);
			 SetDownloadParameters(this.itemArray[j], "assets/items/"+items[i].id+".png", handleImageLoadInGame, handleImageError);
			 j++;
	 }
//		 
//		 
 }
	 
	
	 
	
	 
 };
 
 
 this.downloadIcon = function(id){
	 
	 var image = new Image();
	 
	 SetDownloadParameters(image, "assets/icons/"+id+".png", handleImageLoadInGame, handleImageError);
	 return image;
	 
 };
 
 this.downloadNewScene = function (scene_id) {
	 
	 // cleaner la zone de dialogue
	 resetDisplay();
	 currentItem = null;
	 
	 // les images de la scene
	 //@todo
     
	 
	 // le background
     SetDownloadParameters(this.imgBackground, "assets/img/"+scene_id+".jpg", handleImageLoadInGame, handleImageError);
    
     this.downloadItemsImages(scene_id);
     
     
};

    function SetDownloadParameters(imgElement, url, loadedHandler, errorHandler) {
        imgElement.src = url;
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    };

//    // our global handler 
//    function handleImageLoad(e) {
//        numImagesLoaded++;
//
//        // If all elements have been downloaded
//        if (numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD) {
//            numImagesLoaded = 0;
//            // we're calling back the method set by SetDownloadCompleted
//            ondownloadcompleted();
//        }
//    }
//
//    //called if there is an error loading the image (usually due to a 404)
//    function handleImageError(e) {
//        console.log("Error Loading Image : " + e.target.src);
//    }
}