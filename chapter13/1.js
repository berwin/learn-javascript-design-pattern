'use strict';

var spans = document.getElementsByTagName('span');

spans[0].onmouseover = function() {
  this.style.color = 'red';
  this.style.background = '#ddd';
};
spans[0].onmouseout = function() {
  this.style.color = '#333';
  this.style.background = '#f5f5f5';
};

spans[1].onmouseover = function() {
  this.getElementsByTagName('strong')[0].style.color = 'red';
  this.getElementsByTagName('strong')[0].style.background = '#ddd';
};
spans[1].onmouseout = function() {
  this.getElementsByTagName('strong')[0].style.color = '#333';
  this.getElementsByTagName('strong')[0].style.background = '#f5f5f5';
};

// 使用桥接模式后
function changeColor(dom, color, bg) {
  dom.style.color = color;
  this.style.background = bg;
}

// 事件与业务逻辑的桥梁
spans[0].onmouseover = function() {
  changeColor(this, 'red', '#ddd');
};
spans[0].onmouseout = function() {
  changeColor(this, '#333', '#f5f5f5');
};
