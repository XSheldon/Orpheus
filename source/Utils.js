// CONSTANTES
var CAN_WIDTH = 960;
var CAN_HEIGHT = 640;
var TEXT_BOX_HEIGHT = 140;

var ACTION_PANEL_X = CAN_HEIGHT - TEXT_BOX_HEIGHT;
var ACTION_PANEL_Y = 0 ;
var ACTION_PANEL_W = CAN_WIDTH ;
var ACTION_PANEL_H = TEXT_BOX_HEIGHT ;


function checkTouched(clientX, clientY, scene_id){
		
		
		
		
		// charger les objets (id, w,y,w,h) de la page
		var mesActions = parseScene(scene_id);
		
		
		if(mesActions == null){ alert("parsing qui foire") ; return null; };
		
		// regarder si on est dans leur rectangle
		// pour chaque objet de la piece
		
		for(var k = 0; k < mesActions.length; k++){
		
			
   		if(isInside(clientX, clientY, mesActions[k].x, mesActions[k].y, 
   				mesActions[k].w, mesActions[k].h) == true){
   			
   			return mesActions[k];
   			
   		}// if
			
			
			
		}// for

		return null;
	
		
		
	}// method
	


function makeItem(mon_id, mon_frame_id, x, y, width, height, 
   				description, can_be_taken, textOnActivate, activate_function_name, textResultActivate,
   							textOnObserve, observe_function_name, listOfInteractions){
   	// listOfInteraction est une arraylist d'arraylist contenant un id d'objet
	// qui combote et le nom de
   	// la methode a appeler example listOfInteraction = [ (12, "ouvrirPorte"),
	// (14, "sefairemal") ]
   								
   				var myItem = new Item(mon_id, mon_frame_id);
   								
   				   myItem.id = mon_id; 
				   myItem.x = x;
				   myItem.y = y;
				   myItem.w = width;
				   myItem.h = height;
				   myItem.description_text = description;
				   
				   if(can_be_taken == 0){
				   myItem.takable = false;
				   }
				   else{
				   	can_be_taken = true;
				   }
				   
				   myItem.textActivate = textOnActivate;
				   myItem.functionActivate = tableDesCorrespondances(activate_function_name);
				   
				   
				   
				   
				   myItem.textResultActivate = textOnActivate; 
				   myItem.textObserver = textOnObserve;
				   myItem.functionObserver = tableDesCorrespondances(observe_function_name);
				   myItem.combo ; // @TODO
   				
   					return myItem;
   								
   				
   						
}
   	
   	function tableDesCorrespondances(function_string){
   		
   		// @todo : completer
   		
   		
   		if((function_string == "ouvrirPorte") == true){
   			
   			mafunction = function ouvrirPorte(){
   				
   				alert("La porte s ouvre");	
   				
   			};	
   			return mafunction;
   			
   			
   		}
   			
   		if(function_string == "" || function_string == null){
   			
   			// alert("Pas de fonction");
   			return null;
   			
   		}	
   			
   			
   	}
   	
   	function checkAction(x, y, item){
   		
   		// regarder si on a tape dans l inventaire ou dans la zone de dialogue
   		if(isInside(x, y, ACTION_PANEL_X, ACTION_PANEL_Y, 
   				ACTION_PANEL_H, ACTION_PANEL_W) == true){
   			
   			// 1) si c'est l'inventaire
   			
   			// 1-a) trouver quelle case on a touche
   			
   			// 1-b) s'il y a quelque chose dedans
   			
   			// 1-c) chercher la phrase a afficher + action (je ne peux rien
			// faire avec a ! / oh, a marche)
   			
   			
   			// 2) si c'est la zone de texte
   			// 2-a) trouver quelle action on a touche
   			// 2-b) s'il y a une action correspondante
   			// 2-c) chercher la phrase a afficher + action
   			return null;
   		}
   	
   		
   		return null;
   		
   		
   	}
   	
   	
  
   	
   function isInside(xClic, yClic, x, y, w, h){
   	
   		// ok
   		
   		
   	
	   	if( (xClic < x+w) && (xClic > x) && (yClic < y+h) && (yClic > y)){
	   		
	   	return true;	
	   	} 
	   	else{
	   		
	   		return false;
	   	}
   	
   	
   } 
   
   function parseScene(scene_id){

   	
   		var xmlhttp=new XMLHttpRequest();
   		url = "./entrancedata.xml";
   		xmlhttp.open("GET",url,false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		
		var toReturnItems = new Array();
		
		var items = xmlDoc.documentElement.getElementsByTagName("Room")[scene_id].getElementsByTagName("Item");
		
		
		
		for(var k=0; k< items.length ; k++){
			
			var itemu = new Item();
			itemu = craftItem(items[k],  parseInt(items[k].getAttribute("id")), scene_id);
		
			toReturnItems.push(itemu);
		
			
		}
		
		
		
		
		return toReturnItems;
   	
   							
   	
   	
   }

   
   function displayOptions(scene_id, id, item){
	   	// @TODO : Žcrire dans le panel a la place
	   	
	   	document.getElementById("description").innerHTML = item.description_text;
	   	
	   	if(item.takable == true){
	   	document.getElementById("prendre").innerHTML = "Prendre";
	   	}
	   	else {
	   		document.getElementById("prendre").innerHTML = "";
	   	}
	   	document.getElementById("activer").innerHTML = item.textActivate;
	   
	   	document.getElementById("observer").innerHTML = "Get a closer look";
	   	
	   }
      
   
  function resetDisplay(){
	  // @TODO = vider le panel a la place
	
	  
	document.getElementById("description").innerHTML = " ";
	   	
	   
	   	document.getElementById("prendre").innerHTML = " ";
	   

	   	
	   	document.getElementById("activer").innerHTML = " ";
	   
	   	document.getElementById("observer").innerHTML = " ";
	   	
	   
	   
   }

   
   function craftItem(monItem, item_id, scene_id){
   	
   		// alert(item_id+" "+scene_id);
   	
   	
   		var xm = parseInt(monItem.getElementsByTagName("x")[0].textContent);
   		
   		
   		
			var ym = parseInt(monItem.getElementsByTagName("y")[0].textContent);
			var wm = parseInt(monItem.getElementsByTagName("w")[0].textContent);
			var hm = parseInt(monItem.getElementsByTagName("h")[0].textContent);
			var monTexte = monItem.getElementsByTagName("texte")[0].textContent;
			var prenable = parseInt(monItem.getElementsByTagName("inventaire")[0].textContent);
			var textOnActivate = monItem.getElementsByTagName("texte")[1].textContent;
			var textResultActivate = monItem.getElementsByTagName("resultat")[0].textContent;
			var textOnObserve = monItem.getElementsByTagName("texte")[2].textContent;
			var activate_function_name = monItem.getElementsByTagName("effet")[0].textContent;
			var observe_function_name = monItem.getElementsByTagName("effet")[1].textContent;
			
//			
			var toReturn = 	makeItem(item_id, scene_id, xm, ym, wm, hm, 
   					monTexte, prenable, 
   					textOnActivate, activate_function_name, textResultActivate,
   							textOnObserve, observe_function_name, null); // tableau
																			// interaction
																			// todo
   							
   							
   							
			return toReturn;
   	
   	
   };
   		
   		
   		
   		
   		
   	