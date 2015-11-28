'use strict';
var Factory = function(type, text) {
  if (this instanceof Factory) {
    this[type](text);
  } else {
    return new Factory(type, text);
  }
};

Factory.prototype = {
  javascript: function(text) {
    console.log(text + 'javascript');
  },
  nodejs: function(text) {
    console.log(text + 'nodejs');
  }
};

Factory('javascript', '万能的');

// 好处是增加基类时，不需要在修改 Factory 了