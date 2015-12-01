'use strict';

var Config = (function() {
  // 私有变量
  var config = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 1000
  };

  // 返回取值器对象
  return {
    // 取值器方法
    get: function(name) {
      return config[name] ? config[name] : null;
    }
  }
})();

var count = Config.get('COUNT');
console.log(count);