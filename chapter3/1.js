'use strict';

// 篮球基类
var BasketBall = function() {
  this.intro = '篮球盛行于美国';
};

BasketBall.prototype = {
  getMember: function() {
    console.log('每个队伍需要5名队员');
  },

  getBallSize: function() {
    console.log('篮球很大');
  }
};

// 足球基类
var FootBall = function() {
  this.intro = '足球在世界范围内很流行';
};

FootBall.prototype = {
  getMember: function() {
    console.log('每个队伍需要11名队员');
  },

  getBallSize: function() {
    console.log('足球很大');
  }
};

// 网球基类
var Tennis = function() {
  this.intro = '每年有很多网球系列赛';
}

Tennis.prototype = {
  getMember: function() {
    console.log('每个队伍需要1名队员');
  },

  getBallSize: function() {
    console.log('网球很小');
  }
};

// 运动工厂
var SportsFactory = function(name) {
  switch(name) {
    case 'NBA':
      return new BasketBall();
    case 'wordCup':
      return new FootBall();
    case 'FrenchOpen':
      return new Tennis();
  }
};

// 为NBA杯创建一个篮球，只需要记住运动工厂 SportsFactory，调用并创建
var NBA = SportsFactory('NBA');
console.log(NBA);
