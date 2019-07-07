
define(function(require, exports, module) {
    var data = {a:1,b:2,c:3};
    var size = module.config().size;
    console.log('amd模块，module.config().size:', size);
    exports.getData = function () {
        return data;
    };
});