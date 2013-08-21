
/*
 * GET home page.
 */

exports.talk = require('./talk');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};