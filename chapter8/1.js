'use strict';

var A = {
  Util: {
    util_method1: function() {},
    util_method2: function() {}
  },
  Tool: {
    tool_method1: function() {},
    tool_method2: function() {}
  },
  Ajax: {
    get: function() {},
    post: function() {}
  },
  others: {
    // ...
  }
};

A.Util.util_method2();
A.Tool.tool_method1();
A.Ajax.get();