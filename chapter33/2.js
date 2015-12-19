'use strict';

function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  }
}

var btn = document.getElementById('btn');
var p = document.getElementById('p');

function demoFn() {
  console.log(arguments, this);
  btn.removeEventListener('click', bindFn);
}

var bindFn = bind(demoFn, p);

btn.addEventListener('click', bindFn, false);

/*

// 另一种简单的写法
function test() {
  (function() {
    console.log(this)
    btn.removeEventListener('click', test);
  }).call(p);
}

btn.addEventListener('click', test, false);

*/