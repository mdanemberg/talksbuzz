

var ObjectID = require('mongodb').ObjectID;

/*
 * GET posts list
 */
exports.index = function(req, res){
	var Talk = req.model('talk')
	  ,	talkId = req.param('talk')
	  ,	since = req.param('since');

	Talk.getPosts({_id: new ObjectID(talkId), since: since}, function (err, posts) {
		if (err) {
			res.send('Database error', 500);
		} else {
			console.log(posts);
			res.render('index', { posts: posts });
		}
	});
  
};