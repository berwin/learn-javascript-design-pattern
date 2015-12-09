'use strict';

/*
 * 实现模块
 */
var ViewCommand = (function() {

  // 模板
  var tpl = {
    product: [
      '<div>',
        '<img src="{#src#}" />',
        '<p>{#text#}</p>',
      '</div>'
    ].join(''),

    title: [
      '<div class="title">',
        '<div class="main">',
          '<h2>{#title#}</h2>',
          '<p>{#tips#}</p>',
        '</div>',
      '</div>'
    ].join(''),
  };

  var html = '';

  // 替换数据
  function formatString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
      return obj[key];
    });
  }

  // 方法集合
  var Action = {
    create: function(data, view) {
      // 如果是数字则把数组中的每一项加进html中
      if (Object.prototype.toString.call(data) === '[object Array]') {
        for (var i = 0; i < data.length; i++) {
          html += formatString(tpl[view], data[i]);
        }
      } else {
        html += formatString(tpl[view], data);
      }
    },
    display: function(container, data, view) {
      // 如果有数据，根据数据创建视图
      if (data) this.create(data, view);

      document.getElementById(container).innerHTML  = html;
      html = '';
    }
  };

  return function excute(command) {
    command.param = Object.prototype.toString.call(command.param) === '[object Array]' ? command.param : [command.param];
    Action[command.cd].apply(Action, command.param);
  }
})();


/*
 * 测试
 */

// 产品展示数据
var productData = [{
  src: 'command/02.jpg',
  text: '绽放的桃花'
},{
  src: 'command/03.jpg',
  text: '阳光下的温馨'
},{
  src: 'command/04.jpg',
  text: '镜头前的绿色'
}];

// 模块标题数据
var titleData = {
  title: '夏日里的一片温馨',
  tips: '暖暖的温情带给人们家的感受'
};

ViewCommand({
  cd: 'display',
  param: ['title', titleData, 'title']
});

ViewCommand({
  cd: 'create',
  param: [{
    src: 'command/01.jpg',
    text: '迎着朝阳的野菊花'
  }, 'product']
});

ViewCommand({
  cd: 'display',
  param: ['product', productData, 'product']
});


/*
 * 测试HTML
 *
 * <div id="title"></div>
 * <div id="product"></div>
 */
