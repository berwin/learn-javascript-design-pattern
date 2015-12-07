'use strict';

/*
 * 观察者模式
 *
 * 将观察者放在闭包中，当页面加载就立即执行
 */
var Observer = (function() {
  // 防止消息队列暴漏而被篡改，故将消息容器作为静态私有变量保存。
  var __message = {};

  return {
    // 注册信息接口（订阅）
    subscribe: function(type, fn) {
      // 如果消息不存在则创建一个消息类型
      if (!__message[type]) {
        __message[type] = [fn];
      } else {
        // 将动作方法推送到消息对应的动作执行序列中
        __message[type].push(fn);
      }
    },

    // 发布消息接口（取消订阅）
    unsubscribe: function(type, fn) {
      if (!__message[type] || Object.prototype.toString.call(__message[type]) !== '[object Array]') return;

      for (var i = __message[type].length - 1; i >= 0; i--) {
        __message[type][i] === fn && __message[type].splice(i, 1);
      };
    },

    // 移除信息接口（移除信息接口）
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


// 学生类
var Student = function(result) {
  var self = this;

  // 学生回答结果
  self.result = result;

  // 学生回答问题动作
  self.say = function() {
    console.log(self.result);
  };
};

// 回答问题方法
Student.prototype.answer = function(question) {
  // 注册参数问题
  Observer.subscribe(question, this.say);
};

Student.prototype.sleep = function(question) {
  Observer.unsubscribe(question, this.say);
};


// 教师类
var Teacher = function() {};
Teacher.prototype.ask = function(question) {
  console.log('问题是：' + question);
  // 发布提问消息
  Observer.publish(question);
};


// 模拟听课的学生
var student1 = new Student('学生1回答问题');
var student2 = new Student('学生2回答问题');
var student3 = new Student('学生3回答问题');

// 注册一下哪位学生回答什么问题
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');

// 后来第三位同学睡着了。。
student3.sleep('简述观察者模式');


var teacher = new Teacher();

// 提问
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');

// 最后，两个问题，第一个问题三名同学回答，第二个问题只有第一名同学回答。。。



































