* 参考：
    * http://www.ruanyifeng.com/blog/2018/07/web-worker.html

* 在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
    * 这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
    * 但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。
        * `worker.terminate();`
    * Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

* 同源限制
    * 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

* DOM 限制
    * Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。
    * 但是，Worker 线程可以navigator对象和location对象。

* 通信联系
    * Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

* 脚本限制
    * Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

* 文件限制
    * Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
    * 运行代码得从服务器打开

* Worker 线程内部还能再新建 Worker 线程（目前只有 Firefox 浏览器支持）。
    * 将计算密集的任务，分配到10个 Worker。

* API
    * Worker.onerror：指定 error 事件的监听函数。
    * Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
    * Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
    * Worker.postMessage()：向 Worker 线程发送消息。
    * Worker.terminate()：立即终止 Worker 线程。

* Web Worker 有自己的全局对象，不是主线程的window，而是一个专门为 Worker 定制的全局对象。
    * 因此定义在window上面的对象和方法不是全部都可以使用。
    
* Worker 线程有一些自己的全局属性和方法。
    * self.name： Worker 的名字。该属性只读，由构造函数指定。
    * self.onmessage：指定message事件的监听函数。
    * self.onmessageerror：指定 messageerror 事件的监听函数。
        * 发送的数据无法序列化成字符串时，会触发这个事件。
    * self.close()：关闭 Worker 线程。
    * self.postMessage()：`向产生这个 Worker 线程发送消息`。
    * self.importScripts()：为webworker进程加载外部 JS 脚本。
