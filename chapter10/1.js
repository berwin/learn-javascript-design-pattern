'use strict';

// 定义框架
var A = A || {};

// 通过id获取元素
A.g = function(id) {
  return document.getElementById(id);
};

// 为元素绑定事件
A.on = function(id, type, fn) {
  // 如果传递参数是字符串则以id处理，否则以元素对象处理
  var dom = typeof id ==='string' ? this.g(id) : id;

  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
};

A.on(window, 'load', function() {
  // 按钮点击事件
  A.on('mybutton', 'click', function() {
    // xxx
  });
});



// 背景：忽然项目中想把依赖换成jQuery，但总不能所有的方法都用jQuery的语法重新写一遍，那就写个适配器吧~

/********* 适配器（适配jQuery） *************/

A.g = function(id) {
  // 通过jQuery获取jQuery对象，然后返回第一个成员
  return $(id).get(0);
};

A.on = function(id, type, fn) {
  // 如果传递参数是字符串则以id处理，否则以元素对象处理
  var dom = typeof id === 'string' ? $('#' + id) : $(id);

  // 绑定事件
  dom.on(type, fn);
};

