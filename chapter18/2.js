'use strict';

// 超级玛丽的例子

// 创建超级玛丽状态类
var MarryState = function() {
  var _currentState = {};

  // 动作与状态方法映射
  var states = {
    jump: function() {
      // 跳跃
      console.log('jump');
    },
    move: function() {
      // 移动
      console.log('move');
    },
    shoot: function() {
      // 射击
      console.log('shoot');
    },
    squat: function() {
      // 蹲下
      console.log('squat');
    }
  };

  // 动作控制类
  var Action = {
    changeState: function() {
      var arg = arguments;
      
      // 重置内部状态
      _currentState = {};

      if (arg.length) {
        for (var i = 0; i < arg.length; i++) {
          _currentState[arg[i]] = true;
        }
      }

      return this;
    },

    goes: function() {
      console.log('触发一次动作');

      for (var i in _currentState) {
        states[i] && states[i]();
      }

      return this;
    }
  };

  return {
    change: Action.changeState,
    goes: Action.goes
  };
};


// 两种执行方式，可以直接执行状态类，也可以实例化状态类
// 直接执行状态类：如果直接使用实例化类就只能自己使用，如果还有另一个人使用，就可能会修改状态类内部的状态
// 实例化状态类：实例化状态类有一个好处就是 它是对状态类的复制，无论怎么使用，都不会影响我，
var marry = new MarryState();

marry.change('jump', 'shoot').goes().goes().change('shoot').goes();
