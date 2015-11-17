'use strict';

var _ = require('lodash');
var validator = require('validator');
var mongoose = require('mongoose');
var URL = require('url');

require('../models/user');
var User = mongoose.model('User');

// var helpers = require('../helpers');

// 用户列表
exports.index = function(req, res, next) {
  res.render('people/index', { title: 'person home', person: req.session.person });
};

// 用户注册
exports.signup = function(req, res, next){

  var opts = {
    layout: 'layouts/auth', 
    title: '新用户注册',
    errors: {}
  };

  var method = req.method.toLowerCase();
  if(method === 'get'){
    res.render('people/signup', opts);
    return;
  }

  // post method
  var username = req.body.username,
      email = req.body.email,
      password = req.body.password,
      password2 = req.body.password2;

  // 缓存用户名密码
  res.locals.username = username;
  res.locals.email = email;
  res.locals.password = password;
  res.locals.password2 = password2;

  // validators
  if(validator.isNull(username)){
    opts.errors.username = '用户名为空!';
  }
  if(validator.isNull(email)){
    opts.errors.email = '邮箱为空!';
  }
  if(!validator.isEmail(email)){
    opts.errors.email = '邮箱格式有误!';
  }
  if(validator.isNull(password)){
    opts.errors.password = '密码为空!';
  }
  if(validator.isNull(password2)){
    opts.errors.password2 = '确认密码为空!';
  }
  else if(password2 !== password){
    opts.errors.password2 = '密码不一致!';
  }

  if(Object.keys(opts.errors).length){
    res.render('people/signup', opts);
    return;
  }

  // TODO 验证email是否重复
  User.find({
    $or: [{
      username: username
    }, {
      email: email
    }]
  }, function(err, users){
    if(err){
      return next(err);
    }

    users.forEach(function(user){
      if(user && user.username === username){
        opts.errors.username = '用户名已经被占用!';
      }

      if(user && user.email === email){
        opts.errors.email = '邮箱已经被注册!';
      }
    });

    if(Object.keys(opts.errors).length){
      res.render('people/signup', opts);
      return;
    }

    // 验证通过, 持久化数据
    var user = new User(req.body);

    user.save(function(err){ // 也可以使用 User.Create(properties, callback) 方式保存数据
      if(err){
        return next(err);
      }

      // 跳转到登录页
      res.redirect('/signin');
    });

  });

};

// 用户登录
exports.signin = function(req, res, next){

  var opts = {
    layout: 'layouts/auth',
    title: '用户登录',
    errors: {},
    redirectTo: req.query.redirectTo || req.body.redirectTo
  };

  var method = req.method.toLowerCase();
  if(method === 'get'){
    res.render('people/signin', opts);
    return;
  }

  // post method
  var email = req.body.email,
      password = req.body.password;

  // 缓存用户名密码
  res.locals.email = email;
  res.locals.password = password;

  // validators
  if(validator.isNull(email)){
    opts.errors.email = '邮箱为空!';
  }
  if(!validator.isEmail(email)){
    opts.errors.email = '邮箱格式有误!';
  }
  if(validator.isNull(password)){
    opts.errors.password = '密码为空!';
  }

  if(!req.session){
    opts.errors.info = 'session不可用!';
    console.info(opts.errors.info);
  }

  if(Object.keys(opts.errors).length){
    res.render('people/signin', opts);
    return;
  }

  // 简单验证通过, 查询用户数据进行校验
  User.findOne({
    email: email
  }, function(err, user){
    if(err){
      return next(err);
    }

    if(!user){
      opts.errors.email = '邮箱有误!';
    }
    else if(!user.authenticate(password)){ // 此处user对象一定要存在, 否则会报错
      opts.errors.password = '密码有误!';
    }
    if(Object.keys(opts.errors).length){
      res.render('people/signin', opts);
      return;
    }

    // 保存用户信息至session
    req.session.person = {
      uid: user.id,
      username: user.username,
      email: email
    };

    var redirectPath = URL.parse(req.body.redirectTo || '').path;
    // 跳转至Referer或首页
    res.redirect(redirectPath || '/');
  });

};

// 用户退出
exports.signout = function(req, res, next){
  // 清除session中的用户信息
  if(req.session && req.session.person){
    req.session.person = null;
  }

  // 跳转至登录页
  res.redirect('/signin');
};

// 用户登录状态验证
exports.authenticate = function(req, res, next){
  if(req.session && req.session.person){
    res.locals.person = req.session.person;
    return next();
  }

  //  缓存当前的页面地址
  var redirectPath = URL.parse(req.originalUrl).path;

  // 跳转至登录页
  res.redirect('/signin?redirectTo=' + encodeURIComponent(redirectPath));
};



