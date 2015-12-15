'use strict';

// 测试html

/*
<div id="container">
  <button id="btn">demo</button>
</div> 
*/

var g = function(id) {
  return document.getElementById(id);
};

g('btn').onclick = function() {
  g('container').innerHTML = '触发了事件';
};

// IE低版本问题
// 触发事件时，会把按钮自身替换掉，事件并没有清除，所以会泄露到内存中


// good
g('container').onclick = function(e) {
  var target = e && e.target || event.srcElement;

  if (target.id === 'btn') {
    g('container').innerHTML = '触发了事件';
  }
};
