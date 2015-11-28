'use strict';

function createBook(name, time, type) {
  var o = {
    name: name,
    time: time,
    type: type,
    getName: function() {
      return this.name;
    }
  };

  return o;
}

var book1 = createBook('javascript', '2015', 'js');
var book2 = createBook('Nodejs', '2015', 'Nodejs');

console.log(book2);