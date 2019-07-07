// 模块在其自身的作用域里执行，而不是在全局作用域里
// 这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的
// TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块
// 类和函数声明可以直接被标记为默认导出。 标记为默认导出的类和函数的名字是可以省略的。
define(["require", "exports", "./module2"], function (require, exports, module2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && exports.numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    exports.ZipCodeValidator = ZipCodeValidator;
    exports.mainValidator = ZipCodeValidator;
    exports.IsAcceptable = module2_1.IsAcceptable;
});
