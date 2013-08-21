var query = require('../database');

module.exports = function (collection) {
	var _public = {};

	_public.find = function (filter, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.find(filter).toArray(function (err, items) {
					cb(err, items);
					db.close();
				});
				
			});
		});
	};

	_public.findOne = function (filter, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.findOne(filter, function (err, items) {
					cb(err, items);
					db.close();
				});
			});
		});
	};

	_public.findOrCreate = function (filter, data, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.findAndModify(filter, [], data, {upsert:true}, function (err, items) {
					cb(err, items);
					db.close();
				});
			});
		});
	};

	_public.update = function (filter, data, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.update(filter, data, {multi: true}, function (err, items) {
					console.log('update', err, items);
					cb(err, items);
					db.close();
				});
			});
		});
	};

	_public.insert = function (data, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.insert(data, {w:1}, function (err, items) {
					cb(err, items);
					db.close();
				});
			});
		});
	};

	_public.remove = function (data, cb) {
		query(function (db) {
			db.collection(collection, function (err, collection) {
				collection.remove(data, function (err, items) {
					cb(err, items);
					db.close();
				});
			});
		});	
	}

	return _public;
};