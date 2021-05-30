var objA = {
  name: 'buchiyu',
  fn: (function (x) {
    return 'hello' + x
  })(objA.name)
}
console.log(objA.fn);