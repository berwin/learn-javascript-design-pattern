'use strict';

/**
 * 基于已经存在的模板对象克隆出新对象的模式
 *
 * 参数1，参数2，参数3...表示模板对象
 * 注意。这里对模板引用类型的属性实质上进行了浅复制（引用类型属性共享），可以根据需求自行深复制（引用类型属性复制）
 */
function prototypeExtend() {
  // 缓存类
  var F = function() {};

  for (var i = 0; i < arguments.length; i++) {
    // 遍历每个末班对象中的属性
    for (var j in arguments[i]) {
      // 将属性复制到缓存类原型中
      F.prototype[j] = arguments[i][j];
    }
  }

  // 返回缓存类的一个实例
  return new F();
}

var penguin = prototypeExtend({
  speed: 20,
  swim: function() {
    console.log('游泳速度'+ this.speed);
  }
},{
  run: function(speed) {
    console.log('奔跑速度'+ speed)
  }
}, {
  jump: function() {
    console.log('跳跃动作');
  }
});

penguin.swim();
penguin.run(10);
penguin.jump();

console.log(penguin.__proto__);