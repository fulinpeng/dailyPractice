Lighthouse除了在谷歌浏览器控制台直接用，还提供了一个 Node.js 的 API，使开发者可以在无需手动打开浏览器的情况下，自动化执行性能分析、生成报告，并整合到构建流程或 CI/CD 中。

### Lighthouse

1. **安装 Lighthouse**
   运行以下命令安装 Lighthouse：
   ```bash
   npm install lighthouse
   ```

2. **编写 Node.js 脚本**
   创建一个脚本文件，比如 `runLighthouse.js`，内容如下：
   ```javascript
   const lighthouse = require('lighthouse');
   const chromeLauncher = require('chrome-launcher');
   const fs = require('fs');

   async function runLighthouse(url) {
       const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
       const options = {
           logLevel: 'info',
           output: 'html',
           onlyCategories: ['performance', 'accessibility', 'seo'], // 可根据需求调整
           port: chrome.port,
       };
       const runnerResult = await lighthouse(url, options);

       // 获取报告的 HTML 输出
       const reportHtml = runnerResult.report;

       // 保存报告到本地文件
       fs.writeFileSync('lighthouse-report.html', reportHtml);

       console.log('Report is generated for', url);
       console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

       await chrome.kill();
   }

   // 替换为你想分析的 URL
   runLighthouse('https://baidu.com');
   ```

3. **运行脚本**
   使用 Node.js 执行脚本：
   ```bash
   node runLighthouse.js
   ```

4. **生成的报告**
   上述脚本会生成一个 `lighthouse-report.html` 文件，包含详细的 Lighthouse 分析报告。

### chrome-launcher
`chrome-launcher` 是一个用于启动 Chrome 或 Chromium 浏览器的工具库，通常与无头模式配合使用来自动化浏览器操作。  

### **核心特点**
1. **启动 Chrome/Chromium**  
   `chrome-launcher` 负责以编程方式启动本地安装的 Chrome 或 Chromium 浏览器实例，并支持指定运行模式（无头或有界面）。它本身并不处理浏览器的操作，只是为开发者提供一个管理浏览器进程的接口。

2. **无头模式支持**  
   虽然 `chrome-launcher` 默认启动的是标准的 Chrome，但可以通过设置 `chromeFlags`（比如 `--headless`）以无界面的无头模式运行 Chrome。无头模式意味着浏览器运行在后台，没有用户界面。

3. **用途**  
   它常用于与其他工具结合，例如：
   - **Lighthouse**：通过无头 Chrome 进行性能、SEO 和可访问性分析。
   - **Puppeteer**：作为浏览器的辅助进程管理工具。
   - **自动化测试**：启动并管理多个浏览器实例。

---

### **示例代码**
以下是 `chrome-launcher` 配合无头模式的基本使用方法：
```javascript
const chromeLauncher = require('chrome-launcher');

(async () => {
    const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });

    console.log(`Chrome debugging port running on ${chrome.port}`);
    await chrome.kill();
})();
```

---

### **`chrome-launcher` vs Puppeteer 的无头模式**
- **`chrome-launcher`**：专注于启动和管理浏览器进程，适合与其他工具（如 Lighthouse）结合使用。
- **Puppeteer**：功能更强大，内置浏览器控制能力，可以直接操作页面 DOM、模拟用户交互、生成截图等。