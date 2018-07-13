"use strict";
///////////////////////////////////////////////////////
// Number & Bool
var n = 1; // 隐式申明类型
// n = "1"; // 报错
var m = 1; // 显式声明类型(浮点型)
m = 2.5;
///////////////////////////////////////////////////////
// bool 类型
var isOk = true; // 尽量显示申明类型
// isOk=1; // 报错
isOk = false;
///////////////////////////////////////////////////////
// 数组
var arr = [1];
var list = ["0"];
// list.push(1); // 报错，只能push字符类型
// Tuple 元组
var tuple = ["0", 1];
tuple.push(2); // 长度不限制
///////////////////////////////////////////////////////
// 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c); // 1
// 定义索引
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Green;
console.log(c2); // 1
// 也可以反着来，通过索引找名字
var enumColor = Color2[1];
console.log(enumColor); // Red
console.log(Color2); // 是一个 很有意思 的对象
///////////////////////////////////////////////////////
// 类型断言
// 尖括号 语法
var someValue = "this is a string";
var strLength = someValue.length;
console.log(strLength);
// as 语法
var strLength2 = someValue.length;
console.log(strLength2);
