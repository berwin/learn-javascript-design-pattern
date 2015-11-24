'use strict';

Function.prototype.addMethod = function(name, fn) {
  this.prototype[name] = fn;

  return this;
};

var Methods = function() {};

Methods.addMethod('checkName', function() {
  console.log('校验姓名');
}).addMethod('checkEmail', function() {
  console.log('校验邮箱');
});

var a = new Methods();
a.checkName();