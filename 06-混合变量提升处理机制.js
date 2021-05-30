var func = function A(){
  console.log(A,'[Function: A]');
  console.log(func,'[Function: A]');
}
func()
// console.log(A);//ReferenceError: A is not defined
setTimeout(function B(){
  console.log(B,'[Function: B]');
}, 0);

console.log('--------------------');

console.log('OK1');
// console.log(a);
console.log('OK2');
// let a = 12
a = 13

console.log('--------------------');

console.log('11111');
let bbb = '123'
console.log('22222');
// let bbb = '456'
console.log('33333');

console.log('--------------------');

console.log(b,funcb);
if(false) {
  var b = 1
  function funcb(){}
}
console.log(b,funcb);
function funcc() {
  console.log(d,funcd);
  if(false) {
    var d = 1
    function funcd(){}
  }
  console.log(d,funcd);
}
funcc()

console.log('--------------------');

function f() {}
var f = function ff() {}

console.log('--------------------');


fn()
function fn() {
  console.log(1);
}
fn()
function fn() {
  console.log(2);
}
fn()
var fn = function fn() {
  console.log(3);
}
fn()
function fn() {
  console.log(4);
}
fn()
function fn() {
  console.log(5);
}
fn()
// 555 333
console.log('--------------------');

var foo = 1
function bar() {
  if (!foo) {
    var foo = 10
  }
  console.log(foo, 10);
}
bar()