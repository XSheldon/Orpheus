
    function Item(mon_id,mon_frame_id) {
        Item.prototype.initialize(mon_id);
    }
    
   Item.prototype.id = 0; 
   Item.prototype.x = 0;
   Item.prototype.y = 0;
   Item.prototype.w = 0;
   Item.prototype.h = 0;
   Item.prototype.description_text = "";
   Item.prototype.takable = false;
   Item.prototype.textActivate = "";
   Item.prototype.functionActivate = null;
   Item.prototype.textResultActivate = ""; 
   Item.prototype.textObserver = "";
   Item.prototype.functionObserver = null;
   Item.prototype.combo = null;
    
    
  Item.prototype.initialize = function (mon_id, mon_frame_id) {
   
    
   this.id = mon_id;
   this.combo = new Array(); // c'est une array d'array avec dedans un Item et une methode
       
  };
  
      
    

   
   