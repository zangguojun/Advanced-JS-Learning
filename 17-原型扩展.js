function a() {
  String.prototype.queryURLParams = function (key) {
    let obj = {}
    this.replace(/([^?&=#]+)=([^?&=#]+)/g, (_, $1, $2) => obj[$1] = $2)
    this.replace(/#([^?&=#]+)/g, (_, $1) => obj['_HASH'] = $1)
    return typeof key === "undefined" ? obj : obj[key]
  }
  let url = "http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
  console.log(url.queryURLParams('from'));
  console.log(url.queryURLParams('_HASH'));
  console.log(url.queryURLParams());
}
// a()

console.log('--------------------');


function b() {
  Number.prototype.MyHandleNum = function (num) {
    this.num = Number(num)
    return isNaN(num) ? 0 : num
  }
  Number.prototype.MyPlus = function (x) {
    console.log(this, '[Number: 8]');
    return this + this.MyHandleNum(x)
  }
  Number.prototype.MyMinus = function (x) {
    return this - this.MyHandleNum(x)
  }
  let n = 10
  console.log(n.MyMinus(2).MyPlus(2), 10);
}
// b()

console.log('--------------------');

function c() {
  let obj = {
    name: 'bu',
    age: 22
  }
  console.log(obj.__proto__ === Object.prototype);

  Object.prototype.AAA = function () { }
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const x = obj[key];
      console.log(x);
    }
  }
  for (const key in obj) {
    const x = obj[key];
    console.log(x);
  }
}
c()