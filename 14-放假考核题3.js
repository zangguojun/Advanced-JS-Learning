function a() {
  console.log(!(!'Number(undefined)'), true);
  // true
  console.log(isNaN(parseInt(new Date())) + Number([1]) + typeof undefined, '2undefined');
  // true + 1 + 'undefined'
  console.log(Boolean(Number('')) + !isNaN(Number(null)) + Boolean('parseInt[]') + typeof !(null), '2boolean');
  // false + true + true + 'boolean'
  console.log(parseFloat('1.6px') + parseInt('1.2px') + typeof parseInt(null), '2.6number');
  // 1.6 + 1 + 'number'
  console.log(isNaN(Number(!!Number(parseInt('0.8')))), false);
  // 0 true 1 false
  console.log(!typeof parseFloat('0'), true);
  // 0 'number' true
  console.log(typeof 'parseInt(null)' + 12 + !!Number(NaN), 'string12false');
  // 'string' + 12 + false
  console.log(!typeof (isNaN('')) + parseInt(NaN), NaN);
  // 0 false 'boolean' false + NaN
  console.log(typeof !parseInt(null) + !isNaN(null), 'booleantrue');
  // NaN true 'boolean' + true
}
// a()

console.log('--------------------');


function b() {
  var x = 1
  function func(x, y = function anonymous1() { x = 2 }) {
    x = 3
    y()
    console.log(x, 2);
  }
  func(5)
  console.log(x, 1);
}
// b()

console.log('--------------------');

function c() {
  var x = 1
  function func(x, y = function anonymous1() { x = 2 }) {
    var x = 3
    y()
    console.log(x, 3);
  }
  func(5)
  console.log(x, 1);
}
// c()

console.log('--------------------');

function d() {
  var x = 1
  function func(x, y = function anonymous1() { x = 2 }) {
    var x = 3
    var y = function anonymous2() { x = 4 }
    y()
    console.log(x, 4);
  }
  func(5)
  console.log(x, 1);
}
d()