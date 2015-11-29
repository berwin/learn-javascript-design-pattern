'use strict';

var VehicleFactory = function(subClass, superType) {

  // 判断抽象工厂中是否有该抽象类
  if (typeof VehicleFactory[superType] === 'function') {

    // 缓存类
    function F() {}

    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]();

    // 将子类constructor指向子类
    F.constructor = subClass;

    // 子类原型继承”父类“
    subClass.prototype = new F();
  } else {
    throw new Error('未创建该抽象类');
  }
};

// 小汽车抽象类
VehicleFactory.Car = function() {
  this.type = 'car';
};

VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用');
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用');
  }
};

// 公交车抽象类
VehicleFactory.Bus = function() {
  this.type = 'bus';
};

VehicleFactory.Bus.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用');
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用');
  }
};

// 货车抽象类
VehicleFactory.Truck = function() {
  this.type = 'truck';
};

VehicleFactory.Truck.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用');
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用');
  }
};

// 宝马汽车子类
var BMW = function(price, speed) {
  this.price = price;
  this.speed = speed;
};

VehicleFactory(BMW, 'Car');

BMW.prototype.getPrice = function() {
  return this.price;
};
BMW.prototype.getSpeed = function() {
  return this.speed;
};

var a = new BMW(100, 2);

console.log(a.getPrice());
console.log(a.type);