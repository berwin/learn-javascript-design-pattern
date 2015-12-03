'use strict';

// 多维变量类
// 运动单元
function Speed(x, y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function() {
  console.log('跑起来');
};

// 着色单元
function Color(cl) {
  this.color = cl;
}
Color.prototype.draw = function() {
  console.log('绘制色彩');
};


function Ball(x, y, c) {
  // 实现运动单元
  this.speed = new Speed(x, y);
  // 实现着色单元
  this.color = new Color(c);
};
Ball.prototype.init = function() {
  // 实现运动
  this.speed.run();
  // 实现着色
  this.color.draw();
};

var a = new Ball(1,2,'red');
a.init();