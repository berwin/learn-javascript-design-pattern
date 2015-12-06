'use strict';

// 我的理解是，先创建基础类，然后针对基础类做扩展

// 背景：提示框

/*
 * 模板类
 * 基础提示框
 *
 * @param data 渲染数据
 */
var Alert = function(data) {
  if (!data) return;

  // 设置内容
  this.content = data.content;

  // 创建提示框面板
  this.panel = document.createElement('div');
  // 创建提示内容组件
  this.contentNode = document.createElement('p');
  // 创建确认按钮组件
  this.confirmBtn = document.createElement('span');
  // 创建关闭按钮组件
  this.closeBtn = document.createElement('b');

  // 为提示框面板添加class
  this.panel.className = 'alert';
  // 为确认按钮添加class
  this.confirmBtn.className = 'a-confirm';
  // 为关闭按钮添加class
  this.closeBtn.className = 'a-close';

  // 为确认按钮添加文案
  this.confirmBtn.innerHTML = data.confirm || '确认';
  // 为提示内容添加文本
  this.contentNode.innerHTML = data.content || '';

  // 点击确认按钮执行方法 如果 data 中有 success 方法则为 success 方法，否则为空函数
  this.success = data.success || function() {};
  // 点击关闭按钮执行方法
  this.fail = data.fail || function() {};
};

// 提示框原型方法
Alert.prototype = {

  // 创建方法
  init: function() {
    // 生成提示框
    this.panel.appendChild(this.closeBtn);
    this.panel.appendChild(this.confirmBtn);
    this.panel.appendChild(this.contentNode);

    // 插入页面中
    document.body.appendChild(this.panel);

    // 绑定事件
    this.bindEvent();

    // 显示提示框
    this.show();
  },

  // 绑定事件
  bindEvent: function() {
    var self = this;

    this.closeBtn.onclick = function() {
      // 执行取消方法
      self.fail();
      // 隐藏弹层
      self.hide();
    };

    this.confirmBtn.onclick = function() {
      // 执行确认方法
      self.success();

      // 隐藏弹层
      self.hide();
    };
  },

  // 隐藏弹窗方法
  hide: function() {
    this.panel.style.display = 'none';
  },

  // 显示弹层方法
  show: function() {
    this.panel.style.display = 'block';
  }
};





/* 
 * 右侧按钮提示框
 */
var RightAlert = function(data) {
  // 继承基本提示框构造函数
  Alert.call(this, data);

  // 为确认按钮添加 right class设置位置居右
  this.confirmBtn.className = this.confirmBtn.className + ' right';
};

// 继承基本提示框方法
RightAlert.prototype = new Alert();


/*
 * 标题提示框
 */
var TitleAlert = function(data) {
  // 继承基本提示框构造函数
  Alert.call(this, data);

  // 设置标题内容
  this.title = data.title;

  // 创建标题组件
  this.titleNode = document.createElement('h3');

  // 标题组件中写入标题内容
  this.titleNode.innerHTML = this.title;
};

// 继承原型
TitleAlert.prototype = new Alert();

// 对基本提示框创建方法扩展
TitleAlert.prototype.init = function() {
  // 插入标题
  this.panel.insertBefore(this.titleNode, this.panel.firstChild);

  // 继承基本提示框init方法
  Alert.prototype.init.call(this);
};

/***** 继承类也可作为模板类 *****/

/*
 * 带有取消按钮的弹出框
 */
var CancelAlert = function(data) {
  // 继承标题提示框构造函数
  TitleAlert.call(this, data);

  // 取消按钮文案
  this.cancel = data.cancel;

  // 创建取消按钮
  this.cancelBtn = document.createElement('span');

  // 添加class
  this.cancelBtn.className = 'cancel';

  // 设置内容
  this.cancelBtn.innerHTML = this.cancel || '取消';
};

// 继承标题提示框原型方法
CancelAlert.prototype = new Alert();

CancelAlert.prototype.init = function() {
  // 继承标题提示框创建方法
  TitleAlert.prototype.init.call(this);

  // 由于取消按钮要添加在末尾，所以在创建完其他组建后添加
  this.panel.appendChild(this.cancelBtn);
};

CancelAlert.prototype.bindEvent = function() {
  var self = this;

  TitleAlert.prototype.bindEvent.call(this);

  this.cancelBtn.onclick = function() {
    self.fail();
    self.hide();
  };
};



/*
 * 实例化提示框
 */
new CancelAlert({
  title: '标题提示',
  content: '提示内容',
  success: function() {
    console.log('ok');
  },
  fail: function() {
    console.log('cancel');
  }
}).init();
