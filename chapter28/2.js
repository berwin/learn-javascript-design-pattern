'use strict';

// 通过事件委托为 当前页面不存在的元素 绑定事件

var article = document.getElementById('article');
article.onclick = function(e) {
  var event = e || event;
  var target = event.target || event.srcElement;

  if (target.nodeName.toLowerCase() === 'p') {
    target.innerHTML = '我要改变这段内容';
  }
};

var p = document.createElement('p');
p.innerHTML = '新增一段内容';
article.appendChild(p);

// 测试html
// <div id="article">呵呵哒</div>