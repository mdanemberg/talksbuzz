

var ObjectID = require('mongodb').ObjectID
  ,	Talk = require('../models/talk');

/*
 * GET posts list
 */
exports.index = function(req, res){
	
	var Talk = req.model('talk')
	  ,	talkURI = req.param('talk')
	  ,	since = req.param('since');

	Talk.getPosts({uri: talkURI, since: since}, function (err, posts) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.send(posts);
		}
	});
};


/*
 * POST post
 */
exports.create = function(req, res){
	
	var Talk = req.model('talk')
	  ,	talkURI = req.param('talk');
	
	var post = {
		author: req.user[0]._id,
		body: req.param('body'),
		date: new Date()
	};


	Talk.update({uri: talkURI}, {'$push': {posts: post}}, function (err, talk) {
		if (err) {
			res.send('Database error', 500);
		} else {
			res.send(post);
		}
	});
};

exports.getPosts = function(data, cb) {
	var talkURI = data.talk
	  ,	since = data.since;

	Talk.getPosts({uri: talkURI, since: since}, function (err, posts) {
		if (err) {
			cb({
				status: 'error'
			});
		} else {
			cb({
				status: 'ok',
				posts: posts
			});
		}
	});
};