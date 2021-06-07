let arr = [10, 20, 30]
let Func = function () { }
let f = new Func()
let obj = {}

console.log(Func instanceof Func, false);
console.log(Function instanceof Function, true);
console.log(Function.__proto__ === Function.prototype, true);
console.log(Object.__proto__.__proto__ === Object.prototype, true);