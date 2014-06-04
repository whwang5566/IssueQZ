var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var clientID = '755158034503682';
var clientSecret = '7466c7fa6370d33ff9da3a21c8d35e70';

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID || clientID,
  clientSecret: process.env.FB_APP_SECRET || clientSecret,
  callbackURL: "/fbcb"
}, function(accessToken, refreshToken, profile, done){
  // Passport profile:
  // http://passportjs.org/guide/profile/
  // Once the profile is stored in session, it will be available in req.user.
  //
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