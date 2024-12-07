import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/pages/App";
import fetch from "isomorphic-fetch";

const app = express();

// 静态资源服务
app.use(express.static("public"));

// 数据接口模拟
app.get("/api/template/:id", async (req, res) => {
    const data = { id: req.params.id, content: "Sample Template Data" }; // 模拟数据
    res.json(data);
});

// 渲染 HTML
app.get("/template/:id", async (req, res) => {
    const { id } = req.params;
    const data = await fetch(`http://localhost:3000/api/template/${id}`).then((res) => res.json());
    const reactHtml = renderToString(<App data={data} />);

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Template</title>
        <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>
        <script src="/client.bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${reactHtml}</div>
      </body>
    </html>
  `);
});

// SSR 路由
// app.get("*", (req, res) => {
//     const context = {};

//     // 渲染 React 应用
//     const reactHtml = ReactDOMServer.renderToString(
//         <StaticRouter location={req.url} context={context}>
//             <App data={data} />
//         </StaticRouter>,
//     );
//     // 检查是否需要重定向
//     if (context.url) {
//         res.redirect(301, context.url);
//     } else {
//         res.send(`
//       <!DOCTYPE html>
//         <html>
//             <head>
//                 <title>Print Template</title>
//                 <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>
//                 <script src="/client.bundle.js" defer></script>
//             </head>
//             <body>
//                 <div id="root">${reactHtml}</div>
//             </body>
//         </html>
//       `);
//     }
// });
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
