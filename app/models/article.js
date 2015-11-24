'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var marked = require('marked');

var helpers = require('../helpers');
var config = require('../../config');

var ArticleSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  },
  tags: [{
    name: String,
    description: String
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
});

// timestamp
ArticleSchema.virtual('timestamp')
.get(function(){
  return helpers.dateFormat(this.updated);
});

// marked options
marked.setOptions(config.markdown);

ArticleSchema.virtual('content_html')
.get(function(){
  return marked(this.content);
});

mongoose.model('Article', ArticleSchema);