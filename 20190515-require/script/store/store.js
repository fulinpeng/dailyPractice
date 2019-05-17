
define(function(require, exports, module) {
    let data = {
        name: 'store'
    }
    console.log('store模块...');
    exports.getData = function () {
        return data;
    };
});