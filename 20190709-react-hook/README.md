# Hook 规则
* Hook 本质就是 JavaScript 函数
* 只在最顶层使用 Hook
    * 不要在循环，条件或嵌套函数中调用 Hook，确保总是在你的 React 函数的最顶层调用他们
    * 如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部
* 发布了一个名为 eslint-plugin-react-hooks 的 ESLint 插件来强制执行这两条规则
    * https://react.docschina.org/docs/hooks-rules.html




