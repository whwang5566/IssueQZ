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
		}
	});
}

function initProfile(res){
	console.log("msg:"+res);
}