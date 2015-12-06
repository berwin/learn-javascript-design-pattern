'use strict';

// 背景：分页新闻功能

// 享元对象
var Flyweight = (function() {
  // 已创建的元素
  var created = [];

  /*
   * 创建一个新闻包装容器
   * 根据我自己对享元模式的理解，享元模式的精髓就在于『创建对象的同时，缓存一份对象，日后直接对缓存的对象做操作』
   */
  function create() {
    var dom = document.createElement('div');
    // 讲容器插入新闻列表容器中
    document.getElementById('container').appendChild(dom);
    // 缓存新创建的元素
    created.push(dom);
    // 返回创建的新元素
    return dom;
  }

  return {
    // 获取创建新闻元素方法
    getDiv: function() {
      // 如果已创建的元素小于当前页元素总个数，则创建
      if (created.length < 5) {
        return create();
      } else {
        // 获取第一个元素并插入到最后面
        var div = created.shift();
        created.push(div);
        return div;
      }
    }
  };
})();


// 实现需求
var paper = 0;
var num = 5;
var article = ['这是第一条新闻','这是第二条新闻','这是第三条新闻','这是第四条新闻','这是第五条新闻','这是第六条新闻'];
var len = article.length;

// 添加五条新闻
for (var i = 0; i < 5; i++) {
  if (article[i]) {
    // 通过享元类获取创建的元素并写入新闻内容
    Flyweight.getDiv().innerHTML = article[i];
  }
}

// 下一页
document.getElementById('next').onclick = function() {
  // 如果新闻内容不足5条则返回
  if(article.length < 5) return;

  var n = ++paper * num % len;

  // 插入5条新闻
  for (var j = 0; j < 5; j++) {
    // 如果存在第n+j条则插入
    if (article[n + j]) {
      Flyweight.getDiv().innerHTML = article[n + j];
    } else if(article[n + j - len]) {
      // 否则插入起始位置第n + j - len 条
      Flyweight.getDiv().innerHTML = article[n + j - len];
    } else {
      // 如果都不存在则插入空字符串
      Flyweight.getDiv().innerHTML = '';
    }
  }
};