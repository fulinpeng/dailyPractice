`renderToString` 和 `renderToNodeStream` 是 React 的服务器端渲染（SSR）工具，它们的作用是将 React 组件渲染为 HTML 字符串或流，分别适用于不同的性能需求和使用场景。以下是它们的区别及适用场景：

---

### **1. `renderToString`**
- **工作方式**：
  - 将整个 React 组件树渲染为一个完整的 HTML 字符串。
  - 一次性完成渲染后，将生成的 HTML 字符串返回。

- **优点**：
  - 简单直接，适合较小或中等规模的页面。
  - 容易调试，逻辑简单。

- **缺点**：
  - 阻塞式操作：直到组件树完全渲染后，才会返回结果。
  - 对于大型页面，可能会导致服务器响应时间变长，影响性能。

- **使用场景**：
  - 小型页面。
  - 不需要显著优化首字节时间（TTFB）的应用。

---

### **2. `renderToNodeStream`**
- **工作方式**：
  - 将 React 组件树以流的形式逐步渲染为 HTML，并分块输出。
  - 输出流可直接传递到 HTTP 响应中，浏览器可以更早地开始解析和渲染页面。

- **优点**：
  - 非阻塞式：首字节时间显著降低，因为内容在生成时立即输出。
  - 更适合大型页面，用户可以更快看到页面的部分内容（提升感知性能）。

- **缺点**：
  - 实现和调试更复杂。
  - 某些情况下难以插入额外的动态逻辑（如自定义操作需精细控制流）。
  - 对流的处理依赖于服务器环境支持（如 Node.js）。

- **使用场景**：
  - 大型页面，特别是需要提高首字节时间的场景。
  - 应用需要流式输出以提升用户体验。

---

### **性能比较**
| **特性**                | `renderToString`                 | `renderToNodeStream`             |
|-------------------------|-----------------------------------|-----------------------------------|
| **响应速度**            | 整个页面生成后一次性返回          | 分块输出，首字节时间更低          |
| **复杂页面支持**        | 可能较慢                          | 更快适应大规模页面内容            |
| **实现难度**            | 简单                              | 较高，需处理流逻辑                |
| **浏览器首屏渲染体验**  | 较慢                              | 较快                              |

---

### **代码对比**

**`renderToString` 示例**：
```javascript
import { renderToString } from 'react-dom/server';
import App from './App';

const html = renderToString(<App />);
res.send(`<!DOCTYPE html>${html}`);
```

**`renderToNodeStream` 示例**：
```javascript
import { renderToNodeStream } from 'react-dom/server';
import App from './App';

const stream = renderToNodeStream(<App />);
res.write('<!DOCTYPE html>');
stream.pipe(res);
```

---

### **实际应用建议**
1. **优先使用 `renderToNodeStream`**：
   对于性能关键的应用（如电商平台或新闻网站），更早的首屏渲染时间会显著改善用户体验。

2. **使用 `renderToString` 时机**：
   如果页面简单、渲染内容较少，或者团队不熟悉流式处理，`renderToString` 可能是更方便的选择。

3. **进阶替代方案**：
   React 18 引入了 `renderToPipeableStream` 和 `renderToReadableStream`，它们进一步优化了流式渲染和 Suspense 支持，是未来的更推荐选择。