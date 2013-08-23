

var ObjectID = require('mongodb').ObjectID;

/*
 * GET talks list
 */
exports.index = function(req, res){
	var Talk = req.model('talk');

	Talk.find({}, function (err, talks) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.render('index', { talks: talks });
		}
	});
  
};

exports.get = function(req, res){
	var Talk = req.model('talk')
	  ,	talkURI = req.param('talk');

	Talk.findOne({uri: talkURI}, function (err, talk) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.render('talk', { talk: talk });
		}
	});
  
};