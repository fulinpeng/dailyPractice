* Provider 其实就只是一个外层容器，它的作用就是通过配合 connect 来达到跨层级传递数据。使用时只需将Provider定义为整个项目最外层的组件，并设置好store。那么整个项目都可以直接获取这个store。它的原理其实是通过React中的Context来实现的。

* connect 的作用是连接React组件与 Redux store，它包在我们的容器组件的外一层，它接收上面 Provider 提供的 store 里面的 state 和 dispatch，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。
