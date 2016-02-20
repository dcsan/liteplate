'use strict';

let debug = require('debug')('app');

var express = require('express');

var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var reload = require('reload');
// var livereload = require('express-livereload');

let AppConfig = require('./private/AppConfig.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.devmode = true;
// app.locals.reloadUrl = 'someUrl';

// routes and subapps
let routes = [];
function addRoute(path, jsfile) {
  let sub = require(jsfile);
  app.use(path, sub);
  // routes.push(sub, path);
}
addRoute('/', './views/index/index.js');
addRoute('/users', './views/users/users.js');
addRoute('/video', './views/video/video.js');
addRoute('/animate', './views/animate/animate.js');


// app.use(cookieParser());

// gzip js files on the fly
var compress = require('compression');
app.use(compress());
app.use(express.static(path.join(__dirname, 'public')));

// https://github.com/code42day/connect-gzip-static
// var gzipStatic = require('connect-gzip-static');
// var oneDay = 86400000;
// app.use(gzipStatic(path.join(__dirname, '/public'), { maxAge: oneDay }));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

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
