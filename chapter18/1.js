'use strict';

// 这是一个反面教材

// 以超级玛丽为例子

var lastAction = '';

function changeMarry(action) {
  if (action == 'jump') {
    // 跳跃的动作
  } else if (action == 'move') {
    // 移动动作
  } else {
    // 默认情况
  }

  lastAction = action;
}

// 符合动作对条件判断的开销是翻倍的

var lastAction1 = '';
var lastAction2 = '';

function changeMarry2(action1, action2) {
  if (action1 === 'shoot') {
    // 射击动作
  } else if (action1 === 'move' && action2 === 'shoot') {
    // 移动中射击
  } else if (action1 === 'jump' && action2 === 'shoot') {
    // 跳跃中射击
  }

  // 保留上一个动作
  lastAction1 = action1 || '';
  lastAction2 = action2 || '';
}