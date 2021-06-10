function a() {
  var x = 3;
  var obj = {
    x: 5
  }
  obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
      this.x *= (++x) + y;
      console.log(x);
    }
  })();
  var fn = obj.fn;
  obj.fn(6);
  fn(4);
  console.log(obj.x, x);
}
// a()

console.log('--------------------');

function b() {
  let obj = {
    fn: (function () {
      return function () {
        console.log(this);
      }
    })()
  }
  obj.fn();
  let fn = obj.fn;
  fn()
}
// b()

console.log('--------------------');

function c() {
  var fullName = 'language';
  var obj = {
    fullName: 'javascript',
    prop: {
      getFullName: function () {
        return this.fullName
      }
    }
  };
  console.log(obj.prop.getFullName(), undefined);
  var test = obj.prop.getFullName;
  console.log(test(), 'language');
}
c()

console.log('--------------------');

function d() {
  var name = 'window'
  var Tom = {
    name: "Tom",
    show: function () {
      console.log(this.name, 'window');
    },
    wait: function () {
      var fun = this.show;
      fun()
    }
  }
  Tom.wait()
}
// d()

console.log('--------------------');

function e() {
  window.val = 1
  var json = {
    val: 10,
    dbl: function () {
      this.val *= 2
    }
  };
  json.dbl();
  var dbl = json.dbl;
  dbl();
  json.dbl.call(window)
  console.log(window.val + json.val, 24);
}
// e()

console.log('--------------------');

function f() {
  (function () {
    var val = 1;
    var json = {
      val: 10,
      dbl: function () {
        val *= 2
      }
    };
    json.dbl();
    console.log(json.val + val, 12);
  })();
}
// f()

console.log('--------------------');

function g() {
  ~ function () {
    // 实现change函数
    function change(context, ...args) {
      context == undefined ? context = window : null;
      const type = typeof context;
      if (!/^(function|object)$/.test(type)) {
        if (/^(bigint|symbol)$/.test(type)) {
          context = Object(context)
        } else {
          context = new context.constructor(context)
        }
      }
      let fn = Symbol('fn');
      context[fn] = this;
      let res = context[fn](...args)
      delete context[fn]
      return res
    }
    Function.prototype.change = change;
  }();
  let obj = {
    name: 'buchiyu'
  };
  function func(x, y) {
    this.total = x + y;
    return this;
  }
  let res = func.change(obj, 100, 200);
  // res => {name:'buchiyu', total: 300}
  console.log(res);
}
// g()

console.log('--------------------');

function h() {
  var name = 'buchiyu';
  function A(x, y) {
    var res = x + y;
    console.log(res, this.name);
  }
  function B(x, y) {
    var res = x - y;
    console.log(res, this.name);
  }
  B.call(A, 40, 30); // 10 'A'（a.name）
  B.call.call.call(A, 20, 10) // NaN undefined
  Function.prototype.call(A, 60, 50); //
  Function.prototype.call.call(A, 80, 70); // NaN undefined
}
h()

console.log('--------------------');

function i() {
  ~ function () {
    function bind(context, ...args1) {
      context == undefined ? context = window : null
      let _this = this
      return function (...args2) {
        _this.call(obj, ...args1, ...args2)
      }
    }
    Function.prototype.bind = bind;
  }();
  var obj = {
    name: "buchiyu"
  };
  function func() {
    console.log(this, arguments);
  }
  document.body.onclick = func.bind(obj, 100, 200)
  // obj [100, 200, MouseEvent()]
}
i()

/**
 * 请说出箭头函数和普通函数的区别
 * 1、普通函数有实参集合arguments，箭头函数没有arguments
 * 2、普通函数的this是点前面的对象，箭头函数没有this，所以不能通过bind等方式改变this
 * 3、普通函数都有构造函数，有prototype，箭头函数没有构造函数，没有prototype
 */
function j() {
  function func1(x, y) {
    return x + y
  }
  let func21 = (x, y) => {

  }
  let func22 = i => i + 1
}
j()
/**
 * 请说出面向对象的理解
 * 1、什么是对象？【重点突出对象、类、实例的关系，而且JS就是基于面向对象开发的（常见的内置类和对应的实例）】
 * 2、构造函数、原型、原型链
 * 3、面向对象在实战中的应用（内置类原型扩展方法、借用原型上的属性和方法、重写一些方法从而实现一些功能、基于面向对象编写的类库、插件、框架等）
 * 4、Vue/React中的面向对象
 * 5、继承、this、数据类型检测
 * 6、突出自己对源码的研究
 *
 */