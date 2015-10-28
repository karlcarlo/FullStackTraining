'use strict';

var _ = require('lodash');

// var helpers = require('../helpers');


exports.index = function(req, res, next) {
  res.render('people/index', { title: 'person home' });
};

exports.signup = function(req, res, next){
  res.render('people/signup', { layout: 'layouts/auth', title: 'person home' });
};

exports.signin = function(req, res, next){
  res.render('people/signin', { layout: 'layouts/auth', title: 'person home' });
};

exports.signout = function(req, res, next){
  res.render('people/signout', { title: 'person home' });
};