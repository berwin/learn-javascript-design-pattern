'use strict';

// 中介者对象
var Mediator = (function() {
  // 消息对象
  var _msg = {};

  return {
    subscribe: function(type, action) {
      if (_msg[type]) {
        _msg[type].push(action);
      } else {
        _msg[type] = [];
        _msg[type].push(action);
      }
    },

    send: function(type) {
      if (_msg[type]) {
        for (var i = 0; i < _msg[type].length; i++) {
          _msg[type][i] && _msg[type][i]();
        }
      }
    }
  };
})();

// 单元测试

// 订阅
Mediator.subscribe('demo', function() {
  console.log('first');
});

Mediator.subscribe('demo', function() {
  console.log('second');
});

Mediator.send('demo');