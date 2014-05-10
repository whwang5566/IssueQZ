var canvas;
var sceneBackground;

//container
var playerContainer;
var uiContainer;

//player
var player1SpriteSheet;
var player2SpriteSheet;

function initGame(){
	
    //resize canvas
 	canvas = document.getElementById("gameStage");

   	//stage
    stage = new createjs.Stage("gameStage");
    playerContainer= new createjs.Container(); 
    uiContainer = new createjs.Container(); 
    
    //background
    sceneBackground = new createjs.Bitmap("assets/background.jpeg"); 
    sceneBackground.scaleX = sceneBackground.scaleY = 0.5;

	//add container and background
    stage.addChild(sceneBackground);
    stage.addChild(playerContainer);
    stage.addChild(uiContainer);
    
    //init images
    initPlayersImage();
   
    //sound
    createjs.Sound.registerSound("assets/bgm.mp3","background");   
    createjs.Sound.addEventListener("fileload", loadSoundHandler);
    
    //register key functions
    //document.onkeydown = handleKeyDown;
    //document.onkeyup = handleKeyUp;

    //ticker
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);       
}   

function handleTick() {

	//update
	stage.update(); 
}

function initPlayersImage()
{
    player1SpriteSheet = new createjs.Bitmap("assets/fang.png"); 
}

function loadSoundHandler(event){
    var backgroundSound = createjs.Sound.play("background",{loop:true});
    backgroundSound.volume = 1;
}



/*
 *	For Form
 */

 //add question
 function addNewQuestion(){

 	//get modal body
 	var modalBody = $('#myModal');

 	//get data
 	var data = {
 		title:modalBody.find('#addQuestionTitle').val(),
 		content:modalBody.find('#addQuestionContent').val(),
 		answer:modalBody.find('#addQuestionAnswer').val()
 	};

 	console.log('submit for add new question. Data:'+JSON.stringify(data));
 	
    var url = "/question"; // the script where you handle the form input.
    
    //post to server
    $.ajax({
           type: "POST",
           url: url,
           data: data, 
           success: function(data)
           {
               alert(data); // show response from the php script.
           }
         });

    //hide modal
    $('#myModal').modal('hide');

 }
