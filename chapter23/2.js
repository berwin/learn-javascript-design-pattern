'use strict';

// 中介者对象
var Mediator = (function() {
  // 消息对象
  var _msg = {};

  return {
    subscribe: function(type, action) {
      if (_msg[type]) {
        _msg[type].push(action);
      } else {
        _msg[type] = [];
        _msg[type].push(action);
      }
    },

    send: function(type) {
      if (_msg[type]) {
        for (var i = 0; i < _msg[type].length; i++) {
          _msg[type][i] && _msg[type][i]();
        }
      }
    }
  };
})();

/*
 * 显示隐藏导航小组件
 *
 * mod 模块
 * tag 标签
 * showOrHide 显示还是隐藏
 */
var showHideNavWidget = function(mod, tag, showOrHide) {
  var mod = document.getElementById(mod);
  var tag = mod.getElementsByTagName(tag);
  var showOrHide = (!showOrHide || showOrHide === 'hide') ? 'hidden' : 'visible';

  // 占位隐藏这些标签
  for (var i = 0; i < tag.length; i ++) {
    tag[i].style.visibility = showOrHide;
  }
};

/*
 * 用户手册导航模块
 */
(function() {
  // 订阅 隐藏用户收藏导航信息提醒消息
  Mediator.subscribe('hideAllNavNum', function() {
    showHideNavWidget('collection_nav', 'b', false);
  });

  // 订阅 显示用户收藏导航信息提醒消息
  Mediator.subscribe('showAllNavNum', function() {
    showHideNavWidget('collection_nav', 'b', true);
  });

  // 订阅 隐藏用户收藏导航网址消息
  Mediator.subscribe('hideAllNavUrl', function() {
    showHideNavWidget('collection_nav', 'span', false);
  });

  // 订阅 显示用户收藏导航网址消息
  Mediator.subscribe('showAllNavUrl', function() {
    showHideNavWidget('collection_nav', 'span', true);
  });
})();

/*
 * 推荐用户导航
 */
(function() {
  // 订阅 隐藏推荐用户导航消息提醒消息
  Mediator.subscribe('hideAllNavNum', function() {
    showHideNavWidget('recommend_nav', 'b', false);
  });

  // 订阅 显示推荐用户导航消息提醒消息
  Mediator.subscribe('showAllNavNum', function() {
    showHideNavWidget('recommend_nav', 'b', true);
  });
})();

/*
 * 最近常用导航
 */
(function() {
  // 订阅 隐藏最近常用导航网址消息
  Mediator.subscribe('hideAllNavUrl', function() {
    showHideNavWidget('recently_nav', 'span', 'hide');
  });

  // 订阅 显示最近常用导航网址消息
  Mediator.subscribe('showAllNavUrl', function() {
    showHideNavWidget('recently_nav', 'span', 'show');
  });
})();


/*
 * 设置层模块
 */
(function() {
  // 消息提醒选框
  var hideNum = document.getElementById('hide_num');
  var hideUrl = document.getElementById('hide_url');

  // 消息提醒选框事件
  hideNum.onchange = function() {
    if (hideNum.checked) {
      Mediator.send('hideAllNavNum');
    } else {
      Mediator.send('showAllNavNum');
    }
  };

  // 网址选框事件
  hideUrl.onchange = function() {
    if (hideUrl.checked) {
      Mediator.send('hideAllNavUrl');
    } else {
      Mediator.send('showAllNavUrl');
    }
  };
})();



/*
 * 测试html
 *

网址 <input type="checkbox" id="hide_num">
url <input type="checkbox" id="hide_url">

<div id="collection_nav">
    用户手册导航模块
    <b>b</b>
    <span>span</span>
</div>

<div id="recommend_nav">
    推荐用户导航
    <b>b</b>
</div>

<div id="recently_nav">
    最近常用导航
    <span>span</span>
</div>
*/