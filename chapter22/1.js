'use strict';

function bindIEEvent(dom, type, fn, data) {
  var data = data || {};

  dom.attachEvent('on' + type, function(e) {
    fn.call(dom, e, data);
  });
}

// 我觉得这一章主要讲的是 call 的应用。。