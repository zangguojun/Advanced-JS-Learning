### `Function`每一个函数/类都是`Function`的实例

> **所以所有函数/类的实例的`__proto__`一定指向`Function.prototype`**



### `Object`每一个对象都是`Object`的实例

> **所以所有对象的实例的`__proto__`一定指向`Function.prototype`**



> 比如，Array、Number、String等内置类
>
> > `Function.prototype`的一些属性和方法：
> >
> > `call`、`apply`、`bind`
> >
> > `toString`等
> >
> > `Function`的一些属性和方法：
> >
> > `prototype`、`__proto__`等
>
> > `Array.prototype`的一些属性和方法：
> >
> > `push`、`pop`、`forEach`、`map`、`sort`等
> >
> > `Array`的一些属性和方法：
> >
> > `length`、`from`、`isArray`
> >
> > `prototype`、`__proto__`等
>
> > `Object.prototype`的一些属性和方法：
> >
> > `hasOwnProperty`、`isPrototypeOf`、`toString`、`valueOf`等
> >
> > `Object`的一些属性和方法：
> >
> > `assign`、`create`、`defineProperty`、`entries`、`freeze`、`keys`
> >
> > `prototype`、`__proto__`等

### **`__proto__`的指向**

```js
let arr = [10, 20, 30]
let Func = function () { }
let f = new Func()
let obj = {}
```

`arr`的`__proto__`指向`Array.prototype`

`Array.prototype`的`__proto__`指向`Object.prototype`

----

`f`的`__proto__`指向`Func.prototype`

`Func.prototype`的`__proto__`指向`Object.prototype`

`Func`的`__proto__`指向`Function.prototype`

`Function.prototype`的`__proto__`指向`Object.prototype`

> **这里的`Function.prototype`是一个匿名空函数，但是它的相关操作和其他类型的`prototype`对象没有任何区别，并且它的的`__proto__`也指向`Object.prototype`**

----

`obj`的`__proto__`指向`Object.prototype`

`Object.prototype`的`__proto__`指向`null`

-----

-----

`Array`的`__proto__`指向`Function.prototype`

`Object`的`__proto__`指向`Function.prototype`

`Function`的`__proto__`指向`Function.prototype`

```js
console.log(Func instanceof Func, false);
console.log(Function instanceof Function, true);
console.log(Function.__proto__ === Function.prototype, true);
```



> **所以**
>
> **`Object`作为一个类，也是一个函数，所以他是`Function`的一个实例**
>
> **`Function`作为一个类，也是一个对象，所以他也是`Object`的一个实例**
