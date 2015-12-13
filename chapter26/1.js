'use strict';

// 个人觉得这章讲的并不是设计模式。

// 获取兄弟元素名称
function getSublingName(node) {
  if (node.previousSibling) {
    var name = '';
    var count = 1;
    var nodeName = node.nodeName;
    var sibling = node.previousSibling;

    while (sibling) {
      // 如果节点为元素 并且 节点类型与前一个兄弟类型相同，并且前一个兄弟元素名称存在
      if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
        if (nodeName == sibling.nodeName) {
          name += ++count;
        } else {
          // 重置相同紧邻节点名称节点个数
          count = 1;
          name += '|' + sibling.nodeName.toUpperCase();
        }
      }

      sibling = sibling.previousSibling;
    }

    return name;
  } else {
    return '';
  }
}

// XPath 解释器
var Interpreter = (function() {
  return function(node, wrap) {
    var path = [];
    wrap = wrap || document;

    // 如果当前（目标）节点等于容器节点
    if (node === wrap) {
      if (wrap.nodeType === 1) {
        path.push( wrap.nodeName.toUpperCase() );
      }

      return path;
    }

    if (node.parentNode !== wrap) {
      path = Interpreter(node.parentNode, wrap);
    } else {
      if (wrap.nodeType == 1) {
        path.push( wrap.nodeName.toUpperCase() );
      }
    }

    var sublingsNames = getSublingName(node);

    if (node.nodeType == 1) {
      path.push(node.nodeName.toUpperCase() + sublingsNames);
    }

    return path;
  }
})();



var path = Interpreter(document.getElementById('test'));
console.log(path.join('>')); // HTML>BODY|HEAD>P2

// 测试html
// <p id="test">222</p>

