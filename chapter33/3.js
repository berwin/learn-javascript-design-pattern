'use strict';

var obj = {
  name: 'berwin'
};

function test() {
  console.log(this)
}

var a = test.bind(obj);

a(); // { name: 'berwin' }