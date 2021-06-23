```js
Function.prototype.bind = function bind(context = window, ...args1) {
    return (...args2) => {
        // this.call(context, ...args1, ...args2)
        this.apply(context, [...args1, ...args2])
    }
}
let obj = {
    name: 'obj'
}
function func(x) {
    console.log(arguments);
    console.log(this);
}
func.call() // '[object Window]'
func.call(null) // '[object Window]'
func.call(undefined) // '[object Window]'
func.call(11) // '[object Window]'
document.body.onclick = func;
document.body.onclick = func();
document.body.onclick = func.bind(obj, 10)
setTimeout(func.bind(obj, 10), 1000);
```

