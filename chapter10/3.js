'use strict';

function arrToObj(arr) {
  return {
    name: arr[0],
    type: arr[1],
    title: arr[2],
    data: arr[3]
  };
}

var arr = ['javascript', 'book', '前端编程语言', '12月1日'];

var obj = arrToObj(arr);

console.log(obj);