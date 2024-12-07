const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");

async function runLighthouse(url) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance", "accessibility", "seo"], // 可根据需求调整
        port: chrome.port,
    };
    const runnerResult = await lighthouse(url, options);

    // 获取报告的 HTML 输出
    const reportHtml = runnerResult.report;

    // 保存报告到本地文件
    fs.writeFileSync("lighthouse-report.html", reportHtml);

    console.log("Report is generated for", url);
    console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
}

// 替换为你想分析的 URL
runLighthouse("https://baidu.com");
