  $(function(){
    $('#auth_form').validate({
      debug: true,
      submitHandler: function(form) {
        form.submit();
        // $(form).ajaxSubmit();
      },
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 20
        },
      },
      messages: {
        email: {
          required: '邮箱为空!',
          email: '邮箱格式有误!'
        },
        password: {
          required: '密码为空!',
          minlength: $.validator.format('最短不能小于{0}个字符'),
          maxlength: $.validator.format('最长不能超过{0}个字符')
        },
      },
      errorPlacement: function($error, $element) {
        var $formGroup = $element.parent("div.form-group");
        // $error.prepend('<i class="fa fa-times-circle-o"></i>');
        $error.addClass('control-label');
        $formGroup.prepend( $error );
      },
      // errorClass: '',
      // validClass: '',
      // errorElement: 'label',
      showErrors: function(errorMap, errorList){
        // console.log(this.numberOfInvalids());
        this.defaultShowErrors();
      },
      highlight: function(element, errorClass, validClass){
        var $formGroup = $(element).parent("div.form-group");
        $formGroup.removeClass('has-success').addClass('has-error');
      },
      unhighlight: function(element, errorClass, validClass){
        var $formGroup = $(element).parent("div.form-group");
        $formGroup.removeClass('has-error').addClass('has-success');
        // 删除错误提示标签, 解决输入框右侧图标定位问题
        $(element).prev('label.control-label').remove();
      }
    });
  });