'use strict';

var a = {
  common: {},
  client: {
    user: {
      username: 'berwin',
      uid: '123'
    }
  },
  server: {}
};

// 如果不知道服务器是否会将该属性或者该属性的上级属性正确的打印到页面中，直接获取属性会导致报错，所以每次操作都要一层一层做安全检查 var test = a && a.client && a.client.user && a.client.user.username;

// 通过迭代器我们即可减少编写这类校验代码
var getter = function(data, key) {
  if (!data) return undefined;

  var result = data;

  var keys = key.split('.');

  for (var i = 0; i < keys.length; i++) {
    if (result[keys[i]]) {
      result = result[keys[i]];
    } else {
      return undefined;
    }
  }

  return result;
}

console.log( getter(a, 'client.user.username') ); // berwin