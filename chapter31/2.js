'use strict';

var A = A || {};

// 主体展示区容器
A.root = document.getElementById('container');

A.formateString = function(tpl, data) {
  return tpl.replace(/\{#(\w+)#\}/g, function(match, key) {
    return typeof data[key] === undefined ? '' : data[key];
  });
};

A.view = function(name) {
  if (Object.prototype.toString.call(name) === '[object Array]') {
    var tpl = '';

    for (var i = 0; i < name.length; i++) {
      tpl += A.view(name[i]);
    }

    return tpl;
  } else {
    return '<'+ name +'>{#'+ name +'#}</'+ name +'>';
  }
};

A.strategy = {
  listPart: function(data) {
    var s = document.createElement('div');
    var list = data.list;
    var ul = '';

    var tpl = A.view(['h2', 'p', 'ul']);
    
    var li = A.view('li');
    var liSon = A.view(['strong', 'span']);
    var liTpl = A.formateString(li, {li: liSon});

    data.id && (s.id = data.id);

    for (var i = 0; i < list.length; i++) {
      if (list[i].strong || list[i].span) {
        ul += A.formateString(liTpl, list[i]);
      }
    }

    data.ul = ul;

    s.innerHTML = A.formateString(tpl, data);

    A.root.appendChild(s);
  }
};


A.strategy.listPart({h2: 'berwin', p: 'adfsf', list: [{strong: 'strong', span: 'span'}, {strong: 'strong1', span: 'span1'}]})


// 测试html
// <div id="container"></div>