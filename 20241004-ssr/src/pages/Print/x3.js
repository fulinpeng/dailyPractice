// 服务端生成注水数据
const serializedConfig = JSON.stringify(pageConfig);
res.send(`
  <html>
    <body>
      <div id="root">${ReactDOMServer.renderToString(parseConfigToComponent(pageConfig))}</div>
      <script>
        window.__INITIAL_CONFIG__ = ${serializedConfig};
      </script>
    </body>
  </html>
`);
