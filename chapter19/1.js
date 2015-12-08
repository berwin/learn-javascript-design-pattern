'use strict';

// 背景：过节商品打折，一部分商品5折出售，一部分8折出售，一部分商品9折出售，等到元旦，我们要搞一个幸运反馈活动，普通用户满100返30，高级VIP用户满100返50... 

// 价格策略对象
var PriceStrategy = (function() {
  // 内部算法对象
  var stragtegy = {

    // 100返30
    return30: function(price) {
      return +price + parseInt(price / 100) * 30;
    },

    // 满100返50
    return50: function(price) {
      return +price + parseInt(price / 100) * 50;
    },

    // 九折
    percent90: function(price) {
      return 90 / 100 * +price;
    },

    // 八折
    percent80: function(price) {
      return 80 / 100 * +price;
    },

    // 五折
    percent50: function(price) {
      return 50 / 100 * +price;
    }
  };

  // 策略算法调用接口
  return function(algorithm, price) {
    // 如果算法存在，则调用算法，否则返回false
    return stragtegy[algorithm] && stragtegy[algorithm](price);
  }
})();

var price = PriceStrategy('return50', '314.67');
console.log(price); // 464.67