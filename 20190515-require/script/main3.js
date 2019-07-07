
require.config({
    baseUrl: "./script/",
    paths: {
        "async": "async/module",
    },
    waitSeconds: 15
}); 
require(["async"], function (asyncModule) {alert('o ji ba k')
    console.log('加载模块：asyncModule', asyncModule);
    console.log('async文件运行结果：', asyncModule.moduleName);
});
