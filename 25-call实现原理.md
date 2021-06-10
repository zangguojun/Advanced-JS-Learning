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

### 连续执行`call`方法的分析路线

```js
function fn1() { console.log(1); }
function fn2() { console.log(2); }
fn1.call(fn2);// 1
fn1.call.call(fn2);
Function.prototype.call(fn1);
Function.prototype.call.call(fn1);
```

> **首先分析`fn1.call(fn2)`**，在`fn1`中找到`call`方法，将`fn2`当作参数传递给`call`方法并执行。
>
> - 此时在`call`方法中的`this`是`fn1`（也就**是`call`方法前面的函数**）
> - 此时在`call`方法中的`context`是`fn2`（也就**是`call`方法的第一个参数，是一个对象**）
> - 此时在`call`方法中将`this`绑定到`context`上，当作`context`的属性，形如**`context[key] = this`**（也是就**给`fn2`上加入一个属性，属性值为`fn1`**）
> - 此时在`call`方法中执行`context[key]()`（也就是**执行`fn1`并且此时`fn1`中的`this`是`fn2`**）
> - **最后结果：执行`fn1`且其中`this`为`fn2`**

> **分析`fn1.call.call(fn2)`**，在`fn1`中找到`call`方法，也就是`Function.prototype`上的`call`方法，`call`方法再调用`call`方法，由于`call`是一个函数，所以也能沿着原型链，拿到`Function.prototype`上的`call`方法，所以可以理解为**普通函数通过原型链拿到了`Function.prototype`的`call`方法**
>
> - 此时在`call`方法中的`this`是`fn1.call = call`（也就**是*最后一个*`call`方法前面的函数**）
> - 此时在`call`方法中的`context`是`fn2`（也就**是*最后一个*`call`方法的第一个参数，是一个对象**）
> - 此时在`call`方法中将`this`绑定到`context`上，当作`context`的属性，形如**`context[key] = this`**（也是就**给`fn2`上加入一个属性，属性值为`call`**）
> - 此时在`call`方法中执行`context[key]()`（也就是**执行`call`并且此时`call`中的`this`是`fn2`**。）
> - 然后第二个`call`执行，并且`无参数执行`
> - 此时第二个`call`方法中的`this`是`fn2`（第一个`call`方法执行之后的作用）
> - 此时第二个`call`方法中的`context`是`window`或者`undefined`【严格模式下】（因为`call`方法是`无参数执行`）
> - 此时在`call`方法中将`this`绑定到`context`上，（也就是**给`window`上加入一个属性，属性值为`fn2`**）
> - 此时在`call`方法中执行`context[key]()`（也就是**执行`fn2`并且此时`fn2`中的`this`是`window`**。）
> - **最后结果：执行`fn2`且其中`this`为`window`**

> **分析`Function.prototype.call(fn1)`**，拿到`Function.prototype`中的`call`方法，将`fn1`当作参数传递给`call`方法并执行。
>
> - 此时在`call`方法中的`this`是`Function.prototype == 匿名空函数`
> - 此时在`call`方法中的`context`是`fn1`，
> - 此时在`call`方法中将`this`绑定到`context`上，也就是`fn1[key] = 匿名空函数`
> - 此时在`call`方法中执行`context[key]()`（也就是**执行`匿名空函数`并且此时`匿名空函数`中的`this`是`fn1`，匿名空函数执行没有任何作用**）
> - **最后结果：执行`匿名空函数`且其中`this`为`fn1`**

> **分析`Function.prototype.call.call(fn1)`**
>
> **第一次执行`call`：**
>
> `this => 【call】`
>
> `context => fn1`
>
> `context[key] = this => fn1[key] = 【call】`
>
> `context[key]() => 【call】() 且 this 为 context = fn1`
>
> **第二次执行`call`：**
>
> `this => fn1`
>
> `context => window`
>
> `context[key] = this => window[key] = fn1`
>
> `context[key]() => fn1() 且 this 为 context = window`
>
> **最后结果：执行`fn1`且其中`this`为`window`**

