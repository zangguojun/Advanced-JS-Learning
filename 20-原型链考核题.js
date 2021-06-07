function a() {
  function C1(name) {
    if (name) {
      this.name = name
    }
  }
  function C2(name) {
    this.name = name
  }
  function C3(name) {
    this.name = name || 'Jack'
  }
  C1.prototype.name = 'Tom'
  C2.prototype.name = 'Tom'
  C3.prototype.name = 'Tom'
  console.log((new C1()).name + (new C2()).name + (new C3()).name);
}
// a()

console.log('--------------------');

function b() {
  function Fn() {
    let a = 1;
    this.a = a;
  }
  Fn.prototype.say = function say() {
    this.a = 2;
  }
  Fn.prototype = new Fn;
  let f1 = new Fn;
  Fn.prototype.b = function b() {
    this.a = 3
  }
  console.log(f1.a, 1);
  console.log(f1.prototype, undefined);
  console.log(f1.b, '[Function: b]');
  console.log(f1.say, '[Function: say]');
  console.log(f1.hasOwnProperty('b'), false);
  console.log('b' in f1, true);
  console.log(f1.constructor == Fn, true);
}
// b()

console.log('--------------------');

function c() {
  function Fn(n, m) {
    n = n || 0;
    m = m || 0;
    this.x = n;
    this.y = m;
    this.getX = function () {
      console.log(this.x);
    }
    return n + m;
  }
  Fn.prototype.sum = function () {
    console.log(this.x + this.y);
  }
  Fn.prototype = {
    getX() {
      this.x += 1;
      console.log(this.x);
    },
    getY() {
      this.y -= 1;
      console.log(this.y);
    }
  }
  let f1 = new Fn(10, 20);
  let f2 = new Fn;
  console.log(f1.getX === f2.getX, false);
  console.log(f1.getY === f2.getY, true);
  console.log(f1.__proto__.getY === Fn.prototype.getY, true);
  console.log(Fn.prototype.getX === f2.getX, false);
  console.log(f1.constructor, '[Object]');
  f1.getX();// 10
  Fn.prototype.getX();// NaN
  f2.getY();// -1
  Fn.prototype.getY();// NaN
  // f1.sum();// TypeError: f1.sum is not a function
}
c()

function d() {
  function Fn(n, m) {
    n = n || 0;
    m = m || 0;
    this.x = n;
    this.y = m;
    this.getX = function () {
      console.log(this.x);
    }
    return n + m;
  }
  Fn.prototype.sum = function () {
    console.log(this.x + this.y);
  }
  let obj = {
    getX() {
      this.x += 1;
      console.log(this.x);
    },
    getY() {
      this.y -= 1;
      console.log(this.y);
    }
  }
  obj = Object.assign(Fn.prototype, obj)
  Fn.prototype = obj
  console.log(obj, `{
    sum: [Function (anonymous)],
    getX: [Function: getX],
    getY: [Function: getY]
  }`);
}
// d()