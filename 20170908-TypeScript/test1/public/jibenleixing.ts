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

// Tuple 元组（各元素的类型不必相同的数组）
let tuple: [string, number] = ["0", 1];
// tuple =  [ 1, "0"]; // Error
// tuple[4] = 1; // Error
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
  Green=5,
  Blue
}
let c2: Color2 = Color2.Blue;
console.log('c2:', c2); // 6
// 也可以反着来，通过索引找名字
let enumColor = Color2[1];
console.log(enumColor); // Red
console.log('Color2:', Color2); // 是一个 很有意思 的对象

// Any(可以是任何类型)
// 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库
let anyArr: any[] = [1, true, "free"];
anyArr[1] = 100;
console.log('anyArr:', anyArr); // [1, 100, "free"]

// 你可能认为 Object有相似的作用
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
// 但是Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法
let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// Void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型
function warnUser(): void {
  console.log("This is my warning message");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

let unusable: void = undefined;

// Null 和 Undefined
// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。和void相似
let un: undefined = undefined;
let nu: null = null;
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
// 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自

// Never
// never类型表示的是那些永不存在的值的类型
// never类型是任何类型的子类型，也可以赋值给任何类型
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 即使 any也不可以赋值给never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}
// 返回never的函数存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
// 使用object类型，就可以更好的表示像Object.create这样的API

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

///////////////////////////////////////////////////////
// 类型断言
//    1. 变量声明的时候用 冒号 指定变量使用哪种接口类型、数据类型
//    2. 参数申明的时候用 冒号
//    3. 使用变量时用 尖括号(jsx中使用as)
let someValue: any = "this is a string";
let strLength1: number = someValue.length;
function example(name:string):void {};
let strLength2: number = (<string>someValue).length;
console.log(strLength1, strLength2);
// as 语法
// 【使用JSX时】，只有 as语法断言是被允许的
let strLength3: number = (someValue as string).length;
console.log(strLength3);

// 联合类型

