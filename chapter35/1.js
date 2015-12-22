'use strict';

var F = F || {};

F.define = function(str, fn) {
  var parts = str.split('.');
  var old = this;
  var parent = this;
  var i = 0;

  if (parts[0] === 'F') {
    parts = parts.slice(1);
  }

  // 如果是框架内部方法，return
  if (parts[0] === 'define' || parts[0] === 'module') {
    return;
  }

  for (var len = parts.length; i < len; i++) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }

    old = parent;

    parent = parent[parts[i]];
  }

  if (fn) {
    // 此时i等于parts.length故减一
    old[parts[--i]] = fn();
  }

  return this;
};

F.module = function() {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.pop();
  var parts = args[0] && args[0] instanceof Array ? args[0] : args;
  var modules = [];
  var modIDs = '';
  var i = 0;
  var ilen = parts.length;

  while (i < ilen) {
    if (typeof parts[i] === 'string') {
      var parent = this;
      modIDs = parts[i].replace(/^F\./, '').split('.');
      for (var j = 0; j < modIDs.length; j++) {
        parent = parent[modIDs[j]] || false;
      }
      modules.push(parent);
    } else {
      modules.push(parent[i]);
    }

    i++
  }

  fn.apply(null, modules);
};

F.define('string', function() {
  return {
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
  }
});

F.module('string.trim', function(trim) {
  console.log( trim(' 测试一下 ') );
});

F.module(['string'], function(string) {
  console.log( string.trim(' 测试一下2 ') );
});

/*
 * 总结
 *
 * define方法就是以第一个参数为key，第二个参数为value在F对象上添加一个方法，当然中间会有一个判断神马的
 *
 * module方法就是以第一个参数为key读取F对象上的方法push到数组中，用参数统一传给第二个参数
 *
 */