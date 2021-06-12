### DOM事件

> 事件是浏览器**天生**就具备的行为，*无论我们是否基于JS代码绑定方法*，只要相关的**行为触发**，则一定会**触发相关的事件**。



#### 鼠标事件行为

> `mouseover`：鼠标经过
>
> `mouseout`：鼠标离开
>
> `mouseenter`：鼠标进入
>
> `mouseleave`：鼠标离开
>
> `mousemove`：鼠标移动
>
> `mousedown`：鼠标按下
>
> `mouseup`：鼠标抬起
>
> `click`：点击（**不是单击**，点几次就触发几次）
>
> `dblclick`：双击（在`300ms`内连续触发两次点击，则被认为是**一次双击**）
>
> `mousewheel`：鼠标滚轮滚动
>
> `contextmenu`：鼠标右键点击



#### 键盘事件行为

> `keydown`：键盘按下
>
> `keyup`：键盘抬起
>
> `keypress`：键盘长按
>
> `input`：**文本框内容输入中**



#### 表单事件行为

> `blur`：文本框失去焦点
>
> `focus`：文本框获取焦点
>
> `change`：内容改变（如，下拉菜单）
>
> `submit`：表单提交



#### 浏览器事件行为

> `scrool`：滚动条滚动
>
> `resize`：窗口大小改变
>
> `load`：页面完全加载完成
>
> `DOMContentLoaded`：DOM结构加载完成
>
> `error`：加载失败





#### 拖拽事件行为

> **`H5`新增**
>
> `drag`：
>
> `dragStart`：
>
> `dragEnd`：





#### 移动端事件行为

> 【**touch单手指操作模型**】
>
> `touchstart`：手指按下
>
> `touchmove`：手指移动
>
> `touchend`：手指离开
>
> `touchcancel`：因意外导致操作结束
>
> 【**gesture多手指操作模型**】
>
> `gesturestart`：
>
> `gesturechange`：





### 事件绑定

> *给元素的某个行为绑定方法，这样事件行为触发的时候，对应绑定的方法就会执行，完成一些需要完成的功能*
>
> **`DOM`0级事件绑定**：`元素.onxxx = function(){}`
>
> **`DOM`2级事件绑定**：
>
> ​	【标准浏览器】：`元素.addEventListener('xxx', function(){}, false)`
>
> ​	【`IE6-8`浏览器】：`元素.attachEvent('onxxx', function(){})`
>
> #### **`DOM0 VS DOM2`**
>
> ##### `DOM0事件绑定`
>
> 事件绑定的原理就是**当元素对象的某些私有属性（隶属于事件/`onxxx`）赋值一个函数，当事件行为触发，浏览器会自动把绑定的方法执行**，所以移除事件绑定就是：`box.onclick = null`，**缺点**如下：
>
> - **只能绑定一个方法**（绑定多个方法会把之前绑定的方法替换掉）
> - 如果元素私有属性中不具备某个事件的私有属性，则无法给这些事件绑定方法，如`window`没有`ontransitionend`方法
>
> 
>
> ##### **`DOM2事件绑定`**
>
> 基于元素的原型链找到`EventTarget.prototype`，使用内置的`addEventListener`或者`removeEventListener`进行事件绑定和移除事件绑定，**底层原理是基于浏览器内置的事件池机制**完成事件监听和方法绑定的****
>
> + **`DOM2`事件绑定的时候，一般使用具名函数，方便移除事件绑定**
> + 基于事件池机制，可以给当前元素的某个事件类型绑定多个不同的方法，**事件触发会按照绑定的顺序把方法依次执行**
> + 所有浏览器支持的事件类型都可以做事件绑定，`box.addEventListener('transitionend', func)`
> + `DOM2`的内存开销比`DOM0`要高一些，但是`DOM2`要更强大，机制页更加完善一些，`JQuery`就是基于`DOM2`的封装
>
> ![1=](https://cdn.jsdelivr.net/gh/zangguojun/PicGo/20210612150505.png)



#### 面试题

**`window.onload`和`JQ`中的`document.ready[($document).read()]`的区别**

1. **`load`是等待所有资源都加载完成才会触发执行**，而`JQ`源码里面的`($document).read()`中用的是`DOMContentLoaded`事件，事件本身是DOM结构加载完成就会触发执行，**所以`document.ready`要比`window.onload`先执行**
2. `window.onload`是基于`DOM0`事件绑定，只能绑定一个方法，而`JQ`中的事件绑定都是基于`DOM2`完成的，所以可以在相同页面中绑定多个不同的方法，可以把模块代码放到`$(function(){})`里，这样既能**实现闭包**还能保证**DOM结构加载完才会执行**，方便操作`DOM`
3. 无论哪种方法，都是为了保证DOM结构加载完再执行的，这样再方法中肯定能获取到DOM元素，**防止把JS放到DOM之前加载，导致元素无法获取的问题**（引申出来的问题，*JS/CSS/IMG/结构加载的顺序和机制*、*浏览器渲染机制*等）











