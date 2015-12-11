'use strict';

var eachObject = function(obj, fn) {
  for (var i in obj) {
    fn(obj[i], i, obj);
  }
};

eachObject({a: '123', b: '456', c: '789'}, function(item, key, obj) {
  console.log(item, key, obj);
});