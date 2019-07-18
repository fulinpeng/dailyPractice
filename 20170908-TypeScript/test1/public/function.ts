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
let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
// 参数列表的形式写出参数类型，更具语义化
// 函数类型包含两部分：参数类型和返回值类型，返回值部分不可省略，否则报错
let myAdd1: (baseValue: number, increment: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
////////////////////////////////////////////////////
// 推断类型
// 在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型
// 所以就有两种写法
let myAdd2 = function(x: number, y: number): number {
  return x + y;
};
let myAdd3: (baseValue: number, increment: number) => number = function(x, y) {
  return x + y;
};

// 定义函数类型(变量)有两种方式：
//  1. => 方式
//  2. function 方式
let func1: (x: string) => string = function (xx) {
  return xx;
};
function func2(x: string): string {
  return x;
}

// 剩余参数
function buildName(firstName: string, ...restOfName: string[]) {
  console.log(restOfName);
  return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

// 传入参数的不同会返回两种不同的类型
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
let pickedCard2 = pickCard(15);

// 现在又有个需求，我需要声明10个这样类型的变量
// let fun: (a: number, b: number) => number
// let fun2: (a: number, b: number) => number
// let fun3: (a: number, b: number) => number

// 这样写类型就太累了，我们可以给类型取个别名
type sumType = (a: number, b: number) => number;
// 然后你就可以这样写了
let fun: sumType;
let fun2: sumType;
let fun3: sumType;

// never 返回值类型指的是
// 永远不会执行完的函数或者没有返回值的函数
// 那么你可以觉得如下代码是返回 never 类型
function hello(): never {
  throw Error("111");
}
//error 因为该代码他还是返回了 undefined
// function hello1(): never {
//   console.log("Hello");
// }
