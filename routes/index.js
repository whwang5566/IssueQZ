
/*
 * GET home page.
 */

exports.index = function(req, res){
	//var category = req.params.category;
	var fbid = req.user && req.user.id;
	var login = "login";
	var name = "Guest";

	//check login
	if(req.isAuthenticated()){
		login = "logout";
		name = req.user.displayName;
	}


	//res.sendfile('./public/index.html');
  	res.render('index', { 'name':name,'login': login});
  	//res.render('index');
};

exports.aboutPage = function(req, res){
	var login = "login";

	//check login
	if(req.isAuthenticated()){
		login = "logout";
		name = req.user.displayName;
	}


	//res.sendfile('./public/index.html');
  	res.render('about', {'login': login});
  	//res.render('index');
}

exports.eventsPage = function(req, res){
	var login = "login";

	//check login
	if(req.isAuthenticated()){
		login = "logout";
		name = req.user.displayName;
	}


	//res.sendfile('./public/index.html');
  	res.render('events', {'login': login});
  	//res.render('index');
}

exports.profilePage = function(req, res){
	var login = "login";

	//check login
	if(req.isAuthenticated()){
		login = "logout";
		name = req.user.displayName;
	}


	//res.sendfile('./public/index.html');
  	res.render('profile', {'login': login});
  	//res.render('index');
}

/*
 * User
 */
var mongoose = require('mongoose');
var Users = mongoose.model('User');

/*
 * GET users listing.
 */

exports.userList = function(req, res){
  //res.send("respond with a resource");

  Users.find(function (err,users,count){
  		if(err){
  			console.error(err);
  			req.json({error: err.name}, 500);
  		}
  		res.json({users:users});
  	});
};


/*
 * GET game page
 */

exports.game = function(req, res){
	var category = req.params.category;
	console.log(category);
  	res.render('questionGame', { category: category});
  	//res.render('index');
};


var mongoose = require('mongoose');
var Question = mongoose.model('Question');

/*
 * GET questions 
 */

exports.questionsList = function(req, res){
  	//res.send("respond with a resource :");
    var category = req.params.category;
    if(category === undefined){
      category = "nuclear";
    }

  	// Question.find(function (err,questions,count){
  	// 	if(err){
  	// 		console.error(err);
  	// 		req.json({error: err.name}, 500);
  	// 	}
  	// 	res.json({questions:questions});
  	// });
    Question.find().where('category').equals(category).exec(function (err,questions,count){
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

exports.createQuestion = function(req, res){
	//new question
	var question = new Question(req.body);
	console.log('req:'+JSON.stringify(req.body));
  console.log('question:'+JSON.stringify(question));
	
  //check login
  if(req.isAuthenticated()){
    var fbid = req.user && req.user.id;
    console.log('fbid:'+fbid);
  }
  else{
    console.log('user not login.');
  }
    
  //save
  question.save(function (err,newQuestion){
  	if(err){
  		console.error(err);
  		res.json({error: err.name}, 500);
  	}
  	res.json(newQuestion);
  });
};
