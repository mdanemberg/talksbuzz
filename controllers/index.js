
/*
 * GET home page.
 */

exports.auth = require('./auth');
exports.talk = require('./talk');
exports.post = require('./post');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};