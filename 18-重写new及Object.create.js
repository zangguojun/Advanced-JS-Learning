/**
 * 创建某个类的空实例
 * @param {prototype} prototype 当前对象的原型链所指向prototype
 */
Object.prototype.create = function (prototype) {
  function Func() { }
  Func.prototype = prototype
  return new Func()
}
function Dog(name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('www');
}
Dog.prototype.sayName = function () {
  console.log(this.name);
}
/**
 * 创建类的实例
 * @param {class} Func 创建实例的类
 * @param  {...any} args 给Func传递的参数
 */
function _new(Func, ...args) {
  // 1、创建一个实例对象，并且 对象的__proto__指向 类.prototype  
  // #1 不兼容IE
  // let obj = {}
  // obj.__proto__ = Func.prototype
  // #2 不兼容低版本浏览器
  // 创建一个空对象，并且会把当前对象的原型链指向传递来的参数
  let obj = Object.create(Func.prototype)
  // 2、把类当作一个普通函数执行，并且执行时的this指向刚刚创建的实例对象
  let result = Func.call(obj, ...args)
  // 3、函数如果返回基本数据类型，则默认返回实例；如果返回引用类型，则返回这个引用类型
  return result !== null &&
    (typeof result === 'function' || typeof result === 'object')
    ? result
    : obj
}
let sanmao = _new(Dog, '三毛')
sanmao.bark() // www
sanmao.sayName() // 三毛
console.log(sanmao instanceof Dog, true);
