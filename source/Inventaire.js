function Inventaire(mon_id,mon_frame_id) {
        Inventaire.prototype.initialize(mon_id);
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
                      
 
 
 myArray.forEach(function(value, index, array) {
    
    alert(
        'Index : ' + index
        + '\n' +
        'Valeur : ' + value
    );
    });
    




     Inventaire.prototype.coordonnees = function(rang_dans_le_tableau){
         
      
         
         
     }
    
  Inventaire.prototype.initialize = function () {
   
   
 
   // definir et initialiser mesitems
   this.mesitems = new Array(); // c'est une array d'array avec dedans un Item et une methode
       
  }
  
  
  // une methode addItem
  Inventaire.prototype.addItem = function () {
      
  }
  // une methode removeItem
  Inventaire.prototype.removeItem = function () {
      
      
  }
  
  //une methode getItem(coordonnees)
  Inventaire.prototype.getItem = function (clicx, clicy) {
      /trouver le bin index
  retourer mesitems[index]
  }