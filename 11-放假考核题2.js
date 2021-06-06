let queryURLParams1 = function (url, key) {
  let askIndex = url.indexOf('?');
  let polIndex = url.indexOf('#');
  let askText = '';
  let polText = '';
  polIndex === -1 ? polIndex = url.length : null;
  polText = url.substring(polIndex + 1);
  askIndex > -1 ? askText = url.substring(askIndex + 1, polIndex) : null;
  let obj = {};
  polText ? obj['_HASH'] = polText : null;
  if (askText) {
    askText.split('&').forEach(item => {
      let [k, v] = item.split('=');
      obj[k] = v
    })
  }
  return typeof key === "undefined" ? obj : obj[key]
}

let queryURLParams2 = function (url, key) {
  let link = document.createElement('a')
  link.href = url;
  let askText = link.search.substring(1);
  let polText = link.hash.substring(1);
  link = null;
  let obj = {};
  polText ? obj['_HASH'] = polText : null;
  if (askText) {
    let arr = askText.split(/(?:&|=)/g)
    for (let i = 0; i < arr.length; i += 2) {
      const k = arr[i];
      const v = arr[i + 1];
      k ? obj[k] = v : null
    }
  }
  return typeof key === "undefined" ? obj : obj[key]
}

let queryURLParams3 = function (url, key) {
  let askIndex = url.indexOf('?');
  let polIndex = url.indexOf('#');
  let askText = '';
  let polText = '';
  polIndex === -1 ? polIndex = url.length : null;
  polText = url.substring(polIndex + 1);
  askIndex > -1 ? askText = url.substring(askIndex + 1, polIndex) : null;
  let obj = {};
  polText ? obj['_HASH'] = polText : null;
  if (askText) {
    let arr = askText.split(/(?:&|=)/g)
    for (let i = 0; i < arr.length; i += 2) {
      const k = arr[i];
      const v = arr[i + 1];
      k ? obj[k] = v : null
    }
  }
  return typeof key === "undefined" ? obj : obj[key]
}

let queryURLParams4 = function (url, key) {
  let obj = {}
  url.replace(/([^?&=#]+)=([^?&=#]+)/g, (_, $1, $2) => obj[$1] = $2)
  url.replace(/#([^?&=#]+)/g, (_, $1) => obj['_HASH'] = $1)
  return typeof key === "undefined" ? obj : obj[key]
}
let url = "http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
console.log(queryURLParams4(url, 'from'));
console.log(queryURLParams4(url, '_HASH'));
console.log(queryURLParams4(url));

function currying(func, ...args1) {
  return (...args2) => {
    let args = [...args1, ...args2]
    if (args.length === func.length) {
      return func(...args)
    } else {
      return add(func, ...args)
    }
  }
}
function add(a, b, c, d) {
  return a + b + c + d
}
let newAdd1 = currying(add, 0)
console.log(newAdd1(1, 2, 3));
let newAdd2 = currying(add, 0, 2)
console.log(newAdd2(4, 6));

let fn = (...outArgs) => (...innerArgs) => outArgs.concat(innerArgs).reduce((total, item) => total + item, 0)
console.log(fn(1, 2)(3));

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}