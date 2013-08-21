/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./controllers')
  , passport = require('passport')
  , MongoStore = require('connect-mongo')(express)
  , query = require('./database')
  , app = express();


// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
query(function (db, uri) {
  app.use(express.session({
    store: new MongoStore({
      url: uri, 
      maxAge: 300000
    }),
    secret: 'your secret here'
  }));
  app.use(passport.initialize());
  app.use(passport.session());


  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));


  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  var middleware = [
    function (req, res, next) {
    //exposing the database
    req.db = db;
    // models loader
    var modelsLoaded = {};


    req.model = function (model) {
      console.log(model);
      if (modelsLoaded[model] === undefined) {
        modelsLoaded[model] = require('./models/' + model);
      }


      return modelsLoaded[model];
    };
    next();
    }
  ];

  app.get('/', middleware, routes.talk.index);
  app.get('/talk/:talk', middleware, routes.talk.get);

  
  app.get('/login', routes.auth.login);
  app.get('/login/callback', routes.auth.callback);
  app.get('/logout', routes.auth.logout);
  

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});