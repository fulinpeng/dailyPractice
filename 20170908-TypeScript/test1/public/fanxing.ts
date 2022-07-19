// 泛型
//      组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型
//      不同于使用 any ，它不会丢失信息
// 定义
//      添加了类型变量T。
//      T帮助我们捕获用户传入的类型（比如：number），
//      之后我们就可以使用这个类型把下面例子中这个版本的identity函数叫做泛型

// 第一个好处是让我们的代码能够更好的复用，更好的适用于各种类型
// 第二个好处就是增加了开发速度，原本需要手打的属性现在都有提示了

// T 是自己随意命名的，在某些地方你
// 可以直接传入类型 Array<string>
// 并且在尖括号中如果想声明多个类型也是可以的<T, U>
// 声明好泛型后，你就可以像使用别的类型，一样使用他们

// 使用泛型变量 (如：Array<T>，T是泛型变量，Array是构造函数)
// Array<T> 等同于 T[]

// 泛型类型（这是一个新类型，专为规范函数的参数、返回值 来设定的一个类型，为模块化而生）
//    泛型函数的类型，需要传入类型参数，
//    非泛型函数的类型，是一个一个写好的

// 泛型函数、泛型接口、泛型类
// 【都是在普通的函数、接口、类的基础上，抽离原来的类型】，用传参的方式来定义内部数据类型 //////

// 泛型约束(例如：)
//    我们想要限制函数去处理任意带有 .length 属性的所有类型。
//    只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。
//    为此，我们需要列出对于T的约束要求。

// 泛型 extends
// 定义泛型类型范围 <T extends string | number>
// 泛型可以继承一个 interface ，实现更好的复用

////////////////////////////////////////////////
// <S, N, B> 是为了简写 <string, number, boolean>
// 定义一个泛型函数，有两种执行方式
function identity<S, N, B>(s: S, n: N, b: B): S {
  // ...
  return s;
}
let _identity:<S, N, B>(str:S, num:N, boo: B) => S = function(str, num, boo) {
  return str;
}

// 第一种是，传入所有的参数，包含类型参数
let output1 = identity<string, number, boolean>("myString", 100, false);
// 第二种方法更普遍,利用了类型推论（使用推断就只写一边）
let output2 = _identity("myString", 100, false);

////////////////////////////////////////////////
// 使用泛型变量
function loggingIdentity1<T>(arg: T): T {
  //   console.log(arg.length); // Error: T doesn't have .length
  return arg;
}
function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
function loggingIdentity3<T>(arg: Array<T>): T[] {
  console.log(arg.length);
  return arg;
}
// 举一反三：上面的Array可以用其它的接口来代替
interface myArr<T, K> {
  length: T;
  rest: K;
}
function loggingIdentity4<T, K>(arg: myArr<T, K>): myArr<T, K> {
  console.log(arg.length);
  return arg;
}
// 泛型函数写法另一种，与上面的不同
function identity2<T>(arg: T): T {
  return arg;
}
let myIdentity: <T>(arg: T) => T = identity2;
let myIdentity2: <U>(arg: U) => U = identity2; // 也可以使用不同的泛型参数名

///////////////////////////////////////////////
function identity3<T>(arg: T): T {
  return arg;
}
let myIdentity3: { <T>(arg: T): T } = identity3; // 对象字面量来定义泛型函数
// 把上面例子里的对象字面量拿出来做为一个接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity4: GenericIdentityFn = identity3; // 泛型接口定义泛型函数

// 注意，下面的接口写法同上面不一样
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
function identity4<T>(arg: T): T {
  return arg;
}
let myIdentity5: GenericIdentityFn2<number> = identity4; // 是不是很熟悉，Array<number>,套路是不是出来了
// 把非泛型函数签名作为泛型类型一部分。 当我们使用 GenericIdentityFn的时候，
// 还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。

// 泛型类
class GenericNumber<T> {
  constructor(zero: T) {
    this.zeroValue = zero;
  }
  zeroValue: T;
  add(x: T, y: T) {
    console.log(x, y);
  }
}
let myGenericNumber = new GenericNumber<number>(1);

// 泛型约束
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// ????不知道怎么办
function getProperty<T, K>(obj: T, key: K) {
  // return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m");

// 泛型创建工厂函数
function create<T>(c: { new (): T }): T {
  return new c();
}

// 使用原型属性推断并约束构造函数与类实例的关系
// 并没有推断？？？？？？
class BeeKeeper {
  hasMask: boolean;
  constructor(hasMask: boolean) {
    this.hasMask = hasMask;
  }
}
class ZooKeeper {
  nametag: string;
  constructor(nametag: string) {
    this.nametag = nametag;
  }
}
class Animal2 {
  numLegs: number;
  constructor(numLegs: number) {
    this.numLegs = numLegs;
  }
}
class Bee extends Animal2 {
  keeper: BeeKeeper;
  constructor(keeper: BeeKeeper, numLegs: number) {
    super(numLegs);
    this.keeper = keeper;
  }
}
class Lion extends Animal2 {
  keeper: ZooKeeper;
  constructor(keeper: ZooKeeper) {
    super(100);
    this.keeper = keeper;
  }
}
function createInstance<A extends Animal2>(c: new () => A): A {
  return new c();
}
// createInstance(Lion).keeper.nametag; // typechecks!
// createInstance(Bee).keeper.hasMask; // typechecks!

// 下面类型 T 必须是字符串或者数字
function say<T extends string | number>(age: T) {
  return age;
}

// 泛型可以继承一个 interface

interface Type {
  name: string;
  num: number;
}
class Mine1<T extends Type> {
  obj: T;
  constructor(o: T) {
    this.obj = o;
  }
}
