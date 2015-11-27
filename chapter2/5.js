'use strict';

// 声明父类
function SuperClass(name) {
  this.name = name;
  this.books = ['Javascript', 'html', 'css'];
}

// 父类原型公有方法
SuperClass.prototype.showName = function() {
  return this.name;
};

// 声明子类
function SubClass(name, time) {
  SuperClass.call(this, name);

  this.time = time;
}

// 类式继承
SubClass.prototype = new SuperClass();

// 子类原型方法
SubClass.prototype.getTime = function() {
  return this.time;
};

var a = new SubClass('Javascript', '2015');
console.log(a)

// 有缺陷 - 父类构造函数调用两遍