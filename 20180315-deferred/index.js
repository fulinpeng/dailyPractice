// var defer = $.Deferred(); //新建一个Deferred对象
// var wait = function (defer) {
//     var tasks = function () {
//         console.log('执行完毕！');
//         defer.reject('数据读取失败11'); //改变Deferred对象的执行状态 - 失败
//     };
//     setTimeout(tasks, 1000);
//     return defer;
// };
// $.when(wait(defer))
//     .done(function (res) {
//         console.log('数据读取成功');
//     })
//     .fail(function (err) {
//         console.log(err);
//     });


// var defer = $.Deferred(); //新建一个Deferred对象
// var wait = function (defer) {
//     var tasks = function () {
//         console.log('执行完毕！');
//         defer.resolve('数据读取成功22'); //改变Deferred对象的执行状态 - 成功
//     };
//     setTimeout(tasks, 2000);
//     return defer.promise();
// };
// $.when(wait(defer)).done(function (res) {
//     console.log(res);
// }).fail(function () {
//     console.log('数据读取失败');
// });

// 普通方法
// var wait = function () {
//     var defer = $.Deferred(); //新建一个Deferred对象
//     var tasks = function () {
//         console.log('执行完毕！');
//         defer.resolve('数据读取成功33'); //改变Deferred对象的执行状态 - 成功
//     };
//     setTimeout(tasks, 2000);
//     return defer.promise();
// };
// $.when(wait()).done(function (res) {
//     console.log(res);
// }).fail(function () {
//     console.log('数据读取失败');
// });




// 执行异步
var setAjax = function () {
    var defer = $.Deferred();
    if (xhr) {
        xhr.abort();
        xhr = null;
    }
    var xhr = $.ajax({
        url: 'test.html',
        success: function (res) {
            defer.resolve(res);
        },
        error: function (err) {
            console.log('数据读取失败');
            defer.reject(err);
        }
    });
    return defer.promise();
}
$.when(setAjax()).then(function (res) {
    console.log('数据读取成功', res);
}, function (err) {
    console.log(err);
});