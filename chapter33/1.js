'use strict';

function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  }
}

// 测试

var obj = {
  name: 'berwin'
};

function test(age) {
  console.log(this.name, age);
}

var a = bind(test, obj);
a(20); // berwin 20