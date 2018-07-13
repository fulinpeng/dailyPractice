"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function configurable(value) {
    // 这是一个装饰器工厂
    return function(target, propertyKey) {
        //  这是装饰器
        console.log(target, propertyKey);
    };
}
var Hello = /** @class */ (function() {
    function Hello(name) {
        this.name = name;
    }
    __decorate([
        configurable(true)
    ], Hello.prototype, "name", void 0);
    return Hello;
}());