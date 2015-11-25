  $(function() {
    var editor = editormd("editormd", {
      toolbarIcons: function(){
        return [
          "undo", "redo", "|", 
          "bold", "del", "italic", "quote", "ucwords", "|", 
          "h1", "h2", "h3", "h4", "h5", "h6", "|", 
          "list-ul", "list-ol", "hr", "|",
          "link", "reference-link", "image", "code", "code-block", "table", "datetime", "|",
          "goto-line", "watch", "preview", "clear", "search", "|",
          "help"
        ];
      },
      htmlDecode: "style,script,iframe|on*",
      taskList: false,
      placeholder: '请输入内容',
      syncScrolling: 'single',
      height: 480,
      path : "/lib/editor.md/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL: '/upload'
    });

    // 添加标签验证规则
    $.validator.addMethod('tagMaxLength', function(val, elem, len){
      return this.optional(elem) || val.trim().split(' ').length <= len;
    }, $.validator.format('标签最多输入{0}个'));

    // 表单绑定校验组件
    $('#article_form').validate({
      rules: {
        title: {
          required: true,
          minlength: 4,
          maxlength: 60
        },
        tags: {
          tagMaxLength: 10
        }
      },
      messages: {
        title: {
          required: '标题为空!',
          minlength: $.validator.format('最短不能小于{0}个字符'),
          maxlength: $.validator.format('最长不能超过{0}个字符')
        }
      },
      errorPlacement: function($error, $element) {
        var $formGroup = $element.parent("div.form-group");
        // $error.prepend('<i class="fa fa-times-circle-o"></i>');
        $error.addClass('control-label');
        $formGroup.find('.help-block').after( $error );
      },
      highlight: function(element, errorClass, validClass){
        var $formGroup = $(element).parent("div.form-group");
        $formGroup.removeClass('has-success').addClass('has-error');
        $formGroup.find('.help-block').hide();
      },
      unhighlight: function(element, errorClass, validClass){
        var $formGroup = $(element).parent("div.form-group");
        $formGroup.removeClass('has-error').addClass('has-success');
        // 删除错误提示标签, 解决输入框右侧图标定位问题
        $(element).prev('label.control-label').remove();
        $formGroup.find('.help-block').show();
      }

    });
  });
