


/*
 * GET talks list
 */
exports.get = function(req, res){
	var Talk = req.model('talk')
	  ,	talkId = req.params('talk');

	Talk.find({}, function (err, talks) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.render('index', { title: 'oi', talks: talks });
		}
	});
  
};