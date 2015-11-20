'use strict';

var fs = require('fs');
var json_data = fs.readFileSync('./package.json');
var package_json = JSON.parse(json_data);

var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  version: package_json.version,
  root: rootPath,
  port: process.env.PORT || 3000,
  db: {
    uri: 'mongodb://localhost/fswf',
    options: {
      user: '',
      pass: ''
    }
  },
  app: {
    name: package_json.name,
    title: 'Full Stack Web Framework',
    description: 'MEAN Full Stack Web Framework',
    keywords: 'mean'
  }
};
