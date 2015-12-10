'use strict';

// 背景：评论+消息通知

/*
 * 观察者模式
 *
 * 将观察者放在闭包中，当页面加载就立即执行
 */
var Observer = (function() {
  // 防止消息队列暴漏而被篡改，故将消息容器作为静态私有变量保存。
  var __message = {};

  return {
    // 订阅
    subscribe: function(type, fn) {
      // 如果消息不存在则创建一个消息类型
      if (!__message[type]) {
        __message[type] = [fn];
      } else {
        // 将动作方法推送到消息对应的动作执行序列中
        __message[type].push(fn);
      }
    },

    // 取消订阅
    unsubscribe: function(type, fn) {
      if (!__message[type] || Object.prototype.toString.call(__message[type]) !== '[object Array]') return;

      for (var i = __message[type].length - 1; i >= 0; i--) {
        __message[type][i] === fn && __message[type].splice(i, 1);
      };
    },

    // 发布信息
    publish: function(type, args) {
      if (!__message[type]) return;

      // 定义消息信息
      var events = {
        type: type,
        args: args
      };

      // 执行注册的消息所对应的所有动作序列
      for (var i = 0; i < __message[type].length; i++) {
        __message[type][i].call(this, events);
      }
    }
  }
})();


/*
 * 拉出来溜溜
 */

// 订阅
Observer.subscribe('test', function(e) {
  console.log(e);
});

// 发布
Observer.publish('test', {msg: '传递参数'});