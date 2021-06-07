## `this`

> 浏览器`this`深入，node也类似

```js
{
  let a = 12
  console.log(this, '[object Window]');
}
console.log(this.a, undefined);

var obj = {
  fn() {
    {
      let a = 12;
      console.log(this, '{obj}');
    }
    console.log(this.a, undefined);
  }
}
obj.fn()
```

> **不要把`this`和`上下文`搞混，`this`是执行主体**
>
> > **谁来触发的事情就是执行主体【`this`】，在哪发生的是上下文【`context`】**
>
> 全局上下文中的`this`是`window`
>
> 块级上下文没有自己的`this`，它的`this`是继承所在上下文中的`this`，但是拥有自己的上下文
>
> 函数私有上下文中，`this`的情况会多种多样





### **如何区分执行主体？**

### 1、**事件绑定**

> 给元素的某个事件行为绑定方法，当事件行为触发，方法执行，方法中的`this`是当前元素本身（`特殊，IE6-8中基于attachEvent方法实现的DOM2事件绑定，事件触发时，方法中的this时window而不是元素本身`）

> + ```js
>   // DOM0
>   document.body.onclick = function () {
>     console.log(this);
>   }
>   ```
>
> + ```js
>   // 高版本浏览器DOM2
>   document.body.addEventListener('click', function () {
>     console.log(this);
>   })
>   ```
>
> + ```js
>   // 低版本浏览器DOM2
>   document.body.attachEvent('onclick', function () {
>     console.log(this);
>   })
>   ```



### 2、**普通函数执行(包含普通函数、自执行函数、对象成员访问调取方法执行)**

> 只需要看函数执行的时候，方法名前面是否有`点`，有点，点的前面就是`this`，没有`点`，this就是`window`或者（**严格模式下**）`undefined`

> + **函数中`this`和在哪执行的，以及在哪定义的都没有关系**【`上下文与在哪定义有关系`】
>
>   + ```js
>     (function () {
>       console.log(this, '[object Window]');
>     })();
>     
>     console.log('--------------------');
>     
>     'use strict';
>     (function () {
>       'use strict'
>       console.log(this, undefined);
>     })();
>     
>     console.log('--------------------');
>     
>     var obj = {
>       fn: (function () {
>         console.log(this, '[object Window]');
>         return function () {
>         }
>       })()
>     }
>     ```
>
> + ```js
>   function func() {
>     console.log(this);
>   }
>   var obj = {
>     func: func
>   }
>   func() // '[object Window]'
>   obj.func()// obj
>   ```
>
> + ```js
>   [1].slice()
>   //slice方法执行，slice里的this是[1]
>   Array.prototype.slice()
>   //slice方法执行，slice里的this是Array.prototype
>   [1].__proto__.slice()
>   //slice方法执行，slice里的this是[1].__proto__ === Array.prototype
>   ```
>
> + ```js
>   function func() {
>     console.log(this, '[object Window]');
>   }
>   document.body.onclick = function () {
>     func();
>     // func方法执行，func里的this是window
>   }
>   ```



### 3、**构造函数执行`new Fn()`**：构造函数体中的`this`是当前实例

> - ```js
>   function Func() {
>     this.name = 'F'
>     console.log(this, '[object Window]');
>   }
>   Func.prototype.getName = function () {
>     console.log(this);
>   }
>   let f = new Func() // '[object Func]'
>   f.getName() // '[object Func]'
>   f.__proto__.getName() // '[object Func.prototype]'
>   Func.prototype.getName() // '[object Func.prototype]'
>   let gN = f.getName
>   gN()//'[object Window]'
>   ```



### 4、**ES6的箭头函数**

> **箭头函数没有自己的`this`，它的`this`是继承所在上下文的`this`，和块级上下文一样**

> - **之前的规律无效**
>
> - **普通函数执行**：
>
>   - 形成私有上下文`ECFN`和`AOFN`
>   - 初始化作用域链
>   - 初始化`this`
>   - 初始化`arguments`
>   - 形参赋值
>   - 变量提升
>   - 代码执行
>   - 是否释放堆
>
> - **箭头函数执行**：
>
>   - 形成私有上下文`ECFN`和`AOFN`
>   - 初始化作用域链
>   - `XXXX`初始化`this`
>   - `XXXX`初始化`arguments`
>   - 形参赋值
>   - 变量提升
>   - 代码执行【代码执行时，遇到`this`，直接向上层上下文寻找`this`】
>   - 是否释放堆
>
> - **存储`this`、基于`bind`修改`this`、使用箭头函数等方式可以“修改”当前`this`**
>
>   - ```js
>     var obj = {
>       i: 0,
>       func() {
>         _this = this
>         setTimeout(function () {
>           console.log(_this.i);
>           _this.i++
>           console.log(_this.i);
>           console.log(obj);
>         }, 1000);
>       }
>     }
>     obj.func()
>     
>     console.log('--------------------');
>     
>     var obj = {
>       i: 0,
>       func() {
>         setTimeout(function () {
>           console.log(this.i);
>           this.i++
>           console.log(this.i);
>           console.log(obj);
>         }, 1000);
>       }
>     }
>     obj.func()
>     
>     console.log('--------------------');
>     
>     var obj = {
>       i: 0,
>       func() {
>         setTimeout(function () {
>           console.log(this.i);
>           this.i++
>           console.log(this.i);
>           console.log(obj);
>         }.bind(this), 1000);
>       }
>     }
>     obj.func()
>     
>     console.log('--------------------');
>     
>     var obj = {
>       i: 0,
>       func() {
>         setTimeout(() => {
>           this.i++
>           console.log(obj);
>         }, 1000);
>       }
>     }
>     obj.func()
>     ```



### 5、基于`apply`、`call`、`bind`等方式，手动改变函数的`this`指向

> 除了箭头函数无法改变`this`



### 综合

```js
var num = 10;
var obj = {
  num: 20
};
obj.fn = (function (num) {// 20  10
  this.num = num * 3;     // 60  60
  num++;                  // 21  21
  return function (n) {
    this.num += n;        // 65  30
    num++;                // 22  23
    console.log(num);     // 22  23
  }
})(obj.num);
var fn = obj.fn;
fn(5); // 22
obj.fn(10);
console.log(num, obj.num);// 65 30
```

>有自执行函数就可以先处理自执行函数，因为自执行函数的`this`指向`window`