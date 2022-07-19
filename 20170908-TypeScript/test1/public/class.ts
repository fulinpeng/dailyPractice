// 类
// public 修饰符 （默认）
//      可以在任何位置使用
// static 修饰符 静态属性
//      哪里都可以访问，只是必须要加上 类名
//      常用来修饰一些扩展方法或者共同的属性，不需要通过实例来访问，可以直接通过对象访问
// protected 修饰符
//      能在声明它的类的派生类中访问
// private 修饰符
//      只能在该类中使用 （不能在声明它的类的外部访问）
// readonly 修饰符
//      只能读不能写了，相当于只有 getter 没有 setter
// 存取器 getter 没有 setter

// 继承
//      父类构造器所需参数子类都必须传入
//      注意当继承时，需要调用 super
//      类如果继承了接口，那么在类中必须声明接口中的必选属性
//           只能是类类型接口，非类类型接口只能用implement实现接口

// abstract 抽象类(修饰 抽象类 、抽象属性 、抽象方法)
//      抽象类做为其它派生类的基类使用
//      不能创建一个抽象类的实例
//      抽象方法或属性必须包含 abstract 关键字并且可以包含访问修饰符，放在abstract之前
//      方法在声明的抽象类中不存在，却派生类中实现了，调用该方法时会报错的
//      不同于类类型接口，抽象类可以包含成员的实现细节

// 单例

/////////////////////////////////////////////////
class Parent {
  name: string;
  constructor(str: string) {
    this.name = str;
  }
}
interface Son extends Parent {
  age: number;
}
// 实现接口
class MySon implements Son {
  name: string;
  age: number;
  constructor(str: string, num: number) {
    // super(str); // 错误，因为这个不是派生类，不能使用 super()，这是实现类接口（接口变成真正的类）
    this.name = str;
    this.age = num;
  }
}
const aa = new MySon('aaa', 22);
MySon.prototype.name = 'bb';
console.log('@@@@@@@@@@', aa);
// 所以，那要在ts中修改prototype上面的属性怎么办呢？？？

// 继承
// 允许使用继承来扩展现有的类
// 父类有构造方法，子类也必须提供构造方法
class Animal1 {
  protected name: string;
  private age: number;
  static weight: Number;
  constructor(theName: string, age: number) {
    this.name = theName;
    this.age = age;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal1 {
  constructor(name: string, age: number) {
    super(name, age);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    // es6中 super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
    super.move(distanceInMeters);
  }
}
class Horse extends Animal1 {
  constructor(name: string, age: number) {
    super(name, age);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}
let sam = new Snake("Sammy the Python", 1);
let tom: Animal1 = new Horse("Tommy the Palomino", 2);

// abstract 抽象类(修饰 抽象类 、抽象属性 、抽象方法)
abstract class Department {
  protected abstract age: number;
  constructor(public name: string) {}
  // 可以包含成员的实现细节:
  printName(): void {
    console.log("Department name: " + this.name);
  }
  // 抽象方法必须包含 abstract 关键字，并且可以包含访问修饰符
  abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
  age: number;
  constructor(name: string, age: number) {
    super(name); // 在派生类的构造函数中必须调用 super()
    this.age = age;
  }
  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
  //   调用该方法时会报错的，在抽象类中没有定义该方法
  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

// 单例
class Socket {
  // 修饰符还可以用两次！！！
  private static instance: Socket; // instance(Socket的实例)
  name: string;
  private constructor() {
    this.name = "yck";
  }
  // 保证了 Socket 只有一个实例，厉害了
  static share() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }
}
// let socket = new Socket() // error 类 Socket 的构造函数是私有的，仅可在类声明中访问
let socket = Socket.share();
console.log(socket.name);

// 类里面创建多个私有属性，然后它们都要有geter和seter方法，怎么办，那不是要写很多个geter及方法吗？
// 类也可以作为interface来用，来申明变量时定义数据类型