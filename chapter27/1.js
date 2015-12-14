'use strict';

var A = function(selector) {
  return new A.fn.init(selector);
};

A.fn = A.prototype = {

  constructor: A,

  // 一些浏览器引擎在判断对象是否是数组的时候，不仅仅判断有没有length属性，是否通过‘[索引值]’方式访问元素，还会判断是否具有数组方法来确定是否要用数组的形式展现
  // 所以添加几个数组常用的方法增强数组特性
  push: Array.prototype.push,
  sort: Array.prototype.sort,
  splice: Array.prototype.splice,

  init: function(selector) {
    this[0] = document.getElementById(selector);
    this.length = 1;
    return this;
  },

  size: function() {
    return this.length;
  }
}

A.fn.init.prototype = A.fn;

// 对象扩展
A.extend = A.fn.extend = function() {
  // 扩展对象从第二个参数算起
  var i = 1;

  // 获取参数长度
  var len = arguments.length;

  // 第一个参数为源对象
  var target = arguments[0];

  if (i == len) {
    // 源对象等于当前对象
    target = this;

    // i从0计数
    i--;

    for (; i < len; i++) {
      for (var j in arguments[i]) {
        target[j] = arguments[i][j];
      }
    }

    return target;
  }
};

A.fn.extend({
  // 添加事件
  on: (function() {
    return function(type, fn) {
      if (document.addEventListener) {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener(type, fn, false);
        }
      } else if (document.attachEvent) {
        for (var i = 0; i < this.length; i++) {
          this[i].attachEvent('on' + type, fn);
        }
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i]['on' + type] = fn;
        }
      }
      return this;
    }
  })(),

  // 设置属性
  attr: function() {
    var arg = arguments;
    var len = arg.length;

    if (this.length < 1) return this;

    if (len === 1) {
      if (typeof arg[0] === 'string') {
        return this[0].getAttribute(arg[0]);
      }

      if (typeof arg[0] === 'object') {
        for (var i in arg[0]) {
          for (var j = 0; j < this.length; j++) {
            return this[j].setAttribute(i, arg[0][i]);
          }
        }
      }
    } else if (len === 2) {
      for (var j = 0; j < this.length; j++) {
        this[j].setAttribute(arg[0], arg[1]);
      }
    }

    return this;
  }
})


A('test').attr('class', 'demo').on('click', function() {
  console.log('clicked');
});

// 测试html

/*
<div id="test">test</div>
*/