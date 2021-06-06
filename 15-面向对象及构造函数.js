function a() {
  function Fun() {
  }
  let a = Fun()
  console.log(a, undefined);
  let f = new Fun()
  console.log(f, 'Fun {}');
}
// a()

console.log('--------------------');

function b() {
  function Func(x, y) {
    let num = x + y;
    this.x = x;
    this.y = y;
  }
  let f1 = Func(10, 20)
  console.log(f1, undefined);
  console.log(this.x, 10);
}
// b()

function c() {
  function Func(x, y) {
    let num = x + y;
    this.x = x;
    this.y = y;
  }
  let f1 = new Func(10, 20)
  console.log(f1, 'Func { x: 10, y: 20 }');
  console.log(this.x, undefined);
}
// c()

console.log('--------------------');

function d() {
  let obj = {
    name: 'bu',
    getName() {
      return name
    }
  }
  console.log(obj.hasOwnProperty('name'), true);
  console.log(obj.hasOwnProperty('getName'), true);
  console.log(obj.hasOwnProperty('toString'), false);
  console.log('name' in obj, true);
  console.log('getName' in obj, true);
  console.log('toString' in obj, true);
}
d()