"use strict";
// 枚举
// 注意是等号连接哦，是 : 的话，那不就是对象了吗
// 数字枚举
// 字符串枚举
//      字符串枚举没有自增长的行为，字符串枚举可以 很好的序列化
// 异构枚举（Heterogeneous enums）
//      混合字符串和数字成员
//      不推荐这么做
// 计算的和常量成员
//      枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0
//      不带有初始化器且它之前的枚举成员是一个 数字常量,值为它上一个枚举成员的值加1。
//      枚举成员使用 常量枚举表达式初始化
//          一个枚举表达式字面量（主要是字符串字面量或数字字面量）
//          一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
//          带括号的常量枚举表达式
//          一元运算符 +, -, ~其中之一应用在了常量枚举表达式
//          常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象
//          若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错
// 运行时的枚举
//      枚举是在运行时真正存在的对象
// 反向映射
//      除了创建一个以属性名做为对象成员的对象之外，
//      数字枚举成员还具有了反向映射，从枚举值到枚举名字。
// 还不知道有什么用
// const枚举 (常量枚举)
// 外部枚举
/////////////////////////////////////////////////
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up);
console.log(Direction[1]);
// 计算过的值作为索引
function getSomeValue(val) {
    return val * 2 - 1;
}
var E;
(function (E) {
    E[E["B"] = 0] = "B";
    E[E["A"] = getSomeValue(2)] = "A"; // 计算过的和常量成员
})(E || (E = {}));
// 字符串枚举
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "UP";
    Direction2["Down"] = "DOWN";
    Direction2["Left"] = "LEFT";
    Direction2["Right"] = "RIGHT";
})(Direction2 || (Direction2 = {}));
console.log(Direction2.Up);
console.log(Direction2[0]); // undefined
var BooleanLikeHeterogeneousEnum;
(function (BooleanLikeHeterogeneousEnum) {
    BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
    BooleanLikeHeterogeneousEnum["Yes"] = "YES";
})(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
console.log(BooleanLikeHeterogeneousEnum[0]);
console.log(BooleanLikeHeterogeneousEnum.Yes);
// 枚举的计算的和常量成员
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
console.log(FileAccess);
