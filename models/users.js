//questions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fbid: {type:String, required:true},
	name: {type:String, required:false,default:"Guest"},
	questionset: {type:Array,required:false,default:[]},
	correctcountset: {type:Array, required:false,default:[]},
	totalcountset: {type:Array, required:false,default:[]},
	totalcount:{type:Number, required:false,default:0},
	correctcount:{type:Number, required:false,default:0},
	addedquestion: {type:Number, required:false,default:0},
	created: {type: Date,default: Date.now},
	updated: Date
});

mongoose.model('User',UserSchema);