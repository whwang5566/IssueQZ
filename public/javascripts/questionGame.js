var canvas;
var sceneBackground;

//container
var playerContainer;
var uiContainer;

//player
var player1SpriteSheet;
var player2SpriteSheet;

//ui element
var tmpQuestionPanel;
var tmpQuestionRadio;
var questionContainer;
var modalBody;

//data
var questionArray;
var currentQuestionIndex = 0;

//sprite sheet
var player1SpriteSheet;
var player2SpriteSheet;
var player1;
var player2;
var initialSetting = false;
var backgroundPosition = {x:0,y:0};

function initGame(){

    //template elements
    tmpQuestionPanel = '<div class="panel panel-info questionPanel"><div class="panel-heading"><h1 class="panel-title">Question</h1></div><div class="panel-body"><p class="question-title" id="questionContent"></p><div id="questionRadio"></div><p><a class="btn btn-primary btn-lg" role="button">Submit</a></p><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Add New Question</button></div></div>',
    tmpQuestionRadio = '<div class="radio"><label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"></label></div>',
    questionContainer = $('#questionContainer'),
    modalBody = $('#myModal');             // modal

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
    
    //console.log("width1:"+window.innerWidth+" width2:"+sceneBackground.getBounds());
	//add container and background
    stage.addChild(sceneBackground);
    stage.addChild(playerContainer);
    stage.addChild(uiContainer);
    
    //sound
    createjs.Sound.registerSound("assets/bgm.mp3","background");   
    //createjs.Sound.addEventListener("fileload", loadSoundHandler);
    
    //register key functions
    //document.onkeydown = handleKeyDown;
    //document.onkeyup = handleKeyUp;

    //init players
    initPlayers();

    //ticker
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);    

    //get questions from DB
    getQuestions();  

}   

function handleTick() {

    //initial
    if(initialSetting == false){
         initialSceneSetting();
    }
   
	//update
	stage.update(); 
}

function initialSceneSetting(){
    //need wait untill image loaded
    if((sceneBackground.getBounds()!=null) || (sceneBackground.getBounds()!=undefined)){
            //set background position
            sceneBackground.x = (window.innerWidth - (sceneBackground.getBounds().width*sceneBackground.scaleX))/2;

            backgroundPosition.x = sceneBackground.x;
            backgroundPosition.y = sceneBackground.y;

            //player position
            player1.x += backgroundPosition.x;
            player2.x += backgroundPosition.x;

            initialSetting = true;
    }

}

function loadSoundHandler(event){
    var backgroundSound = createjs.Sound.play("background",{loop:true});
    backgroundSound.volume = 1;
}

//init player
function initPlayers(){
    //player1
    //player1SpriteSheet = new createjs.Bitmap("assets/player1.png"); 
    /*
    player1SpriteSheet = new createjs.SpriteSheet({
        "animations":{
            "down_walk": {"frames":[0,1,2,1],"speed":0.1},
            "left_walk": {"frames":[3,4,5,4],"speed":0.1},
            "right_walk": {"frames":[6,7,8,7],"speed":0.1},
            "up_walk":{"frames":[9,10,11,10],"speed":0.1},
            "idel":1,
            "down_idle":1,
            "left_idle":4,
            "right_idle":7,
            "up_idle":10
            },
            "images": ["assets/player1.png"],
            "frames":
                {
                    "height": 1111,
                    "width":1428,
                    "regX": 550,
                    "regY": 714,
                    "count": 1
                }
    }); 
    */

    //player1 = new createjs.Sprite(player1SpriteSheet);
    player1 = new createjs.Bitmap("assets/player1.png");
    player1.scaleX = player1.scaleY = 0.5;
    player1.x = 0;
    player1.y = 0;

    player2 = new createjs.Bitmap("assets/player2.png");
    //player2.scaleX = player1.scaleY = 0.5;
    player2.x = 1000;
    player2.y = 0;

    playerContainer.addChild(player1);
    playerContainer.addChild(player2);

}

//game end
function gameEnd(){
    console.log('Game End!');
}

//set current question
function setCurrentQuestion(){
    //console.log('array:'+JSON.stringify(questionArray));
    if(currentQuestionIndex >= questionArray.length){
        gameEnd();
    }
    else{
        var currentQuestion = questionArray[currentQuestionIndex];
        
        //console.log('current:'+JSON.stringify(currentQuestion));
        
        //get data
        var questionTitle = currentQuestion['question'];
        var currentAnswer = currentQuestion['answer'];
        var answerset = currentQuestion['answerset'];
        //create new question panel
        var questionPanel = $(tmpQuestionPanel);
        var questionPanelRadio = $(tmpQuestionRadio+tmpQuestionRadio+tmpQuestionRadio+tmpQuestionRadio);
        
        //set data
        questionPanel.find('#questionContent').html(questionTitle);
        questionPanel.find('#questionRadio').append(questionPanelRadio);
        questionPanel.find('#questionRadio').find('.radio').each(function(i,element){
            console.log(element);
            $(element).find('label').append(answerset[i]);
        });
        
        //append
        questionPanel.appendTo(questionContainer);
    }
}

//get questions from server
function getQuestions(){

    //get question url
    var url = "/questions"; 

    //post to server
    $.ajax({
           type: "GET",
           url: url,
           success: function(data)
           {
                console.log(JSON.stringify(data));
                //TODO check format
                questionArray = data.questions;
                //alert(data); // show response 
                //set question
                setCurrentQuestion(); 
           }
         });

}


/*
 *	For Form
 */

 //add question
 function addNewQuestionToServer(){

 	//get modal body
 	//var modalBody = $('#myModal');
    var answerSet = [];
    answerSet.push(modalBody.find("#addQuestionAnswer1").val());
    answerSet.push(modalBody.find("#addQuestionAnswer2").val());
    answerSet.push(modalBody.find("#addQuestionAnswer3").val());
    answerSet.push(modalBody.find("#addQuestionAnswer4").val());

    //console.log('as:'+answerSet);

 	//get data
 	var data = {
 		question:modalBody.find('#addQuestionTitle').val(),
 		//content:modalBody.find('#addQuestionContent').val(),
        answerset:answerSet,
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
                //alert('Add Success!'); 
           },
           error: function(){
                alert('Add Error!')
           }
         });

    //hide modal
    $('#myModal').modal('hide');

 }
