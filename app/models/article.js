'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var helpers = require('../helpers');

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

// timestamp
ArticleSchema.virtual('timestamp')
.get(function(){
  return helpers.dateFormat(this.updated);
});

mongoose.model('Article', ArticleSchema);