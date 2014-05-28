//questions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	question: {type:String, required:true},
	answer: {type:String, required:true},
	answerset: {type:Array,required:true,default:[]},
	created: {type: Date,default: Date.now},
	updated: Date
});

mongoose.model('Question',QuestionSchema);