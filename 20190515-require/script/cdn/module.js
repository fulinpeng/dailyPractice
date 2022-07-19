// 使用 cdn 有两种方法

// 方法一：
// 正确的方法在main2.js中，这里的用法有错
// 在errback函数中再次请求
// 但是下面的写法可能有问题，可能是状态没有被监听起来吧，导致有时main.js中的jQ结果是undefined
// 原因：errbacks only work with callback-style require calls, not define() calls. define() is only for declaring modules.
// define(['require'], function (require) {
//     let cdnModule = require('jquery', function ($) {
//         console.log('cdn加载成功:', $);
//         return $
//     }, function (err) {
//         console.log('The errback', err);
//         requirejs.config({
//             paths: {
//                 jquery: 'local/jquery'
//             }
//         });
//         return require(['jquery'], function ($) {
//             console.log('Try again，加载本地的jQuery ... ', $);
//             return $;
//         });
//     })
//     return cdnModule
// });

// 方法二：
// 在 main.js 中配置paths时，数组中再加一条备用的本地路径local/jquery ，然后此处正常加载模块即可
define(['jquery'], function ($) {
    console.log('jQ加载成功', $);
    return $;
})


