'use strict';

function SuperClass(id) {
  this.books = ['Javascript', 'html', 'css'];

  // 值类型公有熟悉
  this.id = id;
}

SuperClass.prototype.showBooks = function() {
  console.log(this.books);
};

// 声明子类
function SubClass(id){
  // 继承父类
  SuperClass.call(this, id);
}

// 创建第一个子类的实例
var instance1 = new SubClass(10);

// 创建第二个子类的实例
var instance2 = new SubClass(11);

instance1.books.push('设计模式');

console.log(instance1);
console.log(instance2);

// 有缺陷 - 没公用prototype，而是所有子类都复制一遍SuperClass的属性和方法