'use strict';

var _ = require('lodash');
var validator = require('validator');
var mongoose = require('mongoose');

require('../models/article');
var Article = mongoose.model('Article');

// var helpers = require('../helpers');

// 文章列表
exports.index = function(req, res, next) {
  res.render('articles/index', { layout: 'layouts/admin', title: 'articles home', person: req.session.person });
};

exports.show = function(req, res, next) {
  res.render('articles/show');
};

exports.new = function(req, res, next) {
  res.render('articles/edit', { layout: 'layouts/admin' });
};

exports.create = function(req, res, next) {
  res.redirect('/articles');
};

exports.edit = function(req, res, next) {
  res.render('articles/edit', { layout: 'layouts/admin' });
};

exports.update = function(req, res, next) {
  res.redirect('/articles');
};

exports.destroy = function(req, res, next) {
  res.redirect('/articles');
};

