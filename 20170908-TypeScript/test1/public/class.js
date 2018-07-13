"use strict";
// 类
// 继承
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// public 修饰符 （默认）
// private 修饰符
// protected 修饰符
// readonly 修饰符
// 存取器
// static 修饰符 静态属性
// abstract 抽象类
//      抽象类做为其它派生类的基类使用。
//      它们一般不会直接被实例化
//      不同于类类型接口，抽象类可以包含成员的实现细节
//      抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
//      不能创建一个抽象类的实例
//      方法在声明的抽象类中不存在，却派生类中实现了，调用该方法时会报错的
/////////////////////////////////////////////////
// 类
var class1 = /** @class */ (function () {
    function class1() {
    }
    return class1;
}());
// 继承
// 允许使用继承来扩展现有的类
var Animal1 = /** @class */ (function () {
    function Animal1(theName) {
        this.name = theName;
    }
    Animal1.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal1;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        // es6中 super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal1));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal1));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
// abstract 抽象类
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    // 可以包含成员的实现细节:
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("The Accounting Department meets each Monday at 10am.");
    };
    //   调用该方法时会报错的，在抽象类中没有定义该方法
    AccountingDepartment.prototype.generateReports = function () {
        console.log("Generating accounting reports...");
    };
    return AccountingDepartment;
}(Department));
