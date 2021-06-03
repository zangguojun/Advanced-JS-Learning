function a() {
  let arr = [10.18, 0, 10, 25, 23]
  arr = arr.map(parseInt)
  console.log(arr);
  // 10.18 0 10
  // 0     1 NaN
  // 10    2 2
  // 25    3 2
  // 23    4 11
}

console.log('--------------------');

function b() {
  var a = 10, b = 11, c = 12
  function test(a) {
    a = 1     // => EC(a)私有
    var b = 2 // => EC(a)私有
    c = 3     // => EC(G)拥有
  }
  test(10)
  console.log(a, b, c);
  // 10 11 3  
}

console.log('--------------------');

function c() {
  var a = 4
  function b(x, y, a) {
    console.log(a, 3);
    arguments[2] = 10
    console.log(a, 10);
  }
  a = b(1, 2, 3)
  console.log(a, undefined);
}

function d() {
  var a = 4
  function b(x, y, a) {
    'use strict'
    console.log(a, 3);
    arguments[2] = 10
    console.log(a, 3);
  }
  a = b(1, 2, 3)
  console.log(a, undefined);
}

console.log('--------------------');

function e() {
  function funcA(x, y, z) {
    x = 100
    console.log(arguments[0], 100);

    arguments[1] = 200
    console.log(y, 200);

    z = 300
    console.log(arguments[2], undefined);
  }
  funcA(10, 20)
}

console.log('--------------------');

function f() {
  function funcB(x, y, z) {
    x = 100
    console.log(arguments[0], 100);

    arguments[1] = 200
    console.log(y, 200);

    arguments[2] = 300
    console.log(z, undefined);
  }
  funcB(10, 20)
}

console.log('--------------------');

function g() {
  {
    function foo() { }
    foo = 1
  }
  console.log(foo);
}

console.log('--------------------');

function h() {
  {
    function foo() { }
    foo = 1
    function foo() { }
  }
  console.log(foo);
}

console.log('--------------------');

function i() {
  console.log(foo, undefined);
  {
    function foo() { }
    foo = 1
    function foo() { }
    foo = 2
  }
  console.log(foo, 1);
}

console.log('--------------------');

function j() {
  // 'use strict'
  {
    function foo() { }
    foo = 1
    function foo() { }
  }
  console.log(foo, 1);
}

console.log('--------------------');

function k() {
  var a = 9
  function fn() {
    a = 0
    return function (b) {
      return b + a++
    }
  }
  var f = fn()
  console.log(f(5), 5);
  console.log(fn()(5), 5);
  console.log(f(5), 6);
  console.log(a, 2);
}

console.log('--------------------');

function l() {
  var test = (function (i) {
    return function () {
      console.log(i *= 2, 4);
    }
  })(2)
  test(5)
}

console.log('--------------------');

function m() {
  var x = 5, y = 6
  function func() {
    x += y
    func = function (y) {
      console.log(y + --x, 13);
    }
    console.log(x, y); // 11 6
  }
  func(4)
  func(3)
  console.log(x, y); // 10 6
}

console.log('--------------------');

function n() {
  function fun(n, o) {
    console.log(o);
    return {
      fun: function (m) {
        return fun(m, n)
      }
    }
  }
  var c = fun(0).fun(1)
  // undefined 0 {fun: function(m){return fun(m, n)}}
  // ---- o: 1 n:1
  c.fun(2)
  // 1 {fun: function(m){return fun(m, n)}}
  c.fun(3)
  // 1 {fun: function(m){return fun(m, n)}}
}
n()