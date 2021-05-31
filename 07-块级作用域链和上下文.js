var a = 0
if (true) {
  a = 1
  function a() { }
  a = 2
  console.log(a);
}
console.log(a);
// IE 5/7/8/9/10  
// 2 2
// IE 11
// 2 function a(){ }
// chrome
// 2 1