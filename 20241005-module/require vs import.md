`require` 和 `import` 的差异源自 CommonJS 和 ESM 的设计理念。`require` 更适合动态加载和服务器端环境，而 `import` 则为现代前端开发和高性能应用提供了更好的支持。

---

## **1. 背景：模块系统**
### **CommonJS 模块系统**
- **`require` 属于 CommonJS 规范**，主要用于 Node.js 环境。
- 模块在运行时加载，采用同步的方式。
- CommonJS 的模块是动态可变的（即模块内的值可以被修改）。

### **ES Modules (ESM) 模块系统**
- **`import` 属于 ECMAScript 模块（ESM）规范**，是 JavaScript 原生支持的模块机制。
- 模块在编译时静态解析，使用 `import` 语法。
- 模块是静态只读的，模块内部的值是引用而非拷贝。

---

## **2. 语法与使用方式**
### `require`
```javascript
const fs = require('fs'); // 加载内置模块
const myModule = require('./myModule'); // 加载自定义模块
```
- 动态引入：可以在运行时根据条件动态加载模块。
```javascript
if (needModule) {
    const module = require('some-module');
}
```

### `import`
```javascript
import fs from 'fs'; // 加载内置模块
import myModule from './myModule'; // 加载自定义模块
```
- 静态引入：必须在文件顶部引入，不支持动态加载（尽管可以使用动态 `import()`）。

---

## **3. 执行时机**
### **`require` 的执行时机**
- CommonJS 在代码运行时加载模块。
- 当 `require` 被调用时，模块代码立即被执行，模块对象会被创建并返回。

### **`import` 的执行时机**
- ES Modules 在代码编译阶段解析模块依赖。
- `import` 在脚本开始执行之前就完成加载，允许引擎优化模块加载（如并行加载依赖）。

---

## **4. 运行机制**
### **CommonJS 的运行机制**
- **同步加载**：
  - CommonJS 模块会被逐行解释和执行，适合用于服务器端环境。
  - `require` 会阻塞代码执行，直到模块加载完成。
- **模块导出**：
  - 使用 `module.exports` 或 `exports` 导出模块内容。
- **缓存**：
  - 加载的模块会缓存在 `require.cache` 中，后续加载同一模块会直接返回缓存内容。

### **ESM 的运行机制**
- **静态解析**：
  - `import` 在编译时确定模块依赖和导出内容。
  - 允许进行静态分析和树摇优化（Tree Shaking）。
- **异步加载**：
  - 浏览器和支持 ESM 的环境会异步加载模块。
- **模块导出**：
  - 使用 `export` 导出内容，支持命名导出和默认导出。
  - 模块值是引用类型，实时反映模块内容的变化。

---

## **5. 功能对比**
| 特性                | `require` (CommonJS)              | `import` (ESM)                        |
|---------------------|-----------------------------------|---------------------------------------|
| **模块加载时机**    | 运行时加载                         | 编译时加载                             |
| **语法支持**        | 动态加载支持                       | 静态加载，支持动态 `import()`          |
| **导出机制**        | `module.exports` 或 `exports`      | `export` 和 `export default`          |
| **模块值更新**      | 值拷贝（可变）                     | 引用（只读）                           |
| **优化能力**        | 无法优化（动态依赖）               | 可静态分析（支持 Tree Shaking）        |
| **适用环境**        | Node.js（传统环境）                | 浏览器和现代 JavaScript 环境           |

---

## **6. 实现原理**
### **`require` 的实现**
1. **文件定位**：
   - Node.js 使用模块解析算法找到模块文件（本地模块、内置模块、第三方模块）。
2. **文件加载与执行**：
   - 文件会被包装成一个函数 `(function(exports, require, module) { ... })`。
   - 模块代码被执行，结果存入缓存。
3. **返回模块导出内容**：
   - `module.exports` 的内容返回给调用方。

### **`import` 的实现**
1. **静态解析**：
   - 在解析阶段确定依赖关系，并生成模块图（Module Graph）。
2. **模块加载**：
   - 浏览器或引擎并行加载所有依赖。
3. **导入绑定**：
   - 通过解析 `export` 和 `import` 的语句建立绑定关系。
   - 执行模块代码，填充绑定内容。

---

## **7. 兼容性与迁移**
- **Node.js 的兼容性**：
  - Node.js 从 13 开始支持 ESM，但需要将文件命名为 `.mjs` 或在 `package.json` 中设置 `"type": "module"`。
- **`require` 和 `import` 的混用**：
  - CommonJS 可以通过 `require` 加载 ESM，但 ESM 无法直接加载 CommonJS。
  - 使用 `dynamic import()` 实现兼容性。

---

## **8. 适用场景**
- **`require`**：
  - 动态加载场景（例如按需加载）。
  - 旧版 Node.js 项目。
- **`import`**：
  - 静态依赖场景，现代 JavaScript 应用。
  - 性能优化和模块树摇（Tree Shaking）场景。
