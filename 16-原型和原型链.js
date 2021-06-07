function a() {
  function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
      console.log(this.x);
    }
  }
  let f1 = new Fn()
  console.log(f1);
}
// a()

console.log('--------------------');

function b() {
  function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
      console.log(this.x);
    }
  }
  Fn.prototype.getX = function () {
    console.log(this.x);
  }
  Fn.prototype.getY = function () {
    console.log(this.y);
  }
  let f1 = new Fn()
  let f2 = new Fn()
  console.log(f1.getX === f2.getX, false);
  console.log(f1.getY === f2.getY, true);
  console.log(f1.__proto__.getY === Fn.prototype.getY, true);
  console.log(f1.__proto__.getX === f2.getX, false);
  console.log(f1.getX === Fn.prototype.getX, false);
  console.log(f1.constructor, Fn);
  console.log(Fn.prototype.__proto__.constructor, Object);
  f1.getX() // 100
  f1.__proto__.getX()// undefined
  f2
}
// b()

console.log('--------------------');

function c() {
  function Fn(x) {
    this.x = x
  }
  let f1 = new Fn(1);
  let f2 = new Fn;
  console.log(f1);
  console.log(f2);
}
c()

console.log('--------------------');

function Fn() {
  this.a = 0;
  this.b = function () {
    console.log(this.a);
  }
}
Fn.prototype = {
  b: function () {
    this.a = 20
    console.log(this.a);
  },
  c: function () {
    this.a = 30
    console.log(this.a);
  }
}
Fn.prototype.constructor = Fn
var my_fun = new Fn();
my_fun.b()
my_fun.c()