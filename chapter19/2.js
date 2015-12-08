'use strict';

var InputStrategy = (function() {
  var strategy = {
    isNumber: function(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    },
    phone: function(value) {
      return /^1[3578]\d{9}$/.test(value);
    }
  };

  return {
    check: function(type, value) {
      // 去除首尾空白符
      value = value.replace(/^\s+|\s+$/g, '');

      return strategy[type] ? strategy[type](value) : '没有该类型的检测方法';
    },

    // 添加策略
    addStrategy: function(type, fn) {
      strategy[type] = fn;
    }
  }
})();

InputStrategy.addStrategy('mail', function(value) {
  return /^(\w+)(@\w+)(\.\w+)+$/.test(value);
});

var is = InputStrategy.check('mail', 'abc@gmail.com');

console.log(is);