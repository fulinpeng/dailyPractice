renderToString 或 renderToNodeStream

注水过程可能会带来性能开销（特别是大页面）

针对非重要的页面模块，可以在用户交互后延迟加载和注水（例如通过 React.lazy 和 Suspense）

使用 renderToNodeStream 实现流式 HTML 输出，提升性能

### **服务端会执行的生命周期**

* constructor
* getDerivedStateFromProps
* render

### **服务端不会执行的生命周期**
* componentDidMount:
    * 服务端没有真实的 DOM 环境，因此不会触发。
    * 该方法用于客户端加载完成后的 DOM 操作和数据请求。
* componentDidUpdate:
    * SSR 不会发生组件更新，因此这个生命周期不会被调用。
* componentWillUnmount:
    * 服务端不会有组件卸载的场景。
* 副作用相关方法：
    * 如 useEffect，在服务端不会执行，因为副作用需要与浏览器环境交互（如监听事件、修改 DOM）。

### **共享初始状态**
* 在 CSR 中，页面初始状态通常需要通过前端异步请求获取，增加复杂性。
* SSR 解决方式：SSR 可以在服务端获取数据并直接嵌入到 HTML 中，客户端只需接管页面交互逻辑，无需额外的初始化数据请求。