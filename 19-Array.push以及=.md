### `push`

```js
function a() {
  Array.prototype.push = function push(val) {
    this[this.length++] = val
    return this.length
  }
  let obj = {
    2: 3,
    3: 4,
    length: 2,
    push: Array.prototype.push
  }
  obj.push(1)
  obj.push(2)
  console.log(obj);
}
a()
```

> **模仿push的操作**：
>
> 如果是真实的`Array.push()`，处理的是一个没有`length`属性的对象，那么就把`length`当作`0`
>
> ```js
> function b() {
>   let obj = {
>     2: 3,
>     3: 4,
>     push: Array.prototype.push
>   }
>   obj.push(1)
>   obj.push(2)
>   console.log(obj);
> }
> b()
> ```





### `=`

>**=** :**赋值**，变量和值的关联，*并且是先创建值再创建变量*
>
>**==** ：**比较**，如果左右两边的数据类型不一致，则默认转换为一致【如果==两侧分别是对象和字符串，那么就需要把对象转换成字符串再进行比较，剩下的情况（除了`null/undefined/NaN`）两侧都需要转换成数字进行比较】
>
>**===** ：**绝对比较**，类型和值都得相同





### `valueOf`

```js
function b() {
  var a = {
    i: 1,
    valueOf() {
      return this.i++
    }
  };
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
b()
```

> **基本数据类型转换成数字，默认都是隐式调用`Number()`，对象转换成数字，需要先转换成字符串，然后再调用`Number()`转换成数字**
>
> **对象转换成字符串**：先调用`valueOf()`，如果得到的原始值是基本数据类型则返回，否则继续调用`toString()`
>
> **原始值**：基本数据类型基于构造函数创建出来的对象，通过`valueOf()`所得到的原始值就是基本数据类型

#### 1、与上面相似的方法

```js
function d() {
  var a = [1, 2, 3]
  a.toString = a.shift
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
d()
```

#### 2、数据劫持的方法

```js
function e() {
  let i = 1
  Object.defineProperty(window, 'a', {
    get() {
      return i++
    }
  })
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
e()
```

> **在每次获取a的值时，将其劫持到后返回满足要求的值**

