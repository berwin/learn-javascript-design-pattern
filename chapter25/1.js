'use strict';

// 背景：页面中有好多焦点图，每一种都要重写一遍元素循环，所以需要建立一个基类，然后让不同种类的焦点图（轮播，淡入淡出）继承基类，此外，迭代器模式比较适合解决重复循环迭代的问题


// 迭代器
var Iterator = function(items, container) {
  var container = container && document.getElementById(container) || document;
  var items = container.getElementsByTagName(items);

  var length = items.length;

  // 当前索引
  var index = 0;

  var splice = Array.prototype.splice;

  return {
    /*
     * 获取第一个元素
     */
    first: function() {
      index = 0;
      return items[index];
    },

    /*
     * 获取最后一个元素
     */
    second: function() {
      index = length - 1;
      return items[index];
    },

    /*
     * 获取前一个元素
     */
    prev: function() {
      if (--index > 0) {
        return items[index];
      } else {
        index = 0;
        return items[index];
      }
    },

    /*
     * 获取后一个元素
     */
    next: function() {
      if (++index < length) {
        return items[index];
      } else {
        index = length - 1;
        return items[index];
      }
    },

    /*
     * 获取某一个元素
     */
    get: function(num) {
      index = num >= 0 ? num % length : num % length + length;
      return items[index];
    },

    /*
     * 对每一个元素执行某一个方法
     */
    dealEach: function(fn) {
      var args = splice.call(arguments, 1);

      for (var i = 0; i < length; i++) {
        fn.apply(items[i], args);
      }
    },

    /*
     * 对某一个元素执行某一个方法
     */
    dealItem: function(num, fn) {
      var args = splice.call(arguments, 2);
      // 通过this.get方法设置index索引值
      fn.apply(this.get(num), args);
    },

    /*
     * 排他方式处理某一个元素
     */
    exclusive: function(num, allFn, numFn) {
      // 对所有元素执行回调函数
      this.dealEach(allFn);

      // 如果num为数组
      if (Object.prototype.toString.call(num) === '[object Array]') {
        for (var i = 0; i < num.length; i++) {
          this.dealItem(num[i], numFn);
        }
      } else {
        this.dealItem(num, numFn);
      }
    }
  };
};

var test =  Iterator('li', 'container');

console.log(test.first());
console.log(test.prev());
console.log(test.next());
console.log(test.get(2000));

// 处理所有元素
test.dealEach(function(text, color) {
  this.innerHTML = text;
  this.style.background = color;
}, 'test', 'pink');

// 排他思想处理第3个与第4个元素
test.exclusive([2, 3], function() {
  this.innerHTML = '被排除的';
  this.style.background = 'green';
}, function() {
  this.innerHTML = '选中的';
  this.style.background = 'red';
});

// 测试HTML

/*<ul id="container">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>*/