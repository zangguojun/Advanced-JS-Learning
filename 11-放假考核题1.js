function a() {
  console.log(a, b, c);// undefined undefined undefined
  var a = 12, b = 13, c = 14
  function fn(a) {
    console.log(a, b, c);// 10 13 14
    a = 100
    c = 200
    console.log(a, b, c);// 100 13 200
  }
  b = fn(10)
  console.log(a, b, c);// 12 undefined 200 
}
// a()

console.log('--------------------');

function b() {
  var i = 0
  function A() {
    var i = 10
    function x() {
      console.log(i);
    }
    return x
  }
  var y = A()
  y() // 10
  function B() {
    var i = 20
    y()//10
  }
  B()
}
// b()

console.log('--------------------');

function c() {
  var a = 1
  var obj = {
    'name': 'tom'
  }
  function fn() {
    var a2 = a
    obj2 = obj
    a2 = a
    obj2.name = 'jack'
  }
  fn()
  console.log(a, 1);
  console.log(obj, { name: 'jack' });
}
// c()

console.log('--------------------');

function d() {
  var a = 1
  function fn(a) {
    console.log(a, '[Function: a]');
    var a = 2
    function a() { }
  }
  fn(a)
}
// d()

console.log('--------------------');

function e() {
  var a = 1
  function fn(a) {
    a()
    console.log(a, '[Function: a]');
    var a = 2
    console.log(a, 2);
    function a() {
      console.log(a, '[Function: a]');
    }
    console.log(a, 2);
  }
  fn(a)
  console.log(a, 1);
}
// e()

console.log('--------------------');

function f() {
  console.log(a, undefined);
  var a = 12
  function fn() {
    console.log(a, undefined);
    var a = 13
  }
  fn()
  console.log(a, 13);
}
// f()

console.log('--------------------');

function g() {
  console.log(a, 'ReferenceError: a is not defined');
  a = 12
  function fn() {
    console.log(a);
    var a = 13
  }
  fn()
  console.log(a);
}
// g()

console.log('--------------------');

function h() {
  var foo = 'hello';
  (function (foo) {
    console.log(foo, 'hello');
    var foo = foo || 'world'
    console.log(foo, 'hello');
  })(foo)
  console.log(foo, 'hello');
}
// h()

console.log('--------------------');

function i() {
  console.log(0 || false && [] || 10 && true || 20);
}
// i()

console.log('--------------------');

function j() {
  function func0(x = 1) {
    console.log(x);
  }
  func0()
  function func1(x) {
    if (typeof z === 'undefined') x = 1
    console.log(x);
  }
  func1()
  function func2(x) {
    x = x || 1;
    /**
     * 这样也可以，只不过不如上面准确
     * 上面都是不传递赋值为默认值
     * 这样写是不传值或者传递的值是假，都会赋值为more在
     */
    console.log(x);
  }
  func2()
}
// j()

console.log('--------------------');

function k() {
  function hello() {
    console.log('hello');
  }
  function func1(callback) {
    if (typeof callback === 'function') callback()
  }
  func1(hello())
  function func2(callback) {
    callback && callback()
    /**
     * 依然不严谨，一般我们默认要不然不传，要传一定要传递函数
     */
  }
  func2(hello())
}
// k()

console.log('--------------------');

function l() {
  var b = 10;
  (function b() {
    b = 20;
    console.log(b);
  })();
  console.log(b);
}
// l()

console.log('--------------------');

function m() {
  (function AAA() {
    console.log(AAA, '[Function: AAA]');
    console.log(arguments.callee, '[Function: AAA]');
    console.log(arguments.callee.caller, '[Function: m]');
    A = 1000
    console.log(AAA, '[Function: AAA]');
  })();
  console.log(AAA);
}
// m()

console.log('--------------------');

function n1() {
  (function AAA() {
    let AAA = 1000;
    console.log(AAA);
  })();
}
n1()

console.log('--------------------');

function n2() {
  (function AAA() {
    var AAA = 1000
    console.log(AAA);
  })();
}
n2()

console.log('--------------------');

function n3() {
  (function AAA() {
    function AAA() {
      console.log('AAA');
    }
    console.log(AAA);
    AAA = 1000
    console.log(AAA);
  })();
}
// n3()

console.log('--------------------');

function o() {
  (function AAA() {
    console.log(AAA);// ReferenceError: Cannot access 'AAA' before initialization
    let AAA = 1000;
    console.log(AAA);
  })();
}
// o()

console.log('--------------------');

function p() {
  console.log('Error');
  // let a = 'a'
  let a = 'b'
}
// p()