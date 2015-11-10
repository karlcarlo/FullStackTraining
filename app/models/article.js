'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
  title: { type: String, index: true },
  content: String,
  author: { type: ObjectId, ref: 'User'},
  tags: [{
    name: String,
    description: String
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

mongoose.model('Article', ArticleSchema);