//questions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	title: {type:String, required:true},
	content: {type:String, required:true},
	answer: {type:String, required:true},
	created: {	type: Date,default: Date.now},
	updated: Date
});

mongoose.model('Question',QuestionSchema);