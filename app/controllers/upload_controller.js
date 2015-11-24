'use strict';

var fs = require('fs');
var path = require('path');
var URL = require('url');
var formidable = require('formidable');

var config = require('../../config');

exports.upload = function(req, res, next){
  // parse a file upload
  var form = new formidable.IncomingForm();
  var res_json = {
    success : 1,           // 0 表示上传失败，1 表示上传成功
    message : "文件上传成功",
    url     : "图片地址"        // 上传成功时才返回
  };

  form.parse(req, function(err, fields, files) {
    // 获取editor.md编辑器上传的图片
    var file = files['editormd-image-file'];

    if(file){

      var filename = Date.now() + '_' + file.name;
      var temp_path = file.path;
      var file_path = path.join(__dirname, '../../public/uploads/', filename);

      // 把上传的文件从临时目录移动到可访问的目录
      fs.rename(temp_path, file_path, function(err){
        if(err){
          return next(err);
        }

        res_json.url = config.upload.host + '/uploads/' + filename;
        res.json(res_json);
      });

    }
    else {
      res_json.success = 0;
      res_json.message = '上传失败';
      res.json(res_json);
    }
  });
};

exports.upload_form = function(req, res, next){
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title" value="上传图片标题"><br>'+
    '<input type="file" name="file" multiple="multiple"><br>'+
    '<input type="submit" value="上传">'+
    '</form>'
  );
};