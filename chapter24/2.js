'use strict';

var Cache = (function () {
  var _cache = {};

  return {
    /*
     * 设置缓存
     *
     * key 键
     * data 缓存数据
     * cover 是否覆盖（默认不覆盖）
     */
    set: function(key, data, cover) {
      if (!_cache[key] || cover) {
        _cache[key] = data;
      }
    },

    /*
     * 获取缓存
     */
    get: function(key) {
      return _cache[key];
    },

    /*
     * 清除缓存
     */
    del: function(key) {
      delete _cache[key];
    }
  }
})();


Cache.set('test', {name: 'berwin'});
console.log(Cache.get('test'));

Cache.del('test');
console.log(Cache.get('test'));