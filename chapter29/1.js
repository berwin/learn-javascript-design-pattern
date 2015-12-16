'use strict';

var BaseLocalStorage = function(preId, timeSign) {
  this.preId = preId;
  this.timeSign = timeSign || '|-|';
};

BaseLocalStorage.prototype = {

  // 操作状态
  status: {
    SUCCESS: 0,
    FAILURE: 1,
    OVERFLOW: 2,
    TIMEOUT: 3
  },

  // 保存本地存储链接
  storage: localStorage || window.localStorage,

  // 获取真实字段
  getKey: function(key) {
    return this.preId + key;
  },

  /*
   * 添加（修改）数据
   *
   * @param key 键
   * @param value 值
   * @param callback(status, key, value) 回调函数
   * @param time 过期时间
   */
  set: function(key, value, callback, time) {
    var status = this.status.SUCCESS;
    var key = this.getKey(key);

    try {
      time = new Date(time).getTime() || time.getTime();
    } catch(e) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }

    try {
      // 添加数据
      this.storage.setItem(key, time + this.timeSign + value);
    } catch(e) {
      // 溢出失败，返回溢出状态
      status = this.status.OVERFLOW;
    }

    // 有回调函数则执行回调函数并传入参数操作状态，真实数据字段标识以及存储数据值
    callback && callback.call(this, status, key, value);
  },

  /*
   * 获取数据
   *
   * @param key 键
   * @param callback(status, value) 回调函数
   * @return {status: status, value: value}
   */
  get: function(key, callback) {
    var status = this.status.SUCCESS;
    var key = this.getKey(key);
    var value = null;
    var timeSignLen = this.timeSign.length;
    var self = this;
    var result = null;

    try {
      value = self.storage.getItem(key);
    } catch (e) {
      // 不支持localstorage的浏览器
      result = {
        status: self.status.FAILURE,
        value: null
      };

      callback && callback.call(self, result.status, result.value);

      return result;
    }

    if (value) {
      // 获取时间戳与存储数据之间的拼接符起始位置
      var index = value.indexOf(self.timeSign);

      // 获取时间戳
      var time = +value.slice(0, index);

      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        value = value.slice(index + timeSignLen);
      } else {
        // 如果时间为过期
        value = null;
        status = self.status.FAILURE;
        self.remove(key);
      }
    } else {
      status = self.status.FAILURE;
    }

    result = {
      status: status,
      value: value
    };

    callback && callback.call(self, result.status, result.value);

    return result;
  },

  // 删除数据
  remove: function (key, callback) {
    var status = this.status.FAILURE;
    var key = this.getKey(key);
    var value = null;

    try {
      value = this.storage.getItem(key);
    } catch (e) {}

    if (value) {
      try {
        this.storage.removeItem(key);

        status = this.status.SUCCESS;
      } catch(e) {}
    }

    callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length));
  }
};


var db = new BaseLocalStorage('bw_');
db.set('test', 'hahaha', function(status, value) {
  console.log('set:', status, value);
});


db.get('test', function(status, value) {
  console.log('get:', status, value);
});

db.remove('test', function(status, value) {
  console.log('remove:', status, value);
});

db.remove('test', function(status, value) {
  console.log('remove', status, value);
});

db.get('test', function(status, value) {
  console.log('get:', status, value);
});