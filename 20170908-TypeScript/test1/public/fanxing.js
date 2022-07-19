"use strict";
// 泛型
//      组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型
//      不同于使用 any ，它不会丢失信息
// 定义
//      添加了类型变量T。
//      T帮助我们捕获用户传入的类型（比如：number），
//      之后我们就可以使用这个类型把这个版本的identity函数叫做泛型
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
// 第一个好处是让我们的代码能够更好的复用，更好的适用于各种类型
// 第二个好处就是增加了开发速度，原本需要手打的属性现在都有提示了
// T 是自己随意命名的，在某些地方你
// 可以直接传入类型 Array<string>
// 并且在尖括号中如果想声明多个类型也是可以的<T, U>
// 声明好泛型后，你就可以像使用别的类型，一样使用他们
// 使用泛型变量 (如：Array<T>，是内部封装好的，直接用了)
// 泛型类型（这是一个新类型，专为规范函数的参数、返回值 来设定的一个类型，为模块化而生）
//    泛型函数的类型，需要传入类型参数，
//    非泛型函数的类型，是一个一个写好的
// 泛型函数、泛型接口、泛型类
// 都是在普通的函数、接口、类的基础上，抽离原来的类型，用传参的方式来定义内部数据类型 //////
// 泛型约束(例如：)
//    我们想要限制函数去处理任意带有 .length 属性的所有类型。
//    只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。
//    为此，我们需要列出对于T的约束要求。
// 泛型 extends
// 定义泛型类型范围 <T extends string | number>
// 泛型可以继承一个 interface ，实现更好的复用
////////////////////////////////////////////////
// 定义一个泛型函数，有两种执行方式
function identity(s, n, b) {
    // ...
    return s;
}
// 第一种是，传入所有的参数，包含类型参数
var output1 = identity("myString", 100, false);
// 第二种方法更普遍,利用了类型推论（使用推断就只写一边）
var output2 = identity("myString", 100, false);
////////////////////////////////////////////////
// 使用泛型变量
function loggingIdentity1(arg) {
    //   console.log(arg.length); // Error: T doesn't have .length
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length);
    return arg;
}
function loggingIdentity3(arg) {
    console.log(arg.length);
    return arg;
}
function loggingIdentity4(arg) {
    console.log(arg.length);
    return arg;
}
// 泛型函数写法另一种，与上面的不同
function identity2(arg) {
    return arg;
}
var myIdentity = identity2;
var myIdentity2 = identity2; // 也可以使用不同的泛型参数名
///////////////////////////////////////////////
function identity3(arg) {
    return arg;
}
var myIdentity3 = identity3; // 对象字面量来定义泛型函数
var myIdentity4 = identity3; // 泛型接口定义泛型函数
function identity4(arg) {
    return arg;
}
var myIdentity5 = identity4; // 是不是很熟悉，Array<number>,套路是不是出来了
// 把非泛型函数签名作为泛型类型一部分。 当我们使用 GenericIdentityFn的时候，
// 还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。
// 泛型类
var GenericNumber = /** @class */ (function () {
    function GenericNumber(zero) {
        this.zeroValue = zero;
    }
    GenericNumber.prototype.add = function (x, y) {
        console.log(x, y);
    };
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber(1);
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// ????不知道怎么办
function getProperty(obj, key) {
    // return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m");
// 泛型创建工厂函数
function create(c) {
    return new c();
}
// 使用原型属性推断并约束构造函数与类实例的关系
// 并没有推断？？？？？？
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper(hasMask) {
        this.hasMask = hasMask;
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper(nametag) {
        this.nametag = nametag;
    }
    return ZooKeeper;
}());
var Animal2 = /** @class */ (function () {
    function Animal2(numLegs) {
        this.numLegs = numLegs;
    }
    return Animal2;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee(keeper, numLegs) {
        var _this = _super.call(this, numLegs) || this;
        _this.keeper = keeper;
        return _this;
    }
    return Bee;
}(Animal2));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion(keeper) {
        var _this = _super.call(this, 100) || this;
        _this.keeper = keeper;
        return _this;
    }
    return Lion;
}(Animal2));
function createInstance(c) {
    return new c();
}
// createInstance(Lion).keeper.nametag; // typechecks!
// createInstance(Bee).keeper.hasMask; // typechecks!
// 下面类型 T 必须是字符串或者数字
function say(age) {
    return age;
}
var Mine1 = /** @class */ (function () {
    function Mine1(o) {
        this.obj = o;
    }
    return Mine1;
}());
