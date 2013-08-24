

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
			for (var i = 0, max = talks.length; i < max; i++) {
				var description = talks[i].description.substr(0,197);
				if (description.length == 197) description = description + '...';
				talks[i].description = description;
			}

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