
/**
 * Module dependencies.
 */

//db
require('./models/db');
require('./config/passport'); // TODO [FB] : Passport configuration

var express = require('express');
var routes = require('./routes');
//var question = require('./routes/question');
//var game = require('./routes/game');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');

var app = express();

// all environments
app.set('port', process.env.PORT || 5566);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
//app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.cookieParser('IssueQZ'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
// Session based flash messages
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//API
app.get('/', routes.index);
app.get('/about', routes.aboutPage);
app.get('/events', routes.eventsPage);
app.get('/profile', routes.profilePage);
app.get('/user', routes.userList);
app.get('/game/:category',routes.game);
app.post('/questions/:category', routes.questionsList);
app.post('/question', routes.createQuestion);

//fb login
app.get('/login',function(req, res, next){
	passport.authenticate('facebook')(req, res, next);
});

app.get('/fbcb', passport.authenticate('facebook', {
  successRedirect:'/',
  failureRedirect: '/',
  successFlash: 'Welcome!',
  failureFlash: 'Login Fail.'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
