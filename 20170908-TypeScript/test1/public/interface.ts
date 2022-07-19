// interface 是 type 的加强版

// 接口实质上是一个类，也称接口类

// 可以申明js的任何数据类型

// 使用类型断言 或者 可选属性，处理实际对象属性少于接口属性的情况

// 可选属性
// 只读属性
// 额外的属性检查，
//      处理方式是：添加一个字符串索引签名
// 可索引的类型

// 函数类型
// 类类型
//      接口描述了类的公共部分，而不是公共和私有两部分
//      实现接口
//      当你操作类和接口的时候，你要知道类是具有两个类型的，静态部分的类型和实例的类型

// 继承接口
//      类不能继承接口，你疑虑的那种应该叫做: 实现接口 用implement
// 混合类型

// 接口继承类（继承了一个类，此时该接口类型为: 类类型）

// 兼容性（前面那个必须全面，后面那个可以只实现了部分）
// 类型兼容的两个变量，才能相互赋值操作（对象、函数）
// 对象兼容性比较：
//    要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性
// 函数兼容性比较
//    要比较两个部分：参数部分、返回值部分
//    只比较类型，参数名可以不同
//    右边的函数的参数可以只匹配部分就行了
//    返回值部分：右边必须是目标函数返回值类型的子类型，或相同的类型
// 对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名

///////////////////////////////////////////////////////////////////////////////

interface SquareConfig {
  color: string;
  width?: number; // 可选属性
}
let pp: SquareConfig = {
  color: "white"
}
interface result {
  readonly color: string; // 只读属性
  area: number;
}
function createSquare(config: SquareConfig): result {
  let newSquare = { color: "white", area: 10 }; // 里面的不需要类型检查了
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
let mySquare = createSquare({ color: "black", width: 100 });
// mySquare.color = "red"; // 报错，color是只读属性
console.log(mySquare);
/////////////////////////////////////////////////////////
// 额外的属性检查
// interface SquareConfig2 {
//   width?: number;
// }
// function createSquare2(config: SquareConfig2): void {
//   // ...
// }
// let mySquare2 = createSquare2({ extra: "red", width: 100 }); // 报错，额外的属性检查，extra是额外的通过不了检查

// 添加一个字符串索引签名
interface SquareConfig2 {
  width?: number;
  [extra: string]: any;
}
function createSquare2(config: SquareConfig2): void {
  // ...
}
let mySquare2 = createSquare2({ width: 100, extra: "red" }); // 报错，额外的属性检查，extra是额外的通过不了检查

// 可索引的类型，同上面类似
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
myArray = { 1: "a" };
// myArray = { b: "b" }; // 报错，属性名必须是 number 型
interface StringArray2 {
  [index: number]: string;
  [str: string]: string;
}
let myArray2: StringArray2;
myArray2 = { 1: "a", a: "a" };
let myStr: string = myArray[0];

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// function fn(o: SearchFunc): boolean {} // 这样是不对的，SearchFunc只适用于函数

// 函数申明的写法
<SearchFunc>function fn() {
  return true;
};
// 函数表达式的写法
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  // 参数和返回值可以不指定类型，系统会自动匹配
  // 参数名也不需要与上面一致
  let result = src.search(sub);
  return result > -1;
};

class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}
// 共支持两种索引签名：字符串和数字, 可以同时使用两种类型的索引，
// 但是数字索引的返回值必须是字符串索引返回值类型的子类型
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//   [x: number]: Animal; // 会报错，这没懂什么意思？？？
//   [y: string]: Dog;
// }

// 类类型
// 在接口中描述一个方法，在类里实现它
// 当一个类实现了一个接口时，只对其实例部分进行类型检查。
// constructor存在于类的静态部分，所以不在检查的范围内。
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}
function createClock( // 相当于一个工厂函数
  ctor: ClockConstructor, // 这是一个类类型
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
let analog2 = new AnalogClock(7, 32); // 上面是用了一个工厂函数做辅助，这个是直接创建的

/////////////////////////////////////////////////////////////
// 继承接口
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square = <Square>{};
// 等同于：
let square2: Square = {
  color: "red",
  sideLength: 2
};
// 一个接口可以继承多个接口
interface PenStroke {
  penWidth: number;
}
interface Square2 extends Shape, PenStroke {
  sideLength: number;
}
////////////////////////////////////////////////////////////
// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void; // 类的公共方法
}
// 一个对象可以同时做为函数和对象使用，并带有额外的属性
function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}; // <XXX> 后面一般接一个对象，但是函数也是对象啊
  // 下面将 interval、rest 挂载到counter函数身上（它既是函数也是对象，这是es5里就有的）
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

//////////////////////////////////////////////////////////
// 接口继承类（继承了一个类类型）
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class TextBox extends Control {
  select() {}
}
class Button extends Control implements SelectableControl {
  select() {}
}

// 函数兼容性比较，返回值比较
let x1 = () => ({ name: "Alice" });
let y1 = () => ({ name: "Alice", location: "Seattle" });
x1 = y1; // OK
// y1 = x1; // Error because x() lacks a location property

class Person {
  name: string;
  constructor() {
    this.name = "flp";
  }
}
interface Mine extends Person {
  age: number;
  [key: string]: any;
}
// 类不能继承接口，只能实现接口
// class Mine extends People { // 会报错的
interface People {
  name: string;
}
class My implements Mine {
  name: string;
  age: number;
  job: string;
  constructor(job: string) {
    this.name = "flp";
    this.age = 22;
    this.job = job;
  }
}
