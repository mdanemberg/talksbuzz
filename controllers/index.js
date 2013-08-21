
/*
 * GET home page.
 */

exports.auth = require('./auth');
exports.talk = require('./talk');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};