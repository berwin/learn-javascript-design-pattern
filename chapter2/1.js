'use strict';

var Book = (function () {
  
  // 私有属性
  var bookNum = 0;

  // 私有方法
  function checkBook() {
    // ...
  }

  function _book(newID, newName, newPrice) {
    
    // 私有变量
    var name, price;

    // 静态私有方法
    function checkID(id) {}

    // 特权方法
    this.getName = function() {};
    this.getPrice = function() {};
    this.setName = function() {};
    this.setPrice = function() {};

    // 公有属性
    this.id = newID;

    // 公有方法
    this.copy = function() {};
    bookNum++;
    if(bookNum > 100) {
      throw new Error('我们仅出版100本书。');
    }

    // 构造器
    this.setName(name);
    this.setPrice(price);
  }

  _book.prototype = {
    // 静态公有属性
    isJSBook: false,
    
    // 静态公有方法
    display: function () {}
  };

  return _book;

})();