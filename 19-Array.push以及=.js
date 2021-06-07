function a() {
  Array.prototype.push = function push(val) {
    this[this.length++] = val
    return this.length
  }
  let obj = {
    2: 3,
    3: 4,
    length: 2,
    push: Array.prototype.push
  }
  obj.push(1)
  obj.push(2)
  console.log(obj);
}
// a()

function b() {
  let obj = {
    2: 3,
    3: 4,
    push: Array.prototype.push
  }
  obj.push(1)
  obj.push(2)
  console.log(obj);
}
// b()

console.log('--------------------');

/**
 * = :赋值，变量和值的关联，并且是先创建值再创建变量
 * == ：比较，如果左右两边的数据类型不一致，则默认转换为一致【如果==两侧分别是对象和字符串，那么就需要把对象转换成字符串再进行比较，剩下的情况（除了null/undefined/NaN）两侧都需要转换成数字进行比较】
 * === ：绝对比较，类型和值都得相同
 */
function c() {
  var a = {
    i: 1,
    valueOf() {
      return this.i++
    }
  };
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
// c()

function d() {
  var a = [1, 2, 3]
  a.toString = a.shift
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
// d()

function e() {
  let i = 1
  Object.defineProperty(window, 'a', {
    get() {
      return i++
    }
  })
  if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
  }
}
e()