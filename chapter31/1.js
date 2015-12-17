'use strict';

var A = A || {};

// 主体展示区容器
A.root = document.getElementById('container');

A.formateString = function(tpl, data) {
  return tpl.replace(/\{#(\w+)#\}/g, function(match, key) {
    return typeof data[key] === undefined ? '' : data[key];
  });
};

A.strategy = {
  listPart: function(data) {
    var s = document.createElement('div');
    var list = data.list;
    var ul = '';

    var tpl = [
      '<h2>{#h2#}</h2>',
      '<p>{#p#}</p>',
      '<ul>{#ul#}</ul>'
    ].join('');

    var liTpl = [
      '<li>',
      '<strong>{#strong#}</strong>',
      '<span>{#span#}</span>',
      '</li>'
    ].join('');

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