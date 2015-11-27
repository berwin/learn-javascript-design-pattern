'use strict';

// 原型式继承
function inheritObject(o) {
  // 声明一个过渡函数
  function F() {}

  // 过渡对象的原型继承父对象
  F.prototype = o;

  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}

/**
 * 寄生式继承 继承原型
 *
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */
function inheritPrototype(subClass, superClass) {
  var p = new inheritObject(superClass.prototype);

  p.constructor = subClass;

  subClass.prototype = p;
}


// 定义父类
var SuperClass = function(name) {
  this.name = name;
  this.colors = ['red', 'green', 'yellow'];
};

// 定义父类原型方法
SuperClass.prototype.getName = function() {
  console.log(this.name);
};

// 定义子类
var SubClass = function(name, time) {
  // 构造函数式继承
  SuperClass.call(this, name);

  // 子类新增属性
  this.time = time;
};

// 寄生式继承父类原型
inheritPrototype(SubClass, SuperClass);

// 子类新增原型方法
SubClass.prototype.getTime = function() {
  console.log(this.time);
};

var a = new SubClass('javascript', '2015');
var b = new SubClass('Nodejs', '2015');

a.getName();