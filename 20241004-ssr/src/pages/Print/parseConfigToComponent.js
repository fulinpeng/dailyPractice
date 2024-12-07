import React from "react";

/**
 * 将配置对象解析为 React 组件
 * @param {Object} config 配置对象
 * @returns React Element
 */
function parseConfigToComponent(config) {
    if (typeof config === "string") {
        return config; // 文本节点
    }

    const { type, props = {}, children = [] } = config;

    // 递归处理子组件
    const childElements = Array.isArray(children)
        ? children.map((child) => parseConfigToComponent(child))
        : parseConfigToComponent(children);

    // 创建 React 元素
    return React.createElement(type, props, ...childElements);
}
export default parseConfigToComponent;
