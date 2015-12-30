'use strict';

// 只是搭建一个大题的架构，落实到具体功能上的例子在书中查看~~

var MVP = function () {};

MVP.model = (function () {
  // 内部数据对象
  var M = {};

  // 服务端获取的数据，通常通过ajax获取并存储
  // 缓存起来，减少异步请求操作
  M.data = {};

  // 配置数据，页面加载时即提供
  M.conf = {};

  return {
    getData: function (m) {
      return M.data[m];
    },
    getConf: function (c) {
      return M.conf[c];
    },
    setData: function (m, v) {
      M.data[m] = v;
      return v;
    },
    setConf: function (c, v) {
      M.conf[c] = v;
      return v;
    }
  };
})();

MVP.view = (function () {
  return function (str) {
    var html = '';

    // 将参数字符串转换成期望模板
    return html;
  }
})();

MVP.presenter = (function () {
  var V = MVP.view;
  var M = MVP.model;
  var C = {};

  return {
    init: function () {
      for (var i in C) {
        C[i] && C[i](M, V, i);
      }
    }
  };
})();

MVP.init = function () {
  this.presenter.init();
};
