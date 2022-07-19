// 写法一：
requirejs.config({
    //To get timely, correct error triggers in IE, force a define/shim exports check.
    enforceDefine: true,
    paths: {
        jquery: [
            'https://cdn.bootcss.com/jquery/3.4.1/jquery.js', // 错误路径，用来测试不成功后拉去本地的
            // 'https://cdn.bootcss.com/jquery/3.4.1/jquery', // 正确路径 不要加 .js 自动加的
            'local/jquery', // If the CDN location fails, load from this location 必须配置这个 不然返回错误：No define call for main
        ]
    }
});
require({
    baseUrl: "./script/",
    paths: {
        // "my": "my/module",
        "some": "some/module",
        "async": "async/module",
        "amd": "amd/module",
        "cdn": "cdn/module",
    },
    waitSeconds: 15,
    // config 为模块配置公共信息
    config: {
        'amd': {
            size: 'large'
        },
        'my/module': {
            color: 'blue'
        }
    },
    // 支持加载CommonJS包
    // 下面定义加载(路径 script/cart/main.js script/store/store.js)
    packages: [
        "cart",
        {
            name: "store",
            main: "store"
        },
    ]
}, ['require', "some", 'cdn', 'async', 'amd'], function (require, someModule, cdn) {
    console.log('加载模块：someModule', someModule);
    let amdModule = require('amd');
    console.log('加载模块：amdModule', amdModule);
    let name = someModule.getName();
    console.log('main文件运行结果：', name);

    // 按需加载
    let btn = document.getElementById('btn_async');
    btn.onclick = function () {
        let res = require('async');
        console.log('按需加载成功：', res);
    }

    // 加载jQuery的CDN
    console.log('加载jQuery结果:', cdn);

});

// 写法二：
// require.config({
//     baseUrl: "./script/",
//     paths: {
//         "my": "my/module",
//         "some": "some/module",
//         "async": "async/module",
//     },
//     waitSeconds: 15
// });
// require(['require', "some", 'async'], function (require, someModule) {
//     console.log('加载模块：someModule', someModule);
//     let name = someModule.getName();
//     console.log('main文件运行结果：', name);

//     // 按需加载
//     let btn = document.getElementById('btn_async');
//     btn.onclick = function () {
//         let res = require('async');
//         console.log('按需加载成功：', res);
//     }
// });

