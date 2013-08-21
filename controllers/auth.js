var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , config = require('../config')
  ,	User = require('../models/user');

passport.use(new FacebookStrategy({
		clientID: config.facebook.app_id,
		clientSecret: config.facebook.app_secret,
		callbackURL: config.facebook.callback_url
	},
	function(accessToken, refreshToken, profile, done) {
		profile._json.accessToken = accessToken;
		var data =profile._json;
		User.findOne({id: profile.id}, function(err, user) {
			if (err) { return done(err); }
			if (user === null) {
				user = {
					id: data.id,
					name: data.name,
					username: data.username,
					hometown: data.hometown,
					location: data.location,
					gender: data.gender,
					timezone: data.timezone,
					locale: data.locale,
					accessToken: data.accessToken,
					role: 'USER'
				};
				User.insert(user, function (err, user) {
					done(null, user[0]);
				});
				
			} else {
				var update = {
					$set: {
						name: data.name,
						username: data.username,
						hometown: data.hometown,
						location: data.location,
						gender: data.gender,
						timezone: data.timezone,
						locale: data.locale,
						accessToken: data.accessToken,
					}
				};
				User.update({_id: user._id}, update, function (err, doc) {
					done(null, user);
				});
			}
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.find({id: id}, function(err, user) {
		done(err, user);
	});
});

exports.login = passport.authenticate('facebook', { scope: [] });

exports.callback = passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' });

exports.logout = function (req, res) {
	req.session.destroy();
	res.redirect('/');
};