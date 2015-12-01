'use strict';

/*
 * 外观模式可以简化底层接口复杂性，也可以解决浏览器兼容性问题
 */

// 外观模式实现
function addEvent(dom, type, fn) {

  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
}

var myInput = document.getElementById('myinput');

addEvent(myInput, 'click', function() {
  console.log('绑定第一个事件');
});

addEvent(myInput, 'click', function() {
  console.log('绑定第二个事件');
});