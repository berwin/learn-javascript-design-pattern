'use strict';

function bind(fn, context) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 2);

  return function() {
    var addArgs = slice.call(arguments);
    var allArgs = args.concat(addArgs);

    return fn.apply(context, allArgs);
  }
}

var btn = document.getElementById('btn');

var obj = {
  name: 'berwin'
};

function demo(obj, e) {
  console.log(arguments);
}

var test = bind(demo, btn, obj);

btn.addEventListener('click', test);