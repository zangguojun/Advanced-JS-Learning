### `call`的实现

> 基于`obj`对象访问`func`成员时，可以**让`func`中的`this`变为`obj`**
>
> 把`func`**临时绑定**到对象上，然后再执行`func`函数，但是要使函数名保持唯一
>
> 可以使用`Symbol`或者创建一个`时间戳`，最后**删除**掉这个对象属性

```js
Function.prototype.call = function (context, ...args) {
  context == undefined ? context = window : null;
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
```





### 两种值的创建方式

> **如果一个值的两种方法**：
>
> + **对于引用类型来讲**，两种方式没有区别
>
> + **对于值类型来讲**，字面量方法创建的是基本类型值，但是构造函数方式创建的是对象类型值
>   + `不管是基本类型还是对象类型都可以调用所属类的实例上以及原型上的方法`

```js
// 字面量创建
let obj1 = {}
let a1 = 1
console.log(obj1, a1);

// 构造函数创建
let obj2 = new Object()
let a2 = new Number(1)
console.log(obj2, a2);
```



### 改良`call`的`context`可以取基本数据类型（除了`Symbol`以及`bigint`基本值）

```js
Function.prototype.call = function (context, ...args) {
  context == undefined ? context = window : null;
  /^(object|function)$/.test(typeof context) ? null : context = new context.constructor(context)
  let key = Symbol('fn');
  context[key] = this;
  let result = context[key](...args);
  delete context[key];
  return result
}
function func(x, y) {
  console.log(this, x, y);
  return x + y
}
let res = func.call(1, 10, 20)
console.log(res);
```



### 改良`call`的`context`可以取`Symbol`以及`bigint`基本值

```js
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
function func(x, y) {
  console.log(this, x, y);
  return x + y
}
let res = func.call(Symbol('1'), 10, 20)
console.log(res);
```

