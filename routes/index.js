
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

   //check login
  if(req.isAuthenticated()){
    var fbid = req.user && req.user.id;
    Users.find().where('fbid').equals(fbid).exec(function (err,users,count){
      if(err){
        //console.error(err);
        req.json({error: "Can't Find User"}, 500);
      }
      res.json(users);
    });
    
  }
  else{
    req.json({error: "Please Login"}, 500);
  }

};

exports.updateUser = function(req, res){
  //res.send("respond with a resource");

   //check login
  if(req.isAuthenticated()){

    var fbid = req.user && req.user.id;
    var data = req.body;

    //get
    Users.find().where('fbid').equals(fbid).exec(function (err,users,count){
      if(err){
        console.error(err);
      }

      //get user
      if(users.length!=0){
        var user = users[0];
        var category = data.category;

        var correctcount = user.correctcount;
        var questionSet = user.questionset;
        var totalcount = user.totalcount;

        //check
        if(correctcount === undefined) correctcount = 0;
        if(totalcount === undefined) totalcount = 0;

        correctcount = parseInt(correctcount) + parseInt(data.correctCount);
        totalcount = parseInt(totalcount) + parseInt(data.totalCount);
        //questionSet.push();

        //add question
        var questions = data.questions;
        for(var i = 0;i<questions.length;i++){
          if(questionSet.indexOf(questions[i]) == -1){
            questionSet.push(questions[i]);
          }
        }

        var conditions = { 'fbid' : fbid }
        , update = { $set:{correctcount:correctcount,questionset:questionSet,totalcount:totalcount} }
        , options = { multi: true };

        //console.log("user:"+JSON.stringify(user));
        //console.log("new data:"+JSON.stringify(req.body));
        //console.log("category:"+category);
        //console.log("totalcount:"+data.totalCount);
        //console.log("new data 2:"+JSON.stringify(correctcountSet));
        //console.log("new data 3:"+JSON.stringify(totalcountset));
        //update
        Users.update(conditions, update, options, function(){});
      }
    });


  }
  else{
    req.json({error: "Please Login"}, 500);
  }

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

    Question.find().where('category').equals(category).limit(10).exec(function (err,questions,count){
      if(err){
        console.error(err);
        req.json({error: err.name}, 500);
      }
      res.json({questions:questions});
    });

};

exports.getQuestions = function(req, res){
    //res.send("respond with a resource :");
    var questions = req.body.questions;
    
    //console.log('want q:'+JSON.stringify(questions));

    Question.find().where('_id').in(questions).exec(function (err,questions,count){
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
