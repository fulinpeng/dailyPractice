"use strict";
// 类
// public 修饰符 （默认）
//      可以在任何位置使用
// static 修饰符 静态属性
//      哪里都可以访问，只是必须要加上 类名
//      常用来修饰一些扩展方法或者共同的属性，不需要通过实例来访问，可以直接通过对象访问
// protected 修饰符
//      能在声明它的类的派生类中访问
// private 修饰符
//      只能在该类中使用 （不能在声明它的类的外部访问）
// readonly 修饰符
//      只能读不能写了，相当于只有 getter 没有 setter
// 存取器 getter 没有 setter
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
// 继承
//      父类构造器所需参数子类都必须传入
//      注意当继承时，需要调用 super
//      类如果继承了接口，那么在类中必须声明接口中的必选属性
//           只能是类类型接口，非类类型接口只能用implement实现接口
// abstract 抽象类(修饰 抽象类 、抽象属性 、抽象方法)
//      抽象类做为其它派生类的基类使用
//      不能创建一个抽象类的实例
//      抽象方法或属性必须包含 abstract 关键字并且可以包含访问修饰符，放在abstract之前
//      方法在声明的抽象类中不存在，却派生类中实现了，调用该方法时会报错的
//      不同于类类型接口，抽象类可以包含成员的实现细节
// 单例
/////////////////////////////////////////////////
var Parent = /** @class */ (function () {
    function Parent(str) {
        this.name = str;
    }
    return Parent;
}());
// 实现接口
var MySon = /** @class */ (function () {
    function MySon(str, num) {
        // super(str); // 错误，因为这个不是派生类，不能使用 super()，这是实现类接口（接口变成真正的类）
        this.name = str;
        this.age = num;
    }
    return MySon;
}());
var aa = new MySon('aaa', 22);
MySon.prototype.name = 'bb';
console.log('@@@@@@@@@@', aa);
// 所以，那要在ts中修改prototype上面的属性怎么办呢？？？
// 继承
// 允许使用继承来扩展现有的类
// 父类有构造方法，子类也必须提供构造方法
var Animal1 = /** @class */ (function () {
    function Animal1(theName, age) {
        this.name = theName;
        this.age = age;
    }
    Animal1.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal1;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name, age) {
        return _super.call(this, name, age) || this;
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
    function Horse(name, age) {
        return _super.call(this, name, age) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal1));
var sam = new Snake("Sammy the Python", 1);
var tom = new Horse("Tommy the Palomino", 2);
// abstract 抽象类(修饰 抽象类 、抽象属性 、抽象方法)
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
    function AccountingDepartment(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
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
// 单例
var Socket = /** @class */ (function () {
    function Socket() {
        this.name = "yck";
    }
    // 保证了 Socket 只有一个实例，厉害了
    Socket.share = function () {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    };
    return Socket;
}());
// let socket = new Socket() // error 类 Socket 的构造函数是私有的，仅可在类声明中访问
var socket = Socket.share();
console.log(socket.name);
// 类里面创建多个私有属性，然后它们都要有geter和seter方法，怎么办，那不是要写很多个geter及方法吗？
// 类也可以作为interface来用，来申明变量时定义数据类型
