var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var root_routes = require('./routes/index');
var people_routes = require('./routes/people');

var config = require('../config');

var _ = require('lodash');
var hbs = require('hbs');


var app = express();

// Global values
_.extend(app.locals, {
  version: config.version,
  title: config.app.title,
  description: config.app.description,
  keywords: config.app.keywords,
  messages: [],
  isDevelopment: process.env.NODE_ENV === 'development'
});

// handlebars
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {
  layout: 'layouts/default'
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', root_routes);
app.use('/people', people_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
