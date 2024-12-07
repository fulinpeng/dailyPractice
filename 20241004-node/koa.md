Koa2 是一个基于 Node.js 的轻量级 Web 框架，它的核心特性是通过“中间件”机制来构建应用程序。中间件是 Koa2 最重要的部分，通过它可以实现路由、权限校验、日志记录、错误处理等功能。

### **Koa2 中间件原理**

Koa2 中的中间件采用的是“洋葱模型”机制，通过异步函数（`async/await`）形成一个**中间件堆栈（middleware stack）**，每个中间件依次执行，既可以处理当前请求，又可以将控制权交给下一个中间件。

#### **核心原理**

1. **中间件堆栈：**
   - 每个中间件是一个函数，都会接收到两个参数：
     - `ctx`（Context）：封装了 HTTP 请求和响应的信息。
     - `next`（Function）：一个函数，调用它可以将执行权交给下一个中间件。

2. **执行流程（洋葱模型）：**
   - 请求从最外层的中间件开始。
   - 如果调用 `await next()`，会将控制权交给下一个中间件。
   - 当前中间件在 `next()` 执行后会接收响应的回调，形成“从外到内，再从内到外”的流程。

3. **异步机制：**
   - 中间件可以是异步函数（`async`），通过 `await next()` 的方式等待下一个中间件执行完成。

---

### **Koa2 中间件执行流程图（洋葱模型）**

```plaintext
Request  --> [Middleware 1] --> [Middleware 2] --> [Middleware 3]
            <-- [Middleware 1] <-- [Middleware 2] <-- [Middleware 3] <-- Response
```

### **简单案例：中间件的基本使用**

下面是一个简单的 Koa2 应用示例，其中实现了多个中间件，并展示了“洋葱模型”的执行顺序：

#### **代码示例**

```javascript
const Koa = require("koa");
const app = new Koa();

// 中间件 1：记录请求时间
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log("[Middleware 1] - 开始");
    await next(); // 调用下一个中间件
    const duration = Date.now() - start;
    console.log(`[Middleware 1] - 结束，耗时：${duration}ms`);
});

// 中间件 2：设置响应头
app.use(async (ctx, next) => {
    console.log("[Middleware 2] - 开始");
    ctx.set("X-Custom-Header", "Koa2Middleware");
    await next(); // 调用下一个中间件
    console.log("[Middleware 2] - 结束");
});

// 中间件 3：处理具体请求
app.use(async (ctx, next) => {
    console.log("[Middleware 3] - 开始");
    ctx.body = "Hello, Koa2!";
    console.log("[Middleware 3] - 结束");
});

// 启动服务器
app.listen(3000, () => {
    console.log("Koa2 服务器已启动，监听端口 3000");
});
```

#### **执行流程**
1. **请求进入**：
   - 按照洋葱模型顺序，从 `Middleware 1` 开始执行。
   - 在 `Middleware 1` 中调用 `await next()`，跳转到 `Middleware 2`。

2. **进入内部中间件**：
   - `Middleware 2` 设置响应头后，通过 `await next()` 进入 `Middleware 3`。

3. **处理具体逻辑**：
   - `Middleware 3` 直接设置响应内容（`ctx.body`），返回控制权。

4. **从内到外依次退出**：
   - `Middleware 2` 和 `Middleware 1` 依次执行后续代码（如记录耗时等）。

---

### **复杂案例：实现错误捕获和日志记录**

在实际应用中，中间件通常用来处理全局性的功能，比如错误捕获、日志记录和权限校验。以下是一个实现错误处理和日志记录的案例。

#### **代码示例**

