$(document).ready(function() {


 });

function scrollToGameDiv(){
	console.log(document.URL);
	//check 
	var topicsDiv = $('#topicsDiv');
	//if is in home page
	if(topicsDiv.length){
    	$('html,body').animate({ scrollTop: $('#topicsDiv').offset().top }, 'slow');
	}
	else{
		window.location.href = "/game/nuclear";
	}
}

/*
 *	for Profile
 */
function getUser(){
	$.ajax({
		url:'/user',
		type:'GET',
		//datatype:'json'
		success:initProfile,
		error:function(){
			console.log("can't get user data");
			alert('Please Login');
		}
	});
}

function initProfile(res){
	var profileData = res[0];
	var profile = $('#profileContainer');
	profile.find('#profileName').text(profileData.name);
	var imgUrl = 'http://graph.facebook.com/'+profileData.fbid+'/picture'
	console.log('url:'+imgUrl);
	profile.find('#profileImg').attr('src',imgUrl).height(100);

	//set data
	var StatContainer = profile.find('#StatsData');
	var totalCount = profileData.totalcount;
	var correctCount = profileData.correctcount;
	StatContainer.find('#correctcount').text(correctCount);
	StatContainer.find('#totalcount').text(totalCount);
	if(totalCount == 0) {
		StatContainer.find('#correctRatio').text(0);
	}
	else{
		StatContainer.find('#correctRatio').text(((correctCount/totalCount)*100).toFixed(1));
	}
}

//Event

function getUserQuestions(){
	$.ajax({
		url:'/user',
		type:'GET',
		//datatype:'json'
		success:initEvents,
		error:function(){
			console.log("can't get user data");
			alert('Please Login');
			$('#event-info').text('There is no events.');
		}
	});
}


function initEvents(res){

	var questionSet = res[0].questionset;
	var questions = {
		'questions':questionSet
	};

	console.log("questions:"+questions);

	$.ajax({
		url:'/getQuestions',
		type:'POST',
		data:questions,
		success:setEvents,
		error:function(){
			console.log("can't get user data");
			$('#event-info').text('There is no events.');
		}
	});
}

function setEvents(res){
	var events =  res.questions;

	console.log('events:'+events);

	if(events.length === 0){
		$('#event-info').text('There is no events.');
	}


	for(var i = 0;i<events.length;i++){
		console.log("add "+i+" :"+JSON.stringify(events[i]));
		var qEvent = events[i];
		var eventContainer = $('#event-cotainer').clone();

		//set data
		var categoryChi;
		if(qEvent.category == "nuclear"){
			categoryChi = "核能";
		}
		else if(qEvent.category == "trade"){
			categoryChi = "服貿";
		}
		else if(qEvent.category == "city"){
			categoryChi = "都更";
		}
		else if(qEvent.category == "economy"){
			categoryChi = "自經區";
		}

		eventContainer.find('#category').text(categoryChi);
		eventContainer.find('#question').text(qEvent.question);
		var answerChoose = qEvent.answer;
		var answer;
		if(answerChoose == "A"){
			answer = qEvent.answerset[0];
		}
		else if(answerChoose == "B"){
			answer = qEvent.answerset[1];
		}
		else if(answerChoose == "C"){
			answer = qEvent.answerset[2];
		}
		else if(answerChoose == "D"){
			answer = qEvent.answerset[3];
		}

		if(qEvent.category == "nuclear"){
			eventContainer.addClass('nuclear');
		}
		else if(qEvent.category == "trade"){
			eventContainer.addClass('trade');
		}
		else if(qEvent.category == "city"){
			eventContainer.addClass('city');
		}
		else if(qEvent.category == "economy"){
			eventContainer.addClass('economy');
		}


		eventContainer.find('#answer').text(answer);
		console.log('ex:'+qEvent.explanation.replace(/\s+/g, '').length);
		if(qEvent.explanation.replace(/\s+/g, '').length == 0){
			eventContainer.find('#exDiv').hide();
			eventContainer.find('#exLabel').hide();
		}
		else {
			eventContainer.find('#explain').text(qEvent.explanation);
		}
		eventContainer.find('#link').text(qEvent.link);
		eventContainer.find('#link').attr('href',qEvent.link);

		eventContainer.removeClass('hide');
		eventContainer.appendTo($('.event-div'));
		eventContainer.show();
	}


}

//add question
 function addNewQuestionToServer(){

 	var addNewQuestionModalBody = $('#addNewQuestionModal');
 	//get modal body
    var answerSet = [];
    answerSet.push(addNewQuestionModalBody.find("#addQuestionAnswer1").val());
    answerSet.push(addNewQuestionModalBody.find("#addQuestionAnswer2").val());
    answerSet.push(addNewQuestionModalBody.find("#addQuestionAnswer3").val());
    answerSet.push(addNewQuestionModalBody.find("#addQuestionAnswer4").val());

    //console.log('as:'+answerSet);

 	//get data
 	var data = {
 		question:addNewQuestionModalBody.find('#addQuestionTitle').val(),
 		//content:modalBody.find('#addQuestionContent').val(),
        category:addNewQuestionModalBody.find('#addQuestionCategory').val(),
        answerset:answerSet,
 		answer:addNewQuestionModalBody.find('#addQuestionAnswer').val(),
        explanation:addNewQuestionModalBody.find('#addQuestionExplanation').val(),
        link:addNewQuestionModalBody.find('#addQuestionLink').val()
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
    $('#addNewQuestionModal').modal('hide');

 }
