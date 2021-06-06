function a() {
  function observerEvent(element, type, func) {
    if (element.addEventListener) {
      element.addEventListener(type, func)
    } else if (element.attachEvent) {
      element.attachEvent(type, func)
    } else {
      element[`on${type}`] = func
    }
  }
  function observerEvent(element, type, func) {
    if (element.addEventListener) {
      observerEvent = function () {
        element.addEventListener(element, type, func)
      }
    } else if (element.attachEvent) {
      observerEvent = function () {
        element.attachEvent(type, func)
      }
    } else {
      observerEvent = function () {
        element[`on${type}`] = func
      }
    }
    observerEvent(element, type, func)
  }
  observerEvent(element, 'click', function () {
    console.log(element.addEventListener, element.attachEvent, [`on${type}`]);
  })
}
// a()

console.log('--------------------');

function b() {
  (function () {
    function queryData() { }
    function getElement() { }
    window.getElement = getElement
  })()
  console.log(getElement);
}
// b()

function c() {
  let weatherModule = (function () {
    function queryData() { }
    function getElement() { }
    return {
      getElement
    }
  })()
  console.log(weatherModule.getElement);
}
// c()

console.log('--------------------');

function d() {
  let weatherModule = (function () {
    function queryData() { }
    function getElement() { }
    function bindHTML() { }
    function handleEvent() { }
    return {
      init() {
        queryData();
        getElement();
        bindHTML();
        handleEvent();
      }
    }
  })()
  weatherModule.init()
}
// d()