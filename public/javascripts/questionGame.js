var canvas;
var sceneBackground;

//container
var playerContainer;
var uiContainer;

//player
var player1SpriteSheet;
var player2SpriteSheet;

function initGame(){
    var tmpQuestionPanel = '<li><input type="text" placeholder="New Task..."><span></span></li>',
        addButton = $('#add'),
        connected = $('.connected'),      // 三個 <ul>
        placeholder = $('#placeholder'),  // 三個 <ul> 的容器
        mainUl = $('.main'),              // main <ul>
        deleteUl = $('.delete'),          // delete <ul>
        doneUl = $('.done');              // done <ul>

    //resize canvas
 	  canvas = document.getElementById("gameStage");

    var ctx = canvas.getContext('2d');;
    ctx.canvas.width  = window.innerWidth;
    //ctx.canvas.height = window.innerHeight;

   	//stage
    stage = new createjs.Stage("gameStage");
    playerContainer= new createjs.Container(); 
    uiContainer = new createjs.Container(); 
    
    //background
    sceneBackground = new createjs.Bitmap("assets/background.jpeg"); 
    //sceneBackground.width = stage.width;
    //sceneBackground.height = stage.height;
    sceneBackground.scaleX = sceneBackground.scaleY = 0.6;

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
