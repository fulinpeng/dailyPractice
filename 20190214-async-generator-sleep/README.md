## async函数总结
* 当函数执行的时候，一旦遇到await就会先"返回"，等到异步操作完成，再接着执行函数体内后面的语句，最终碰到return语句才真正退出函数，返回值同普通函数。
执行返回的一定是一个thenable对象，可以用then来接收，如果用await来接收可以不用回调直接拿取结果
* 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行
如果要并发的话，可用promise.all
* async 函数可以保留运行堆栈，也会保留错误堆栈
* async 函数的执行结果是个promise，这个promise是在async函数体内部全部执行完了或者return之后才会执行then的

* await命令的参数：
    1. 普通函数执行
    2. async函数执行
    3. thenable对象
* 返回promise的话，await就相当于then会把结果取出来，返回普通值await会转成resolve的promise再处理
* 总结：一定是一个thenable对象，就算不是也会转成resolve的promise对象再处理

* 那await怎么处理rejected的结果呢？
1. 把不想中断的await用try...catch包起来
2. await后面的 Promise 对象再跟一个catch方法
3. try...catch + for 可以实现多次重复尝试

* 下面两个题自己写写？
1. 用generator手动实现async函数(一定得写写)
2. 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
    * 用promise、generator、async三种方式试试
* generator + for...of 来做数组扁平化

* Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
    * 执行 next() 方法后，返回的是yield表达式后面的语句执行结果
* Generator还是很有意思的，可以细读，里面的所有例子都很六
    * Generator函数里面嵌套for...of遍历另外一个Generator，然后遍历外层Generator就会出现嵌套效果啊...
    * Generator函数相互嵌套，也是同样的效果!!!
    * Generator函数里面 yeild 后面加不加 * 的区别啊，你知道不???
        * 就是 yeild 与 yeild* 的区别，yeild* 后面跟遍历器对象(包括数组、字符串)
            * 字符串也有遍历器接口
        * 有 * 可以直接调用next执行内嵌的Generator，没有的话就返回的是内嵌Generator的遍历器对象
    * 作为对象属性的 Generator 函数
    * Generator 函数的this，可以用变通的方法让 Generator 函数的执行结果为自己的实例也是遍历器对象
        * 首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this
    * 不能用new关键字调用，但是可以变通处理，怎么弄哇，不会...