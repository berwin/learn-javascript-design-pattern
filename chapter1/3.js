'use strict';

var Check = function() {
  this.checkName = function() {
    console.log('验证姓名');
  };

  this.checkEmail = function() {
    console.log('校验邮箱');
  };

  this.checkPassword = function() {
    console.log('校验密码');
  };
};

var a = new Check();
a.checkName();