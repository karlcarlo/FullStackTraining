'use strict'

###*
 * 依赖加载
###
assert = require('chai').assert
mongoose = require 'mongoose'
User = mongoose.model 'User'
Article = mongoose.model 'Article'

###*
 * 全局声明
###
user = null
article = null

###*
 * 单元测试
###
describe 'Article Model 单元测试:', ->
  beforeEach (done) ->
    user = new User
      username: 'username'
      email: 'test@test.com'
      password: 'password'

    user.save ->
      # console.log 'user saved'
      article = new Article
        title: '文章标题'
        content: '文章内容'
        author: user

      done()

  describe 'save方法', ->
    it '正常保存不应该出现问题', (done) ->
      article.save (err) ->
        assert.isNull err
        done()

    it '标题为空时保存应该会出现错误', (done) ->
      article.title = ''
      article.save (err) ->
        # console.log err
        assert.isNotNull err
        done()

  afterEach (done) ->
    # 清除测试数据
    Article.remove().exec ->
      User.remove().exec done
