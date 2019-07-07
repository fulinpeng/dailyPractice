// 用于给对象在运行期间动态的增加某个功能，职责等。
// 相较通过继承的方式来扩充对象的功能，装饰器显得更加灵活，
// 首先，我们可以动态给对象选定某个装饰器，而不用hardcore继承对象来实现某个功能点。
// 其次：继承的方式可能会导致子类繁多，仅仅为了增加某一个单一的功能点，显得有些多余了。

// 修饰器工厂
function configurable(value: boolean) {
  // 这是一个装饰器工厂
  return function(target: any, propertyKey: string) {
    //  这是装饰器
    console.log(target, propertyKey);
  };
}
class Hello {
  @configurable(true)
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

/// <reference path="..." />
