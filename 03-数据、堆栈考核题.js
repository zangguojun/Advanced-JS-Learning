function a() {
  var a = 100 + true + 21.2 + null + undefined + 'Tencent' + [] + null + 9 + false
  console.log(a, 'NaNTencentnull9false');
}

console.log('--------------------');

function b() {
  console.log([] == false, true);
  console.log(![] == false, true);
}

console.log('--------------------');

function c() {
  console.log(1 + [] + 2, '12');
}

console.log('--------------------');

console.log(0 + {}, '0[object Object]');
// 交互模式
// {}+0
// 0

// {var a = 1} + 0
// 0

// function a(){var a = 1} + 0
// 0

// ({})+0
// "[object Object]0"

// ({}+0)
// "[object Object]0"

// 连加情况
// {} + 0 + 10
// 10

// {} + 0 + "10"
// "010"

// {} + 0 + []
// "0"

// 连加特殊情况
// {} + 0 + {}
// [object Object]0[object Object]
function d() {
  console.log(`({} + 0)以及({var a = 1} + 0)在交互模式下为0`);
}

console.log('--------------------');

function e() {
  var b = '10'
  console.log(+ b, 10);
  console.log(++b, 11);
  console.log(b++, 11);
  console.log(b, 12);
}

console.log('--------------------');

function f() {
  var a = {}
  var b = '0'
  var c = 0
  a[b] = 'bu'
  a[c] = 'chi'
  console.log(a[b], 'chi');

  var a = {}
  var b = Symbol('1')
  var c = Symbol('1')
  a[b] = 'bu'
  a[c] = 'chi'
  console.log(a[b], 'bu');

  var a = {}
  var b = { n: '1' }
  var c = { n: '2' }
  a[b] = 'bu'
  a[c] = 'chi'
  console.log(a[b], 'chi');
}

console.log('--------------------');

function g() {
  var a = { n: 1 }
  var b = a
  a.x = a = { n: 2 }
  console.log(a.x, undefined);
  console.log(b, {
    n: 1,
    x: {
      n: 2
    }
  });

  var a = { n: 1 }
  var b = a
  a = a.x = { n: 2 }
  console.log(a.x, undefined);
  console.log(b, {
    n: 1,
    x: {
      n: 2
    }
  });
}

console.log('--------------------');

function h() {
  var x = [2, 3]
  function fn(y) {
    y[0] = 100
    y = [100]
    y[1] = 200
    console.log(y, [100, 200]);
  }
  fn(x)
  console.log(x, [100, 3]);
}