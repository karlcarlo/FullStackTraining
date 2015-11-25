'use strict';

var _ = require('lodash');
var validator = require('validator');
var mongoose = require('mongoose');

var debug = require('debug')('express:articles');

require('../models/article');
var Article = mongoose.model('Article');

// var helpers = require('../helpers');

// 文章列表
exports.index = function(req, res, next) {
  Article.find()
  .populate('author')
  .sort({ 'created': -1 })
  .exec(function(err, articles){
    if(err){
      return next(err);
    }
    res.render('articles/index', {
      pageClass: 'home',
      message: {
        content: req.flash('message_content'),
        status: req.flash('message_status'), // success | info | warning | danger
      },
      articles: articles
    });
  });
};

// 最新发布
exports.recent = function(req, res, next) {
  Article.find()
  .select('_id title')
  .sort({ 'created': -1 })
  .limit(5)
  .exec(function(err, articles){
    if(err){
      return res.status(500).json(err);
    }
    res.json(articles);
  });
};

// 文章详情
exports.show = function(req, res, next) {
  var article_id = req.params.id;

  // 校验id是否有效
  if(!article_id && article_id !== 24){
    return next();
  }

  // 查询指定文章数据
  Article.findById(article_id)
  .populate('author')
  .exec(function(err, article){
    // 未查询到结果
    if(!article){
      return next();
    }
    res.render('articles/show', {
      pageClass: 'single',
      message: {
        content: req.flash('message_content'),
        status: req.flash('message_status'), // success | info | warning | danger
      },
      article: article
    });
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
    if(err){
      return next(err);
    }
    req.flash('message_status', 'success');
    req.flash('message_content', '文章创建成功!');
    res.redirect('/articles');
  });
};

// 编辑
exports.edit = function(req, res, next) {
  var article_id = req.params.id;

  // 校验id是否有效
  if(!article_id && article_id !== 24){
    return next();
  }

  // 查询指定文章数据
  Article.findById(article_id)
  .exec(function(err, article){
    if(err){
      return next(err);
    }
    // 未查询到结果
    if(!article){
      return next();
    }

    res.render('articles/edit', {
      layout: 'layouts/admin',
      article: article,
      isEdit: true
    });
  });
};

// 更新
exports.update = function(req, res, next) {
  debug('catch put method');

  var article_id = req.params.id;

  var title = req.body.title,
    content = req.body.content,
    tags = req.body.tags;

  // 校验id是否有效
  if(!article_id && article_id !== 24){
    return next();
  }

  // 查询指定文章数据
  Article.findById(article_id)
  .exec(function(err, article){
    if(err){
      return next(err);
    }
    // 未查询到结果
    if(!article){
      return next();
    }

    // 更新数据
    article.title = title;
    article.content = content;
    // article.tags = tags.split(' ');

    article.save(function(err){
      if(err){
        return next(err);
      }

      req.flash('message_status', 'success');
      req.flash('message_content', '文章修改成功!');
      res.redirect('/articles/' + article.id);
    });

  });

};

// 删除
exports.destroy = function(req, res, next) {
  res.redirect('/articles');
};

