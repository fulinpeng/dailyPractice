requirejs.config({
    baseUrl: "./script/",
    enforceDefine: true,
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery'
    },
});

//Later
// require(['jquery'], function ($) {
//     console.log('获取cdn资源成功', $);
//     //Do something with $ here
// }, function (err) {
//     console.log('errback', err);
//     //The errback, error callback
//     //The error has a list of modules that failed
//     var failedId = err.requireModules && err.requireModules[0];
//     if (failedId === 'jquery') {
//         //undef is function only on the global requirejs object.
//         //Use it to clear internal knowledge of jQuery. Any modules
//         //that were dependent on jQuery and in the middle of loading
//         //will not be loaded yet, they will wait until a valid jQuery
//         //does load.
//         requirejs.undef(failedId);
//         //Set the path to jQuery to local path
//         requirejs.config({
//             paths: {
//                 jquery: 'local/jquery'
//             }
//         });
//         //Try again. Note that the above require callback
//         //with the "Do something with $ here" comment will
//         //be called if this new attempt to load jQuery succeeds.
//         require(['jquery'], function ($) {
//             console.log('Try again，加载本地的jQuery成功', $);
//             // do something...
//         });
//     } else {
//         console.log('cdn加载失败，加载本地的也失败 ... ');
//     }
// });