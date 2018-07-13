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
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
console.log(Direction.Up);
console.log(Direction[1]);

// 计算过的值作为索引
function getSomeValue(val: number) {
  return val * 2 - 1;
}
enum E {
  B, // 必须写在计算值的前面，否则报错
  A = getSomeValue(2) // 计算过的和常量成员
}

// 字符串枚举
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
console.log(Direction2.Up);
console.log(Direction2[0]); // undefined

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}
console.log(BooleanLikeHeterogeneousEnum[0]);
console.log(BooleanLikeHeterogeneousEnum.Yes);

// 枚举的计算的和常量成员
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = "123".length
}
console.log(FileAccess);
