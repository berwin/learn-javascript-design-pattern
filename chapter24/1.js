'use strict';

// 背景：上一页下一页

function Page() {
  var cache = {};

  return function(page, fn) {
    // 如果有缓存
    if (cache[page]) {
      fn && fn(cache[page]);
    } else {
      $.get('./data/getxxx').success(function(data) {
        cache[page] = data;
        fn && fn(data);
      });
    }
  }
}