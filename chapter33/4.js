'use strict';

function curry(fn) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);
  return function() {
    var addArgs = slice.call(arguments);
    var allArgs = args.concat(addArgs);
    return fn.apply(null, allArgs);
  }
}

// 测试
function add(num1, num2) {
  return num1 + num2;
}

var test = curry(add, 5);
console.log( test(5) ); // 10