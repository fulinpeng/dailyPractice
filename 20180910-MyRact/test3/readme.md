## test3

* 优化DOM操作：状态改变 -> 构建新的DOM => 更新页面
    * 添加状态state
    * 用模板字符串，插入js变量
    * 每次state发生改变，重新出发render函数返回新的dom

* `createDOMFromString`函数代替了react中jsx到DOM的过程
    * jsx文件中的dom字符串 => jsx-babel => jsx => 真正的DOM
    * click 事件，其实也是在这个过程中遍历到jsx对象的attr进行绑定的

* `onStateChange` 方法，相当于react生命周期中的那个方法？