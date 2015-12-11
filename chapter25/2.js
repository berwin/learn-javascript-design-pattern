'use strict';

var forEach = function(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr);
  }
};

forEach([1,2,3,4], function(item, i, arr) {
  console.log(item, i, arr);
});