function currying(fn, ...args1) {
  return (...args2) => {
    const args = [...args1, ...args2]
    if (args.length === fn.length) {
      return fn(...args)
    } else {
      return currying(fn, ...args)
    }
  }
}
function add(a, b, c, d, e, f) {
  return a + b + c + d + e + f
}
const newAdd = currying(add, 0)
const result = newAdd(1)(2)(3)(4, 5)
console.log(result);

console.log('--------------------');

const add1 = (x) => x + 1
const div2 = (x) => x / 2
const mul3 = (x) => x * 3

function b() {
  function compose(...funcs) {
    return (val) => funcs.reduceRight((pre, item) => item(pre), val)
  }
  console.log(compose()(1));
  console.log(compose(add1)(2));
  console.log(compose(mul3, div2, add1)(1));
}
b()

console.log('--------------------');

function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
console.log(compose()(1));
console.log(compose(add1)(2));
console.log(compose(mul3, div2, add1)(1));