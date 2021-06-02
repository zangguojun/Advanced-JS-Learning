// let arr = [10.18, 0, 10, 25, 23]
// arr = arr.map(parseInt)
// console.log(arr);
// 10.18 0 10
// 0     1 NaN
// 10    2 2
// 25    3 2
// 23    4 11

console.log('--------------------');

// var a = 10, b = 11, c = 12
// function test(a) {
//   a = 1     // => EC(a)私有
//   var b = 2 // => EC(a)私有
//   c = 3     // => EC(G)拥有
// }
// test(10)
// console.log(a, b, c);
// 10 11 3

console.log('--------------------');

// var a = 4
// function b(x, y, a) {
//   console.log(a, 3);
//   arguments[2] = 10
//   console.log(a, 10);
// }
// a = b(1, 2, 3)
// console.log(a, undefined);

// var a = 4
// function b(x, y, a) {
//   'use strict'
//   console.log(a, 3);
//   arguments[2] = 10
//   console.log(a, 3);
// }
// a = b(1, 2, 3)
// console.log(a, undefined);

console.log('--------------------');

function funcA(x, y, z) {
  x = 100
  console.log(arguments[0], 100);

  arguments[1] = 200
  console.log(y, 200);

  z = 300
  console.log(arguments[2], undefined);
}

function funcB(x, y, z) {
  x = 100
  console.log(arguments[0], 100);

  arguments[1] = 200
  console.log(y, 200);

  arguments[2] = 300
  console.log(z, undefined);
}
funcA(10, 20)
funcB(10, 20)

console.log('--------------------');

{
  function foo() {}
  foo = 1
}
console.log(foo);

{
  function foo() {}
  foo = 1
  function foo() {}
}
console.log(foo);

{
  function foo() {}
  foo = 1
  function foo() {}
  foo = 2
}
console.log(foo);