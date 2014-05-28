var mongoose = require('mongoose');
var Question = mongoose.model('Question');

/*
 * GET questions listing.
 */

exports.list = function(req, res){
  	//res.send("respond with a resource :");
  	Question.find(function (err,questions,count){
  		if(err){
  			console.error(err);
  			req.json({error: err.name}, 500);
  		}
  		res.json({questions:questions});
  	});
};

/*
 * POST question create.
 */

exports.create = function(req, res){
	//new question
	var question = new Question(req.body);
	console.log('req:'+JSON.stringify(req.body));
  console.log('question:'+JSON.stringify(question));
	
  	//save
  	question.save(function (err,newQuestion){
  		if(err){
  			console.error(err);
  			res.json({error: err.name}, 500);
  		}
  		res.json(newQuestion);
  	});
};
