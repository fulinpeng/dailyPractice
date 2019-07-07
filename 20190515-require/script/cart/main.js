
define(function(require, exports, module) {
    let data = {
        name: 'cart'
    }
    console.log('cart模块...');
    exports.getData = function () {
        return data;
    };
});