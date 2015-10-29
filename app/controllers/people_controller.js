'use strict';

var _ = require('lodash');

// var helpers = require('../helpers');

// 用户列表
exports.index = function(req, res, next) {
  res.render('people/index', { title: 'person home' });
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

  // validators
  if(username === ''){
    opts.errors.username = '用户名为空!';
  }
  if(email === ''){
    opts.errors.email = '邮箱为空!';
  }
  if(password === ''){
    opts.errors.password = '密码为空!';
  }
  if(password2 === ''){
    opts.errors.password2 = '再次密码为空!';
  }

  if(Object.keys(opts.errors).length){
    res.render('people/signup', opts);
    return;
  }

  // 验证通过
  res.redirect('/signin');
};

// 用户登录
exports.signin = function(req, res, next){
  res.render('people/signin', { layout: 'layouts/auth', title: 'person home' });
};

// 用户退出
exports.signout = function(req, res, next){
  res.render('people/signout', { title: 'person home' });
};