'use strict';

// 背景：如果方法需要传入很多参数，那么记住这些参数的顺序是很难的，所以我们经常是以一个参数对象方式传入的。

function a(name, title, age, color, size, prize) {}

/*
 * obj.name: name
 * obj.title: title
 * obj.age: age
 * obj.color: color
 * obj.size: size
 * obj.prize: prize
 */

function a(obj) {}

 // 但是调用它的时候不知道传递的参数是否完整，此时我们通常的做法是用适配器来适配传入的参数对象

function a(obj) {
  var _default = {
    name: '雨夜清荷',
    title: '设计模式',
    age: '20',
    color: 'pink',
    size: 100,
    prize: 50
  };

  for (var i in obj) {
    _default[i] = obj[i] || _default[i];
  }

  // code ....
}