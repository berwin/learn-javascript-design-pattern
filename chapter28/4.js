'use strict';

// bad
$.get('/banner', function(result) {
  // banner...
});

$.get('/aside', function(result) {
  // aside...
});

$.get('/article', function(result) {
  // article...
});

$.get('/member', function(result) {
  // member...
});

$.get('/message', function(result) {
  // message...
});

// good
var Deal = {
  banner: function(result) {
    // banner...
  },
  aside: function(result) {
    // aside...
  },
  article: function(result) {
    // article...
  },
  member: function(result) {
    // member...
  },
  message: function(result) {
    // message...
  }
};

$.get('/deal', function(result) {
  for (var i in result) {
    Deal[i] && Deal[i](result[i]);
  }
});