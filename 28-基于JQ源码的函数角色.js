/**
 * JQ中核心的基础内容：JQ选择器
 * 基于选择器（类似于CSS选择器）获取到需要操作的DOM元素，获取的结果是一个JQ对象
 * 接下来可以调用JQ上提供的方法去实现相关的操作
 *    -> 操作样式 css/addClass/removeClass/toggleClass/hasClass
 *    -> 筛选 filter/children/find/siblings/prev/prevAll/next/nextAll
 *    -> 内容或者动态操作元素 text/html/val/append/appendTo/insert/insertBefore/insertAfter/remove...
 *    -> 操作属性 attr/removeAttr/prop/removeProp...
 *    -> 操作动画 stop/finish/animate/show/hide/toggle/fadeIn/fadeOut/fadeToggle/slideDown/slideUp.slideToggle
 *    -> 事件处理 on/bind/unbind/off/delegate
 * 其他方法
 *    -> $.ajax()
 *    -> $.each()
 *    -> $.extend() 扩展类库/插件
 *    -> $.type() 检测数据类型
 *    -> ......
 */
(function (global, factory) {
  "use strict";
  // 下面这个条件能成功说明，这个一个基于CommonJS规则运行的服务器端（Node）
  if (typeof module === "object" && typeof module.exports === "object") {
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

});