var baseModel = require('./baseModel');

var model = baseModel('talk');

model.getPosts = function (filter, cb) {
	var since = filter.since;
	delete filter.since;
	this.findOne(filter, function (err, talk) {
		var posts = talk.posts;
		if (!!since) {
			posts = posts.slice(since);
		}
		cb(err, posts);
	});
}

module.exports = model;
