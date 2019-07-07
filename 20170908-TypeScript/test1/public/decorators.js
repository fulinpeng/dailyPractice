"use strict";
// 用于给对象在运行期间动态的增加某个功能，职责等。
// 相较通过继承的方式来扩充对象的功能，装饰器显得更加灵活，
// 首先，我们可以动态给对象选定某个装饰器，而不用hardcore继承对象来实现某个功能点。
// 其次：继承的方式可能会导致子类繁多，仅仅为了增加某一个单一的功能点，显得有些多余了。
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 修饰器工厂
function configurable(value) {
    // 这是一个装饰器工厂
    return function (target, propertyKey) {
        //  这是装饰器
        console.log(target, propertyKey);
    };
}
var Hello = /** @class */ (function () {
    function Hello(name) {
        this.name = name;
    }
    __decorate([
        configurable(true)
    ], Hello.prototype, "name", void 0);
    return Hello;
}());
/// <reference path="..." />
