var mongoose = require('mongoose');
var Users = mongoose.model('User');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  //res.send("respond with a resource");

  Users.find(function (err,users,count){
  		if(err){
  			console.error(err);
  			req.json({error: err.name}, 500);
  		}
  		res.json({users:users});
  	});
};