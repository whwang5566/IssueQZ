//Database

var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/IssueQZ';

mongoose.connect(process.env.MONGOLAB_URI || dbUrl);

//Error handler
mongoose.connection.on('error',function (err) {
	console.log(err);
});

//Connect
mongoose.connection.once('open',function (){
	console.log('db connection established.');
});

//require models schema
require('./questions');
require('./users');