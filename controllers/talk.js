


var index = require('../models/index');

/*
 * GET talks list
 */
exports.index = function(req, res){
	var Talk = req.model('talk');

	Talk.find({}, function (err, talks) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.render('index', { title: 'oi', talks: talks });
		}
	});
  
};