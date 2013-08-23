var baseModel = require('./baseModel')
  ,	User = require('./user')
  , ObjectID = require('mongodb').ObjectID
  ,	model = baseModel('talk');

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

model._findOne = model.findOne;

model.findOne = function (filter, cb) {
	this._findOne(filter, function (err, item) {
		if (err) {
			cb(err, item);
		} else {

			var authors = [];
			for (var i = 0; i < item.posts.length; i++) {
				authors.push(new ObjectID(item.posts[i].author + ''));
			}
			
			User.find({_id: {'$in': authors}}, function (err, items) {
				item.posts.map(function (single) {
					var author = single.author;


					for (var i = 0; i < items.length; i++) {
						if (items[i]._id.toString() === author.toString()) {
							single.author = items[i];
							break;
						}
					}
					return single;
					
				});
				
				cb(err, item);
				
			});

		}

	});
};

model._find = model.find;

model.find = function (filter, cb) {
	this._find({}, function (err, talks) {
		if (!err) {
			var now = new Date();
			for (var i = 0; i < talks.length; i++) {
				talks[i].status = 'upcoming';
				if (talks[i].finished) {
					talks[i].status = 'done';
				} else if (talks[i].startDate > now) {
					talks[i].status = 'live';
				}

			};
		}
		cb(err, talks);
	});
};

module.exports = model;
