Function.prototype.call = function (context, ...args) {
  context == undefined ? context = window : null;
  if (!/^(object|function)$/.test(typeof context)) {
    if (/^(symbol|bigint)$/.test(typeof context)) context = Object(context)
    else context = new context.constructor(context)
  }
  let key = Symbol('fn');
  context[key] = this;
  let result = context[key](...args);
  delete context[key];
  return result
}
let obj = {
  name: "obj"
}
function func(x, y) {
  console.log(this, x, y);
  return x + y
}
let res = func.call(obj, 10, 20)
console.log(res);

res = func.call(1, 10, 20)
console.log(res);

res = func.call(Symbol('1'), 10, 20)
console.log(res);


console.log('--------------------');


// 字面量创建
let obj1 = {}
let a1 = 1
console.log(obj1, a1);

// 构造函数创建
let obj2 = new Object()
let a2 = new Number(1)
console.log(obj2, a2);

// 字面量 =》 构造函数创建
let a3 = new a1.constructor(a1)
console.log(a3);
let obj3 = new obj1.constructor()
console.log(obj3);

console.log('--------------------');

function fn1() { console.log(1); }
function fn2() { console.log(2); }
fn1.call(fn2);
fn1.call.call(fn2);
Function.prototype.call(fn1);
Function.prototype.call.call(fn1);