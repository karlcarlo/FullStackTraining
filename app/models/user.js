'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: { type: String, index: true },
  password: String,
  created_at: { type: Date, default: Date.now },
});

mongoose.model('User', UserSchema);