
/**
 * Module dependencies.
 */

//db
require('./models/db');

var express = require('express');
var routes = require('./routes');
var question = require('./routes/question');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//API
app.get('/', routes.index);
app.get('/:category', routes.index);
app.post('/questions/:category', question.list);
app.post('/question', question.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
