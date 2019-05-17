define('my/module', ['module',"cart", "store",], function (module, cart, store) {
    // 模块名必须和path配置的一致
    // 没有配置path的话，要写正确的路径作为名字
    // 有模块名字时，必须加上依赖，没有依赖传空数组
    console.log('加载模块my...');
    var color = module.config().color;
    console.log('my模块，module.config().color:', color);
    console.log('cart, store', cart, store);
    return {
        name: 'flp',
        age: 22,
    }
});

// define(function () {
//     return {
//         name: 'flp',
//         age: 22,
//     }
// });

// define({
//     name: 'flp',
//     age: 22,
// });

