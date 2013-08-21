


var index = require('../models/index');

/*
 * GET talks list
 */
exports.index = function(req, res){
	var Talk = req.model('talk');

	var talks = Talk.find();
	
  res.render('index', { title: 'oi', talks: talks });
};