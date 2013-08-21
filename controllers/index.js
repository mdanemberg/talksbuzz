
/*
 * GET home page.
 */

exports.user = require('./user');

var index = require('../models/index');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};