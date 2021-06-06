## 柯里化

> **预先存储/处理**

之前总结过了----

## **compose**函数

> `const add1 = (x) => x + 1`
>
> `const div2 = (x) => x / 2`
>
> `const mul3 = (x) => x * 3`
>
> `div2(mul3(add1(2)))` ==> `compose(div2, mul3, add1)(2)`

```js
const add1 = (x) => x + 1
const div2 = (x) => x / 2
const mul3 = (x) => x * 3

function compose(...funcs) {
  return (val) => funcs.reduceRight((pre, item) => item(pre), val)
}
console.log(compose(mul3, div2, add1)(1));
console.log(compose()(1));
```

#### Redux源码中的`compose`函数

```js
function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
console.log(compose()(1));
console.log(compose(add1)(2));
console.log(compose(mul3, div2, add1)(1));
```

> 这里的`funcs.reduce((a, b) => (...args) => a(b(...args)))`运用了`funcs.reduce`将`funcs`遍历，并且利用reduce的箭头函数又返回一个函数，并且该函数利用`a(b(...args))`倒置了函数执行顺序！！！6666！！！但是还是自己写的容易理解。