function a() {
  let x = 5
  function fn(x) {
    return function (y) {
      console.log(y + (++x));
    }
  }
  let f = fn(6)
  f(7)            // 14
  fn(8)(9)        // 18
  f(10)           // 18
  console.log(x); // 5
}

console.log('--------------------');

function b() {
  var i = 0
  var j = 5
  console.log(j + ++i, i);
  var i = 0
  var j = 5
  console.log(j + (++i), i);
  var i = 0
  var j = 5
  console.log(j + i++, i);
  var i = 0
  var j = 5
  console.log(j + (i++), i);
}

console.log('--------------------');

function c() {
  let a = 0, b = 0
  function A(a) {
    A = function (b) {
      console.log(a + b++);
    }
    console.log(a++);
  }
  A(1) // 1
  A(2) // 4
}

console.log('--------------------');

function d() {
  let aa = bb = 0
  let aaa = 0, bbb = 0
  console.log(aa, bb);
  console.log(aaa, bbb);
}

console.log('--------------------');

function e() {
  let obj = {
    name: 'buchiyu'
  }
  // alert(obj)        // { name: 'buchiyu' }
  console.log(obj)  // [object Object]
}