```javascript
const Koa = require("koa");
const app = new Koa();

// 全局错误捕获中间件
app.use(async (ctx, next) => {
    try {
        console.log("[ErrorHandler] - 开始");
        await next(); // 执行后续中间件
        console.log("[ErrorHandler] - 结束");
    } catch (err) {
        console.error("捕获到错误：", err.message);
        ctx.status = err.status || 500;
        ctx.body = { error: "服务器内部错误" };
    }
});

// 日志记录中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log(`[Logger] - 请求方法：${ctx.method}，路径：${ctx.url}`);
    await next();
    const duration = Date.now() - start;
    console.log(`[Logger] - 响应耗时：${duration}ms`);
});

// 模拟业务逻辑中间件
app.use(async (ctx, next) => {
    console.log("[BusinessLogic] - 开始");
    if (ctx.url === "/error") {
        throw new Error("这是一个测试错误"); // 模拟抛出错误
    }
    ctx.body = "Hello, this is a Koa2 application!";
    console.log("[BusinessLogic] - 结束");
});

// 启动服务器
app.listen(3000, () => {
    console.log("Koa2 服务器已启动，监听端口 3000");
});
```

---

### **代码执行流程说明**

1. **全局错误捕获中间件**：
   - 负责捕获应用程序中发生的错误，避免服务器直接崩溃。
   - 当 `next()` 抛出错误时，进入 `catch` 块，统一处理错误。

2. **日志记录中间件**：
   - 记录每次请求的基本信息（如方法、路径）。
   - 在退出时记录响应时间。

3. **业务逻辑中间件**：
   - 执行业务逻辑，如果发生错误会被错误捕获中间件处理。

#### **执行顺序（正常请求 `/`）**
```plaintext
[ErrorHandler] - 开始
[Logger] - 请求方法：GET，路径：/
[BusinessLogic] - 开始
[BusinessLogic] - 结束
[Logger] - 响应耗时：100ms
[ErrorHandler] - 结束
```

#### **执行顺序（错误请求 `/error`）**
```plaintext
[ErrorHandler] - 开始
[Logger] - 请求方法：GET，路径：/error
[BusinessLogic] - 开始
捕获到错误：这是一个测试错误
```

---

### **总结**

1. **Koa2 中间件是基于 `async/await` 的异步执行模型，形成了“洋葱模型”。**
2. **通过 `ctx` 和 `next`，可以灵活控制请求和响应的流向，按需处理。**
3. **中间件的典型应用包括：**
   - 错误捕获
   - 日志记录
   - 认证和授权
   - 数据解析和处理（如 `koa-bodyparser`）
4. **Koa2 中间件具有高度的可组合性，多个中间件可以共同完成复杂的功能。**

### **Koa2 简易实现**
```js
const http = require("http");

class Koa {
  constructor() {
    this.middlewares = [];
  }

  // 注册中间件
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 中间件组合器（洋葱模型）
  compose(ctx) {
    const dispatch = (i) => {
      if (i >= this.middlewares.length) return Promise.resolve();
      const middleware = this.middlewares[i];
      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
    };
    return dispatch(0);
  }

  // 创建上下文
  createContext(req, res) {
    const ctx = { req, res };
    ctx.request = { url: req.url, method: req.method };
    ctx.response = { body: null, status: 200 };
    ctx.set = (key, value) => res.setHeader(key, value);
    ctx.body = (data) => (ctx.response.body = data);
    return ctx;
  }

  // 启动服务
  listen(...args) {
    const server = http.createServer((req, res) => {
      const ctx = this.createContext(req, res);

      // 执行中间件链
      this.compose(ctx)
        .then(() => {
          // 处理响应
          res.statusCode = ctx.response.status || 200;
          if (ctx.response.body) {
            res.end(ctx.response.body);
          } else {
            res.end("Not Found");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        });
    });

    server.listen(...args);
  }
}

module.exports = Koa;

// 测试用例
const app = new Koa();

// 中间件 1
app.use(async (ctx, next) => {
  console.log("Middleware 1 Start");
  ctx.set("X-Custom-Header", "MyKoa");
  await next();
  console.log("Middleware 1 End");
});

// 中间件 2
app.use(async (ctx, next) => {
  console.log("Middleware 2 Start");
  ctx.body("Hello from MyKoa!");
  await next();
  console.log("Middleware 2 End");
});

// 启动服务
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```
