'use strict';

// 装饰者
var decorate = function(id, fn) {
  // 获取事件源
  var dom = document.getElementById(id);

  // 若事件源已绑定事件
  if (typeof dom.onclick === 'function') {

    // 缓存事件源原有事件
    var oldClickFn = dom.onclick;

    // 为事件源定义新的事件
    dom.onclick = function() {
      // 事件源原有回调函数
      oldClickFn();
      // 执行事件源新增回调函数
      fn();
    };

  } else {
    // 如果未绑定事件，直接为事件源添加事件
    dom.onclick = fn;
  }
};



// 电话输入框功能装饰
decorate('tel_input', function() {
  document.getElementById('tel_demo_text').style.display = 'none';
});




// 与适配器模式的区别：
// 适配器方法使对原有对象适配，添加的方法与原有方法功能上大致相似。但是装饰者提供的方法与原来的方法功能项是有一定区别的。
// 在装饰者模式中，不需要了解对象原有的功能，而且对象原有的方法照样可以原封不动的使用
// 在适配器中增加的方法要调用原有的方法，需要了解原有方法实现的具体细节，而在装饰者中原封不动的使用，不需要知道原有方法实现的具体细节。