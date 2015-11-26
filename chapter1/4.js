'use strict';

var Check = function() {};

Check.prototype = {
  checkName: function() {
    console.log('校验姓名');
  },

  checkEmail: function () {
    console.log('校验邮箱');
  },

  checkPassword: function () {
    console.log('校验密码');
  }
};

var a = new Check();
a.checkName();