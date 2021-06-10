#### 1

```js
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
a()
```

> **EC(G)**
>
> > 变量提升：
> >
> > `var x, obj, fn` 也会映射到`window`上一份，即`window.x, window.obj, window.fn`
> >
> > 代码执行：
> >
> > `x = 3`
> >
> > `obj -- AAAFFF000`
> >
> > 因为`obj.fn`是一个自执行函数，所以先执行自执行函数，执行结果是一个**闭包**
> >
> > *EC(AN)*
> >
> > > 初始化作用域链：`<EC(AN), EC(G)>`
> > >
> > > 初始化`this`：`window`
> > >
> > > 初始化`arguments`
> > >
> > > 形参赋值：---
> > >
> > > 变量提升：---
> > >
> > > 代码执行：
> > >
> > > `this.x *= ++x ==> this.x = this.x * (++x) = 3 * 4`即`window.x = 12`
> > >
> > > `return function`
> > >
> > > 返回当前堆`AAAFFF111`，因为堆被暂用，所以不能出栈
> >
> > `obj.fn -- AAAFFF111`
> >
> > `fn -- AAAFFF111`
> >
> > 执行`obj.fn(6)`
> >
> > `ECFN1`
> >
> > > 初始化作用域链：`<ECFN1, ECAN>`
> > >
> > > 初始化`this`：`obj`
> > >
> > > 形参赋值：`y = 6`
> > >
> > > 变量提升：--
> > >
> > > 代码执行：
> > >
> > > `this.x *= (++x) + y ==> this.x = this.x *((++x) + y) = 5 * (13 + 6) = 95` **此时`obj.x`为95**
> > >
> > > `console.log(this.x)`
> > >
> > > **此时输出13**
> > >
> > > 无`return`
> >
> > `ECFN1`出栈
> >
> > 执行`fn(4)`
> >
> > `ECFN2`
> >
> > > 初始化作用域链：`<ECFN2, ECAN>`
> > >
> > > 初始化`this`：`window`
> > >
> > > 形参赋值：`y = 4`
> > >
> > > 变量提升：--
> > >
> > > 代码执行：
> > >
> > > `this.x *= (++x) + y ==> this.x = this.x *((++x) + y) = 13 * (14 + 4) = 234` **此时`obj.x`为234**
> > >
> > > `console.log(this.x)`
> > >
> > > **此时输出234**
> > >
> > > 无`return`
> >
> > `ECFN2`出栈
> >
> > `console.log(obj.x, x)`**输出95，234**
>
> **EC(G)出栈**





#### 2

```js
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
b()
```

> `this`取值



#### 3

```js
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
```

>`obj.prop.getFullName()`执行`getFullName()`方法，`this.fullName`，即`obj.prop`，因为`obj.prop.fullName`不存在，即`undefined`



#### 4

```js
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
d()
```

> `this`指向



#### 5

```js
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
e()
```

> `call`绑定`this`为`window`



#### 6

```js
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
f()
```

> `val *= 2`并不是`this.val *= 2`所以并不会找到`obj.val`



#### 7

```js
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
```

> **分析`Function.prototype.call.call(A, 80, 70)`**
>
> **第一次执行`call`：**
>
> `this => 【call】`
>
> `context => A`
>
> `args => 20,10`
>
> `context[key] = this => A[key] = 【call】`
>
> `context[key](20，10) => 【call】(20，10) 且 this 为 context = A`
>
> **第二次执行`call`：**
>
> `this => A`
>
> `context => 20`
>
> `args => 10`
>
> `context[key] = this => Number(20)[key] = A`
>
> `context[key]() => A(10) 且 this 为 context = Number(20)`
>
> **最后结果：执行`A`且其中`this`为`Number(20)`**



> **分析`B.call.call.call(A, 20, 10)`**
>
> **第一次执行`call`：**
>
> `this => 【call】`
>
> `context => A`
>
> `args => 20,10`
>
> `context[key] = this => A[key] = 【call】`
>
> `context[key](20，10) => 【call】(20，10) 且 this 为 context = A`
>
> **第二次执行`call`：**
>
> `this => A`
>
> `context => 20`
>
> `args => 10`
>
> `context[key] = this => Number(20)[key] = A`
>
> `context[key]() => A(10) 且 this 为 context = Number(20)`
>
> **最后结果：执行`A`且其中`this`为`Number(20)`**



#### 8

```js
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
```



#### 9

> **请说出箭头函数和普通函数的区别**
>
> + 普通函数有实参集合arguments，箭头函数没有arguments
> + 普通函数的this是点前面的对象，箭头函数没有this，所以不能通过bind等方式改变this
> + 普通函数都有构造函数，有prototype，箭头函数没有构造函数，没有prototype



#### 10

>**请说出面向对象的理解**
>
>+ *什么是对象？【重点突出对象、类、实例的关系，而且JS就是基于面向对象开发的（常见的内置类和对应的实例）】*
>+ *构造函数、原型、原型链*
>+ *面向对象在实战中的应用（内置类原型扩展方法、借用原型上的属性和方法、重写一些方法从而实现一些功能、基于面向对象编写的类库、插件、框架等）*
>+ *Vue/React中的面向对象*
>+ *继承、this、数据类型检测*
>+ *突出自己对源码的研究*
