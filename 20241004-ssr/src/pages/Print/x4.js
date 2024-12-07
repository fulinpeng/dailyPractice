// 客户端恢复
const initialConfig = window.__INITIAL_CONFIG__;
const componentTree = parseConfigToComponent(initialConfig);
ReactDOM.hydrate(componentTree, document.getElementById("root"));
