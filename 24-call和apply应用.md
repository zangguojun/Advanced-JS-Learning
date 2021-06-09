## `call`的使用

> **类数组**，具备和数组类似的结构（`索引`，`length`，`iterator`可迭代性），但是并不是数组的实例，所以不能用数组原型上的方法，我们把这样的结构成为类数组结构

#### 类数组转数组

```js
function func() {
  let args1 = Array.from(arguments)
  console.log(args1);

  console.log('--------------------');

  let args2 = [...arguments]
  console.log(args2);

  console.log('--------------------');

  let args3 = []
  for (let i = 0; i < arguments.length; i++) {
    args3.push(arguments[i]);
  }
  console.log(args3);

  console.log('--------------------');

  let args4 = Array.prototype.slice.call(arguments)
  console.log(args4);
}
func(10, 20, 30, 40)
```

> 四种方式，`Array.from(arguments)`，`[... arguments]`、`for i `、`Array.prototype.slice.call(arguments)`



## `apply`的使用

```js
let arr = [12, 3, 25, 45, 1, 12]
// 1
let max = arr.sort((a, b) => b - a)[0]
console.log(max);
// 2
max = arr[0]
arr.slice().forEach(item => {
  max > item ? max : max = item
})
console.log(max);
// 3
max = Math.max.apply(Math, arr)
console.log(max);
```
