'use strict';

// bad
var ul = document.getElementById('container');
var li = ul.getElementsByTagName('li');

for (var i = 0; i < li.length; i++) {
  li[i].onclick = function() {
    this.style.backgroundColor = 'grey';
  };
}

// good
ul.onclick = function(e) {
  var event = e || event;
  var target = e.target || e.srcElement;

  if (target.nodeName.toLowerCase() === 'li') {
    target.style.backgroundColor = 'grey';
  }
};