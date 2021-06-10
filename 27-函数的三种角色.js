function Foo() {
  getName = function () {
    console.log(1);
  }
  return this;
}
Foo.getName = function () {
  console.log(2);
}
Foo.prototype.getName = function () {
  console.log(3);
}
var getName = function () {
  console.log(4);
}
function getName() {
  console.log(5);
}
Foo.getName(); // 普通对象 2
getName(); // 4
Foo().getName(); // 普通函数 将全局的getName修改 1
getName(); // 1
new Foo.getName(); // 成员访问19>不带参数new18 2
new Foo().getName(); // 实例的getName 3
new new Foo().getName(); // 3