function a() {
  let a = typeof typeof typeof [12]
  console.log(a);
}

console.log('--------------------');

function b() {
  let b = parseFloat('left:20px')
  if (b === 200) {
    console.log(200);
  } else if (b === NaN) {
    console.log(NaN);
  } else if (typeof res === 'number') {
    console.log('number');
  } else {
    console.log('Invalid Number');
  }
}

console.log('--------------------');

function c() {
  console.log(parseInt(''), NaN);
  console.log(parseInt(null), NaN);
  console.log(parseInt(undefined), NaN);
  console.log(parseInt('12px'), 12);
  console.log(parseInt('1.2px'), 1);
  console.log(parseFloat('1.2px'), 1.2);
  console.log(Number(null), 0);
  console.log(Number(undefined), NaN);
  console.log(Number(true), 1);
  console.log(Number(false), 0);
  console.log(Number(''), 0);
  console.log(Number(' '), 0);
  console.log(Number('12 '), 12);
  console.log(Number(' \t\v\f0\r\n\x0d\x0a\u2028\u2029'), 0);
  console.log(Number('12px'), NaN);
  console.log(isNaN(""), false);
  console.log(isNaN(NaN), true);
  console.log(isNaN(null), false);
  console.log(isNaN(undefined), true);
  console.log(isNaN('null'), true);
}

console.log('--------------------');

function d() {
  let c = 10 + false + undefined + [] + 'Tencent' + null + true + {}
  console.log(c); 
}
