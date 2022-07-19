"use strict";
// interface 是 type 的加强版
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function createSquare(config) {
    var newSquare = { color: "white", area: 10 }; // 里面的不需要类型检查了
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black", width: 100 });
// mySquare.color = "red"; // 报错，color是只读属性
console.log(mySquare);
function createSquare2(config) {
    // ...
}
var mySquare2 = createSquare2({ width: 100, extra: "red" }); // 报错，额外的属性检查，extra是额外的通过不了检查
var myArray;
myArray = ["Bob", "Fred"];
myArray = { 1: "a" };
var myArray2;
myArray2 = { 1: "a", a: "a" };
var myStr = myArray[0];
// function fn(o: SearchFunc): boolean {} // 这样是不对的，SearchFunc只适用于函数
// 函数申明的写法
(function fn() {
    return true;
});
// 函数表达式的写法
var mySearch;
mySearch = function (src, sub) {
    // 参数和返回值可以不指定类型，系统会自动匹配
    // 参数名也不需要与上面一致
    var result = src.search(sub);
    return result > -1;
};
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, breed) {
        var _this = _super.call(this, name) || this;
        _this.breed = breed;
        return _this;
    }
    return Dog;
}(Animal));
function createClock(// 相当于一个工厂函数
ctor, // 这是一个类类型
hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
var analog2 = new AnalogClock(7, 32); // 上面是用了一个工厂函数做辅助，这个是直接创建的
var square = {};
// 等同于：
var square2 = {
    color: "red",
    sideLength: 2
};
// 一个对象可以同时做为函数和对象使用，并带有额外的属性
function getCounter() {
    var counter = function (start) { }; // <XXX> 后面一般接一个对象，但是函数也是对象啊
    // 下面将 interval、rest 挂载到counter函数身上（它既是函数也是对象，这是es5里就有的）
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
//////////////////////////////////////////////////////////
// 接口继承类（继承了一个类类型）
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
// 函数兼容性比较，返回值比较
var x1 = function () { return ({ name: "Alice" }); };
var y1 = function () { return ({ name: "Alice", location: "Seattle" }); };
x1 = y1; // OK
// y1 = x1; // Error because x() lacks a location property
var Person = /** @class */ (function () {
    function Person() {
        this.name = "flp";
    }
    return Person;
}());
var My = /** @class */ (function () {
    function My(job) {
        this.name = "flp";
        this.age = 22;
        this.job = job;
    }
    return My;
}());
