
/*
 * GET home page.
 */

exports.index = function(req, res){
	var category = req.params.category;
	console.log(category);
  	res.render('index', { category: category});
  	//res.render('index');
};