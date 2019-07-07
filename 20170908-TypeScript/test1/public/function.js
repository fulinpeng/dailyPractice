"use strict";
// 为函数定义类型
// 推断类型
/////////////////////////////////////////////////////
// 完整函数类型
// 默认参数
//      当用户没有传递这个参数或传递的值是undefined时，才能触发默认值
// 可选参数
//      可选参数必须跟在必须参数后面
// 剩余参数
//      想同时操作多个参数，或者并不知道会有多少参数传递进来
// this 和 箭头函数 同es6
// type 定义某一类对象
// 返回值 Never
//      void 代表返回 undefined，Never 代表函数不会执行完成，也不会返回任何值
// 重载
//      传入参数的不同会返回两种不同的类型
var myAdd = function (x, y) {
    return x + y;
};
// 参数列表的形式写出参数类型，更具语义化
// 函数类型包含两部分：参数类型和返回值类型，返回值部分不可省略，否则报错
var myAdd1 = function (x, y) {
    return x + y;
};
////////////////////////////////////////////////////
// 推断类型
// 在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型
var myAdd2 = function (x, y) {
    return x + y;
};
var myAdd3 = function (x, y) {
    return x + y;
};
// 剩余参数
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    console.log(restOfName);
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
// 传入参数的不同会返回两种不同的类型
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 }
];
var pickedCard1 = myDeck[pickCard(myDeck)];
var pickedCard2 = pickCard(15);
// 然后你就可以这样写了
var fun;
// never 返回值类型指的是
// 永远不会执行完的函数或者没有返回值的函数
// 那么你可以觉得如下代码是返回 never 类型
function hello() {
    throw Error("111");
}
//error 因为该代码他还是返回了 undefined
// function hello1(): never {
//   console.log("Hello");
// }
