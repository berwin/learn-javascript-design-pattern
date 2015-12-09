'use strict';

// 背景：项目经理准备改善页面中的输入验证与输入提示交互体验，如用户在输入框输入信息后，在输入框的下面提示出一些备选项，当用户输入完成后，则要对用户输入的信息进行验证等。


/*
 * 异步请求对象（伪代码）
 *
 * data 请求数据
 * dealType 相应数据处理对象
 * dom 事件源
 */
var sendData = function(data, dealType, dom) {

  // ... 这是一个ajax请求代码

  // 请求成功之后回调函数
  var result = ['嘿嘿嘿', '哈哈哈', '呵呵呵'];
  dealData(result, dealType, dom);
};


/*
 * 处理响应数据
 *
 * data 相应数据
 * dealType 相应数据处理对象
 * dom 事件源
 */
var dealData = function(data, dealType, dom) {
  var dataType = Object.prototype.toString.call(data);

  switch(dealType) {
    case 'sug':

      if (dataType === '[object Array]') {
        return createSug(data, dom);
      }

      if (dataType === '[object Object]') {
        var newData = [];
        for (var i in data) {
          newData.push(data[i]);
        }

        return createSug(newData, dom);
      }

      return createSug([data], dom);

      break;
    case 'validate':
      return createValidataResult(data, dom);
      break;
  }
};


/*
 * 创建提示框组件
 *
 * data 响应适配数据
 * dom 事件源
 */
var createSug = function(data, dom) {
  var html = '';

  for (var i = 0; i < data.length; i++) {
    html += '<li>' + data[i] + '</li>';
  }

  dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html;
};


/*
 * 创建校验组件
 *
 * data 响应适配数据
 * dom 事件源
 */
var createValidataResult = function(data, dom) {
  // 显示校验结果
  dom.parentNode.getElementsByTagName('span')[0].innerHTML = data;
};
