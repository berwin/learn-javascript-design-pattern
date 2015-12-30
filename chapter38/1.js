'use strict';

// 初始化MVC对象
var MVC = MVC || {};

// 数据模型层
MVC.model = (function () {
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
      return this;
    },
    setConf: function (c, v) {
      M.conf[c] = v;
      return this;
    }
  };
})();

// 视图层
MVC.view = (function () {
  // 模型数据层对象操作方法引用
  var M = MVC.model;

  // 内部视图创建方法
  var V = {};

  return function (v) {
    // 根据视图名称返回视图（由于获取的是一个方法，所以需要执行一边方法获取视图）
    V[v]();
  };

})();

// 控制器层
MVC.ctrl = (function () {
  // 模型数据层对象操作方法引用
  var M = MVC.model;
  // 视图层对象操作方法引用
  var V = MVC.view;

  // 控制器创建方法对象
  var C = {};

  // 执行
  for (var i in C) {
    C[i] && C[i]();
  }
})();
