'use strict';

// 访问器
var Visitor = (function() {
  return {
    splice: function() {
      // 获取参数，从第二个方法算起
      var args = Array.prototype.splice.call(arguments, 1);

      // 对第一个参数执行splice方法
      return Array.prototype.splice.apply(arguments[0], args);
    },

    push: function() {
      // 获取参数，从第二个方法算起
      var args = Array.prototype.splice.call(arguments, 1);

      return Array.prototype.push.apply(arguments[0], args);
    },

    pop: function() {
      return Array.prototype.pop.apply(arguments[0]);
    }
  };
})();

var a = {};
console.log(a.length);

Visitor.push(a, 1, 2, 3, 4, 5);
console.log(a.length);

Visitor.push(a, 6, 7, 8, 9);
console.log('push:');
console.log(a);
console.log(a.length);

Visitor.pop(a);
console.log('pop:');
console.log(a);
console.log(a.length);

Visitor.splice(a, 2, 2);
console.log('splice:');
console.log(a);
console.log(a.length);

// 我觉得本章主要讲的内容就是 call 和 apply 的应用