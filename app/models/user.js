'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  username: String,
  email: { type: String, index: true },
  // password: String,
  created_at: { type: Date, default: Date.now },
  salt: String,
  hashed_password: String
});

/**
 * 虚拟属性
 */
UserSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = crypto.randomBytes(16).toString('base64');
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
});

/**
 * 加密密码
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
UserSchema.methods.encryptPassword = function(password){
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  }
  else {
    return password;
  }
};

/**
 * 验证用户
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
UserSchema.methods.authenticate = function(password) {
  return this.hashed_password === this.encryptPassword(password);
};


mongoose.model('User', UserSchema);