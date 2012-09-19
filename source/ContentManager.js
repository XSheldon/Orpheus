// Used to download all needed resources from oure
// webserver
function ContentManager() {
    // Method called back once all elements
    // have been downloaded
    var ondownloadcompleted;
    // Number of elements to download
    var NUM_ELEMENTS_TO_DOWNLOAD = 3;

    // setting the callback method
    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    // We have 4 type of enemies, 1 hero & 1 type of tile
    this.imgRabbit = new Image();
    this.imgHero = new Image();
    this.imgBackground = new Image();
    this.imgInventaire = new Image();
    this.imgBackground2 = new Image();
    this.imgCerberus = new Image();
    
    var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
        SetDownloadParameters(this.imgHero, "image/Hero_mov.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgRabbit, "image/Rabbit.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgBackground, "image/0.jpg", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgBackground2, "image/1.jpg", handleImageLoad, handleImageError); 
	//SetDownloasParameters(this.imgCerberus, "image/cerberus.png", handleImageLoad, handleImageonError);
        
 }

    function SetDownloadParameters(imgElement, url, loadedHandler, errorHandler) {
        imgElement.src = url;
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // our global handler 
    function handleImageLoad(e) {
        numImagesLoaded++

        // If all elements have been downloaded
        if (numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD) {
            numImagesLoaded = 0;
            // we're calling back the method set by SetDownloadCompleted
            ondownloadcompleted();
        }
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }
}