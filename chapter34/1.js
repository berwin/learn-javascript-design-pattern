'use strict';

var Waiter = function () {
  var dfd = [];
  var doneArr = [];
  var failArr = [];
  var slice = Array.prototype.slice;
  var self = this;

  var Primise = function () {
    // 监控对象是否解决成功状态
    this.resolved = false;
    // 监控对象是否解决失败状态
    this.rejected = false;
  };

  Primise.prototype = {
    resolve: function () {
      this.resolved = true;

      if (!dfd.length) return;

      for (var i = dfd.length - 1; i >= 0; i--) {
        // 如果有任意一个监控对象没有被解决或者解决失败则返回
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) return;
        // 清除监控对象
        dfd.splice(i, 1);
      };

      _exec(doneArr);
    },

    reject: function () {
      this.rejected = true;

      if (!dfd.length) return;

      dfd.splice(0);

      _exec(failArr);
    }
  };

  self.Deferred = function () {
    return new Primise();
  };

  function _exec(arr) {
    for (var i = 0; i < arr.length; i++) {
      try {
        arr[i] && arr[i]();
      } catch(e) {}
    }
  }

  /*
   * 监控异步方法
   * 
   * @param 监控对象
   */
  self.when = function () {
    dfd = slice.call(arguments);

    for (var i = dfd.length - 1; i >= 0; i--) {
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise) {
        dfd.splice(i, 1);
      }
    };

    return self;
  };

  // 添加成功回调函数的方法
  self.done = function () {
    doneArr = doneArr.concat(slice.call(arguments));
    return self;
  };

  // 添加失败回调函数的方法
  self.fail = function () {
    failArr = failArr.concat(slice.call(arguments));
    return self;
  };
};


// 测试
var waiter = new Waiter();

var first = (function() {
  var dtd = waiter.Deferred();

  setTimeout(function () {
    console.log('first finish');
    dtd.resolve();
  }, 5000);

  return dtd;
})();

var second = (function() {
  var dtd = waiter.Deferred();

  setTimeout(function () {
    console.log('second finish');
    dtd.resolve();
  }, 3000);

  return dtd;
})();

waiter.when(first, second).done(function () {
  console.log('success');
}, function () {
  console.log('success again');
}).fail(function () {
  console.log('fail');
});