var MongoClient = require('mongodb').MongoClient
  ,	config = require('./config')
  ,	uri = 'mongodb://{user}{host}{port}/{database}';

if (config.database.user !== undefined && config.database.user !== '') {
	var user  = config.database.user;
	if (config.database.password !== undefined && config.database.password !== '') {
		user += ':' + config.database.password;
	}
	uri = uri.replace('{user}', user + '@');
} else {
	uri = uri.replace('{user}', '');
}

uri = uri.replace('{host}', config.database.host).replace('{port}', ':' + config.database.port).replace('{database}', config.database.database);

function query (cb) {
	MongoClient.connect(uri, function (err, db) {
		console.log("Database Error:", err);
		cb(db, uri);
	});
}


module.exports = query;

