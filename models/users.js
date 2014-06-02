//questions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fbid: {type:String, required:true},
	questionset: {type:Array,required:false,default:[]},
	correctcountset: {type:Array, required:false,default:[]},
	addedquestion: {type:Number, required:false,default:0},
	created: {type: Date,default: Date.now},
	updated: Date
});

mongoose.model('User',UserSchema);