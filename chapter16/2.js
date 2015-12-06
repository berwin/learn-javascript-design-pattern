'use strict';

function formateString(str, data) {
  return str.replace(/\{#(\w+)#\}/g, function(match, key) {
    return typeof data[key] === undefined ? '' : data[key];
  });
}

/*
 * 基础导航
 */
var Nav = function(data) {
  // 基础导航样式模板
  var item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';

  // 创建字符串
  var html = '';

  // 格式化数据
  for (var i = 0; i < data.length; i++) {
    html += formateString(item, data[i]);
  }

  return html;
};


/*
 * 带有消息提醒信息导航
 */
var NumNav = function(data) {
  var tpl = '<b>{#num#}</b>';

  for (var i = 0; i < data.length; i++) {
    data[i].name += formateString(tpl, data[i]);
  }

  // 继承继承类，并返回字符串
  return Nav.call(this, data);
};


/*
 * 带有链接地址的导航
 */
var LinkNav = function(data) {
  var tpl = '<span>{#link#}</span>';

  for (var i = 0; i < data.length; i++) {
    data[i].name += formateString(tpl, data[i]);
  }

  return Nav.all(this, data);
};


// 获取导航容器
var nav = document.getElementById('content');

// 添加内容
nav.innerHTML = NumNav([{
  href: 'http://hao.360.cn',
  title: '360导航',
  name: '360',
  num: '10'
},{
  href: 'http://www.taobao.com',
  title: '淘宝商城',
  name: '淘宝',
  num: '2'
},{
  href: 'http://www.qq.com',
  title: '腾讯首页',
  name: '腾讯',
  num: '3'
}]);
