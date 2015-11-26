'use strict';

var Check = function() {};

Check.prototype = {
  checkName: function () {
    console.log('校验姓名');

    return this;
  },

  checkEmail: function() {
    console.log('校验邮箱');

    return this;
  },

  checkPassword: function() {
    console.log('校验密码');

    return this;
  }
};

var a = new Check();
a.checkName().checkEmail().checkPassword();