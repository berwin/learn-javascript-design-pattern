'use strict';

var SuperClass = function() {
  this.superValue = true;
};

// 为父类添加公有方法
SuperClass.prototype.getSuperValue = function() {
  return this.superValue;
};

var SubClass = function() {
  this.subValue = false;
};

// 继承父类
SubClass.prototype = new SuperClass();

// 为子类添加公有方法
SubClass.prototype.getSubValue = function() {
  return this.subValue;
};

var a = new SubClass();

console.log('a.getSuperValue() =', a.getSuperValue()); // true
console.log('a.getSubValue() =', a.getSubValue()); // false
console.log('a.superValue =', a.superValue); // true
console.log('a.subValue =', a.subValue); // false

console.log('a instanceof SubClass =', a instanceof SubClass); // true
console.log('a instanceof SuperClass =', a instanceof SuperClass); // true
console.log('SubClass instanceof SuperClass =', SubClass instanceof SuperClass); // false
console.log('SubClass.prototype instanceof SuperClass =', SubClass.prototype instanceof SuperClass); // true

// 有缺陷，用new SubClass()创建两个实例时 a, b，这两个实例的属性是同一个，a修改属性superValue，b的superValue会被a修改