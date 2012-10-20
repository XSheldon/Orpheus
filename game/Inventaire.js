function Inventaire() {
        Inventaire.prototype.init();
    }
    
  
    Inventaire.prototype.mesItems ; // array ou tableau ordonee des items
    
        var myArray = [{x:512, y:576, w:53, h:53},
                       {x:512, y:636, w:53, h:53},
                       {x:512, y:700, w:53, h:53},
                       {x:512, y:762, w:53, h:53},
                       {x:512, y:825, w:53, h:53},
                       {x:512, y:887, w:53, h:53},
                       {x:512, y:576, w:53, h:53},
                       {x:575, y:636, w:53, h:53},
                       {x:575, y:700, w:53, h:53},
                       {x:575, y:762, w:53, h:53},
                       {x:575, y:825, w:53, h:53},
                       {x:575, y:887, w:53, h:53},
                      ];
                      
 
        Inventaire.prototype.items = new Array();




     Inventaire.prototype.coordonnees = function(rang_dans_le_tableau){
         
      
         
         
     };
    
     Inventaire.prototype.init = function(){
    	 items = new Array();
     };

  
  
  // une methode addItem
  Inventaire.prototype.addItem = function (item) {
	  
	  
	  
	  if(items.length <12){
	  items.push(item);
	  
	  //virer l'item de l'Žcran et reflechir  a l'architecture pour que ca ne revienne pas quand on revient sur l ecran
	  //@todo : regarder avant d'afficher un item ˆ l'Žcran s'il est actif ou pas
	  
	  return true;
	  }
	  else{
		  displayMessage("My back hurts, my bad is so heavy. I should try to sort the things I've taken with me");
		  return false;
	  }
      
  };
  // une methode removeItem
  Inventaire.prototype.removeItem = function (item) {
      
	  //@TODO
      
  };
  
  //une methode getItem(coordonnees)
  Inventaire.prototype.getItem = function (clicx, clicy) {
      //trouver le bin index
  //retourer mesitems[index]
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
  }