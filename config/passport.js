var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//var clientID = '736947549697888';
var clientID = '736936806365629';

//var clientSecret = '5507b62400511ed11e00ad0ab17c6968';
var clientSecret = 'dd03f3b95e578ce6dd66a4965c7ff220';

//db
var mongoose = require('mongoose');
var Users = mongoose.model('User');

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID || clientID,
  clientSecret: process.env.FB_APP_SECRET || clientSecret,
  callbackURL: "/fbcb"
}, function(accessToken, refreshToken, profile, done){
  // Passport profile:
  // http://passportjs.org/guide/profile/
  // Once the profile is stored in session, it will be available in req.user.
  //

  //create user
  createUser(profile.id);
  done(null, profile);
}));


// Extract needed data from Passport profile object.
// For this app, we only need to know user.id.
//
// Required by Passport.
// Ref: https://github.com/jaredhanson/passport#sessions
//
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Returns user object from facebook id.
//
// Required by Passport.
// Ref: https://github.com/jaredhanson/passport#sessions
//
passport.deserializeUser(function(user, done) {
  done(null, user);
});



//create user
function createUser(id){

  //check login
  if(id){
    //login
    var fbid = id;
   
    //new question
    var user = new Users({'fbid':fbid});
    
    Users.find().where('fbid').equals(fbid).exec(function (err,users){
      if(err){
        console.error(err);
      }

      //if not exist
      console.log('count:'+users.length);
      if(users.length == 0){
          console.log('Create New User. fbid:'+fbid);
          //create user
          //save
          user.save(function (err,newUser){
            if(err){
              console.error(err);
            }
          });
      }
    });
  }
  else{
    //not login
    console.log('id error');
  }

  
};