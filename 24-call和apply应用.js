function func() {
  let args1 = Array.from(arguments)
  console.log(args1);

  console.log('--------------------');

  let args2 = [...arguments]
  console.log(args2);

  console.log('--------------------');

  let args3 = []
  for (let i = 0; i < arguments.length; i++) {
    args3.push(arguments[i]);
  }
  console.log(args3);

  console.log('--------------------');


  /**
   * Array.prototype.slice
   */
  let arr = [10, 20, 30, 40]
  console.log(arr.slice());
  let args4 = Array.prototype.slice.call(arguments)
  console.log(args4);

  console.log('--------------------');
  console.log('--------------------');
}
func(10, 20, 30, 40)

console.log('--------------------');
console.log('--------------------');
function func1() {
  Array.prototype.forEach.call(arguments, (item) => {
    console.log(item);
  })
}
func1(10, 20, 30, 40)

console.log('--------------------');
console.log('--------------------');


let arr = [12, 3, 25, 45, 1, 12]
// 1
let max = arr.sort((a, b) => b - a)[0]
console.log(max);
// 2
max = arr[0]
arr.slice().forEach(item => {
  max > item ? max : max = item
})
console.log(max);
// 3
max = Math.max.apply(Math, arr)
console.log(max);
