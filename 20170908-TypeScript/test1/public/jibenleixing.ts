///////////////////////////////////////////////////////
// Number & Bool
let n = 1; // 隐式申明类型
// n = "1"; // 报错
let m: number = 1; // 显式声明类型(浮点型)
m = 2.5;

///////////////////////////////////////////////////////
// bool 类型
let isOk: boolean = true; // 尽量显示申明类型
// isOk=1; // 报错
isOk = false;

///////////////////////////////////////////////////////
// 数组
let arr: number[] = [1];
let list: Array<string> = ["0"];
// list.push(1); // 报错，只能push字符类型
// Tuple 元组
let tuple: [string, number] = ["0", 1];
tuple.push(2); // 长度不限制

///////////////////////////////////////////////////////
// 枚举类型
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;
console.log(c); // 1
// 定义索引
enum Color2 {
  Red = 1,
  Green,
  Blue
}
let c2: Color2 = Color2.Green;
console.log(c2); // 1
// 也可以反着来，通过索引找名字
let enumColor = Color2[1];
console.log(enumColor); // Red
console.log(Color2); // 是一个 很有意思 的对象

///////////////////////////////////////////////////////
// 类型断言
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
console.log(strLength);
// as 语法
let strLength2: number = (someValue as string).length;
console.log(strLength2);
