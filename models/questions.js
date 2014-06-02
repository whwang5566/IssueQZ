//questions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	question: {type:String, required:true},
	category: {type:String, required:true,default:'nuclear'},
	answer: {type:String, required:true},
	answerset: {type:Array,required:true,default:[]},
	explanation: {type:String, required:false},
	link: {type:String, required:false},
	created: {type: Date,default: Date.now},
	updated: Date
});

mongoose.model('Question',QuestionSchema);