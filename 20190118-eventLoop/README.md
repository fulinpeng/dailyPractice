# 资料

* https://juejin.im/post/59e85eebf265da430d571f89

* 注意：
1. 主线程代码也属于宏任务，执行完了，会立马执行一次微任务
2. 每执行一条宏任务就会执行所有本次宏任务添加的所有的微任务；
3. `.then(...).then(...)`加入microTask是同步执行的，第一个then的微执行完了，第二个then就执行马上又在microTask里添加下一个微任务，检查发现还有微任务就立即执行，`这两个微任务是在同一次EventLoop中执行的`；
4. 浏览器与node执行结果不一样的，node的执行当前添加的宏任务一次执行完，再检查执行当前添加的所有微任务
5. node环境下，`nextTick`会优先于`Promise.then`
6. 还有`dom事件`和`MutationObserver`，详情请看：`https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/`
    * the 'click' event is a task. MutationObserver and promise callbacks are queued as microtasks. The setTimeout callback is queued as a task. 
    * 事件冒泡的执行也优先于Timer，Timer的地位就这么低
    * 不同浏览器，的执行顺序不一样的。这咋搞啊？用`inner.click();`，【js调用click事件（不通过浏览器，直接走 js stack 来调用）】各大浏览器的执行顺序就都是一样的了。
        * 事件在冒泡的过程中，inner.click和outer.click执行，就先打印了两个click出来...so，浏览器执行不同，但是js运行是相同的
6. js里面有三个关于task的概念：`js stack`、`tasks`、`microtasks`
7. JavaScript引擎的内部运行机制跟Event loop没有半毛钱的关系
    * 这里的错误在于要分清楚JavaScript执行环境和执行引擎的关系，通常说的引擎指的是虚拟机，对于Node来说是V8、对Chrome来说是V8、对Safari来说JavaScript Core，对Firefox来说是SpiderMonkey。JavaScript的执行环境很多，上面说的各种浏览器、Node、Ringo等。前者是Engine，后者是Runtime。
    * 对于Engine来说，它们要实现的是ECMAScript标准。对于什么是event loop，他们没兴趣，不关心。event loop应该是Runtime执行机制的一部分。
    * 异步跟event loop其实没有关系。准确的讲，event loop是实现异步的一种机制
    * 异步包括event loop。以及轮询、事件等
        * 所谓轮询：就是你在收银台付钱之后，坐到位置上不停的问服务员你的菜做好了没（客户端不停请求，直到拿到数据为止）
        * 所谓（事件）：就是你在收银台付钱之后，你不用不停的问，饭菜做好了服务员会自己告诉你（服务器准备好了数据，主动推送到客户端）

# 延伸

* HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。
    * 所以，这个新标准并没有改变JavaScript单线程的本质。

