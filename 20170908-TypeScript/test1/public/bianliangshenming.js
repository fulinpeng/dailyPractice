"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
// let
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        // console.log(i);
    }, 100 * i);
}
// 数组解构
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first); // 1
console.log(second); // 2
// 对象解构
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
// 需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块
(_a = { a: "baz", b: 101 }, a = _a.a, b = _a.b);
// 数组 展开
var first1 = [1, 2];
var second1 = [3, 4];
var bothPlus = [0].concat(first1, second1, [5]);
// 对象 展开
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({}, defaults, { food: "rich" });
// 仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
var C = /** @class */ (function () {
    function C() {
        this.p = 12;
    }
    C.prototype.m = function () { };
    return C;
}());
var cc = new C();
var clone = __assign({}, cc);
clone.p; // ok
//   clone.m(); // error!
