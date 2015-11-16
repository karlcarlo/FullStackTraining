'use strict';

var _ = require('lodash');
var validator = require('validator');
var mongoose = require('mongoose');

require('../models/article');
var Article = mongoose.model('Article');

// var helpers = require('../helpers');

// 文章列表
exports.index = function(req, res, next) {
  Article.find()
  .populate('author')
  .sort({ 'updated': -1 })
  .exec(function(err, articles){

    res.render('articles/index', { pageClass: 'home', articles: articles });
  });
};

// 文章详情
exports.show = function(req, res, next) {
  var article_id = req.params.id;

  if(!article_id){
    return next();
  }

  Article.findOne({
    _id: article_id
  })
  .populate('author')
  .exec(function(err, article){
    if(!article){
      return next();
    }
    res.render('articles/show', { pageClass: 'single', article: article });
  });
};

// 新建
exports.new = function(req, res, next) {
  res.render('articles/edit', { layout: 'layouts/admin' });
};

// 创建
exports.create = function(req, res, next) {

  var title = req.body.title,
    content = req.body.content,
    tags = req.body.tags;

  var article = new Article();

  article.title = title;
  article.content = content;
  article.author = req.session.person.uid;
  // article.tags = tags.split(' ');
  
  article.save(function(err){
    res.redirect('/articles');
  });
};

// 编辑
exports.edit = function(req, res, next) {
  res.render('articles/edit', { layout: 'layouts/admin' });
};

// 更新
exports.update = function(req, res, next) {
  res.redirect('/articles');
};

// 删除
exports.destroy = function(req, res, next) {
  res.redirect('/articles');
};

