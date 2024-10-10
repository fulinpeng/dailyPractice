####  类型别名和接口之间的区别
- 在大多数情况下你可以在它们之间自由选择
- 类型不能添加新的属性，不能再次定义
- interface可以extends，type用&
- interface可以多次定义来添加属性，type创建后不能更改
- type 是别名，后面跟类型，interface是接口后面跟接口值
    ```ts
    type Name = string; // 跟类型
    type Resolver = () => string; // 跟类型

    // 跟接口值
    interface Res = {
        name: Name,
        resolver: Resolver
    }
    ```
#### declare
- declare 关键字可以描述以下类型。
    - 变量（const、let、var 命令声明）
    - type 或者 interface 命令声明的类型
    - class
    - enum
    - 函数（function）
    - 模块（module）
    - 命名空间（namespace）
    - declare 关键字的重要特点是，它只是通知编译器某个类型是存在的，不用给出具体实现。
- declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构
- 同样，所有 declare 语句都不会出现在编译后的文件里面
- 只能在全局使用
#### 函数重载
- 函数重载与参数个数和参数类型/排列顺序有关
- 不关注返回值
```ts
function showPerson(name: string): void;
function showPerson(age: number): void;
function showPerson(play: () => void): void;
function showPerson(...args) {
    console.log(args);
    // 根据函数类型和数量作出不同的行为
}
showPerson(22);
```
#### 非空断言
```ts
const aa: null | number = null;
aa!.toFixed()
```
#### 实现interface
```ts
interface Checkable {
    check(name: string): boolean;
    y: number
}

class NameChecker implements Checkable {
    check(s) { // 居然没报错，这里跟 NameChecker2 一样，会推断为any，因为implements不会改变class的body的类型推断方式
        //   Parameter 's' implicitly has an 'any' type.
        // Notice no error here
        return s.toLowerCase() === "ok";
    }
}
class NameChecker2 {
    check(s) {
        //   Parameter 's' implicitly has an 'any' type.
        // Notice no error here
        return s.toLowerCase() === "ok";
    }
}
const c = new NameChecker();
c.y = 10; // err:: Property 'y' does not exist on type 'NameChecker'.
```
#### class继承
```ts
class Base {
    greet() {
        console.log("Hello, world!");
    }
    s: string;
}

class Derived extends Base {
    greet(name?: string) {
        if (name === undefined) {
            // super.greet();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}

const d = new Derived();
d.greet(); // Hello, world!
d.greet("reader"); // Hello, READER

// Alias the derived instance through a base class reference
const b: Base = d; // 子类实例可以赋值给父类
b.s = "s";
```
#### 类继承时初始化顺序
1. Base的原型属性先初始化
2. Base的constructor执行
3. Derived的原型属性先初始化
4. Derived的constructor执行
```ts
class Base {
    name = "base";
    constructor() {
        // 子类的constructor先执行
        console.log("My name is " + this.name);
    }
}

class Derived extends Base {
    name = "derived";
}

// Prints "base", not "derived"
const d = new Derived(); // base
```
所以，
```ts
interface Dog {
    breed: any;
}

class AnimalHouse {
    // resident: Animal; // 放开就不报错
    constructor(animal: Animal) {
        this.resident = animal; // err:: Property 'resident' does not exist on type 'AnimalHouse'.
    }
}
```
#### 成员可见性
- public 公开的
- protected 受保护的，子类可见，外部不可读写
    - 子类也需要加上 protected ，否则子类的实例让然可以读写
- private 私有的
    - 只有申明该成员的类可以访问，外部和实例均不可访问
    - s["secretKey"]，可以访问
    ```ts
    class Base {
        private x = 0;
    }
    const b = new Base();
    class Derived extends Base {
        constructor() {
            super()
            console.log(b.x); // err:: Property 'x' is private and only accessible within class 'Base'.
            console.log(b['x']); // 不报错
        }
    }
    // Can't access from outside the class
    console.log(b.x); // err:: roperty 'x' is private and only accessible within class 'Base'.
    console.log(b['x']); // 不报错
    ```
    - static members can also use the same public, protected, and private visibility modifiers
    - static 成员也可以被继承
    - 特殊静态成员不能定义：name, length, and call aren’t valid to define as static members
    - ts/js没有静态类，也不需要，we don’t need a “static class” syntax in TypeScript because a regular object (or even top-level function) will do the job just as well
        - 什么是静态
            1. 只能包含静态成员（静态方法或静态变量），非静态成员是不能使用的，而非静态类可以包含静态的方法、字段、属性或事件，且无论对这个非静态类创建多少个实例，它的静态成员都只有一个
            2. 不能对其实例化
            3. 不能被继承，因为静态类本质是一个抽象的密封类
            4. 不能包含实例构造函数
    - 静态类型不能设置范型
        - 范型的具体类型是js执行时确定的
        - 静态类型是属于类的，直接通过类来获取或调用静态类型是拿不到具体类型的
- block in class class的块级作用域
    ```ts
    class Foo {
        static #count = 0;
        get count() {
            return Foo.#count;
        }
        static {
            try {
                const lastInstances = [1, 2, 3];
                Foo.#count += lastInstances.length;
            } catch {}
        }
    }
    Foo.count++; // err:: Property 'count' does not exist on type 'typeof Foo'.ts(2339)
    ```
    - Blocks in Classes 和 protect区别???
- this
    - class中的this指向实例对象
    - 的类型可以在function中第一个参数定义
    ```ts
    type SomeType = {
        a: string;
        b: number;
    };

    function fn(this: SomeType, x: number) {
        /* ... */
    }
    fn(2); // err:: The 'this' context of type 'void' is not assignable to method's 'this' of type 'SomeType'.
    fn.call({ a: "a", b: 2 }, 2);
    ```

#### constructor参数中的类型修饰符有什么用
- 可以将构造函数参数转换为具有相同名称和值的类属性。这些属性称为参数属性，通过在构造函数参数前加上可见性修饰符public、private、protected或readonly之一来创建。实例中各字段也受这些修饰符的约束
    ```ts
    class Params {
    constructor(public readonly x: number, protected y: number, private z: number) {
            // No body necessary
        }
    }
    const a = new Params(1, 2, 3);
    console.log(a.x);
    console.log(a.z); // err:: Property 'z' is private and only accessible within class 'Params'.
    ```
#### ts中 is 和 as 区别???
- is是类型保护，as是类型断言
- 具体呢???
#### InstanceType
- 定义实例类型，也就是constructor的签名
    ```ts
    class Point {
        createdAt: number;
        x: number;
        y: number;
        constructor(x: number, y: number) {
            this.createdAt = Date.now();
            this.x = x;
            this.y = y;
        }
    }
    // InstanceType:: type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any
    type PointInstance = InstanceType<typeof Point>;

    function moveRight(point: PointInstance) {
        point.x += 5;
    }

    const point = new Point(3, 4);
    moveRight(point);
    point.x; // => 8

    ```
#### abstract Classes and Members
```ts
// 抽象类
abstract class Base {
    abstract getName(): string; // 抽象方法
    printName() {
        console.log("Hello, " + this.getName());
    }
}

// const b = new Base();
class Derived extends Base {
    getName(): string {
        // 抽象方法，必须在子类中实现
        return "";
    }
}

function greet(ctor: new () => Base) {// 这里不能用 ctor: new () => typeof Derived
    const instance = new ctor();
    instance.printName();
}
greet(Derived);
greet(Base); // err:: 抽象类不能实例化
```
#### Relationships Between Classes
- 不同类可以相互赋值
    ```ts
    class Point1 {
        x = 0;
        y = 0;
    }
    class Point2 {
        x = 0;
        y = 0;
        z = 1;
    }
    // OK
    const p: Point1 = new Point2();
    const p2: Point2 = new Point1(); // err:: Property 'z' is missing in type 'Point1' but required in type 'Point2'.
    ```
    
- 空class
    ```ts
    class Empty {}
    function fn(x: Empty) {
        // can't do anything with 'x', so I won't
    }
    // All OK!
    fn(window);
    fn({});
    fn(fn);
    fn([]);
    fn(null);
    fn(undefined);
    fn(any); // err:: 'any' only refers to a type, but is being used as a value here.ts
    fn(unknown); // err:: 'any' only refers to a type, but is being used as a value here.ts
    ```
#### 工具类
- Awaited
    ```ts
    type A = Awaited<Promise<string>>;
    type B = Awaited<Promise<Promise<number>>>;
    type C = Awaited<boolean | Promise<number>>;
    ``` 
- Partial 返回类型的子集
    ```ts
    interface Todo {
        title: string;
        description: string;
    }
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        return { ...todo, ...fieldsToUpdate };
    }
    const todo1 = {
        title: "organize desk",
        description: "clear clutter",
    };
    const todo2 = updateTodo(todo1, {
        description: "throw out trash",
    });
    ```
    - 实现Partial
    ```ts
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }
    type MyPick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    type TodoPreview = MyPick<Todo, "title" | "completed">;

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
    ```
- infer
    ```ts
    onst fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
    };
    // infer拆解函数返回值类型
    type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
    type returnType = MyReturnType<typeof fn>;

    // infer拆解promise返回值类型
    type MyResponse = Promise<number[]>;
    type Unpacked<T> = T extends Promise<infer R> ? R : T;
    type resType = Unpacked<MyResponse>; // resType 类型为number[]

    // 递归获取多层promise返回值
    type promisesType = Promise<Promise<Promise<number>>>;
    type recursion<T> = T extends Promise<infer R> ? recursion<R> : T; // 递归
    type resType2 = recursion<promisesType>; // resType2 类型为number

    // 推断对象属性类型
    type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
    type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
    type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number

    // 递归实现数组反转后的类型
    type ReverseArray<T extends unknown[]> = T extends [infer First, ...infer Rest]
    ? [...ReverseArray<Rest>, First]
    : T;
    type Value = ReverseArray<[1, 2, 3, 4]>; // [4,3,2,1]
    ```
- Requrie<T>
    - 返回一个类型，包含T所有字段且必传
    - The opposite of Partial.
- Readonly<T>
    - 返回一个类型，包含T所有字段且只读
- Record<Keys, Type>
    - 返回一个对象类型，其属性键为Keys，属性值为Type
    ```ts
    interface CatInfo {
        age: number;
        breed: string;
    }

    type CatName = "miffy" | "boris" | "mordred";

    const cats: Record<CatName, CatInfo> = {
        miffy: { age: 10, breed: "Persian" },
        boris: { age: 5, breed: "Maine Coon" },
        mordred: { age: 16, breed: "British Shorthair" },
    };

    cats.boris;
    ```
- Exclude<T, K>
    - 实现Exclude<T, K>
    ```ts
    type MyExclude<T, K> = T extends K ? never : T;
    type T0 = MyExclude<"a" | "b" | "c", "a">;
    ```

- Pick<T, K>
    - 实现Pick<T, K>
    ```ts
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }
    
    // type TodoPreview = Pick<Todo, "title" | "completed">;
    type MyPick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    
    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
    
    ```
- Omit<T, K>
    - 实现Omit<T, K>
    ```ts
    interface Todo {
        title: string;
        text: string;
        description: string;
        completed: boolean;
    }
    // 和Pick相反
    type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    type TodoPreview = MyOmit<Todo, "description" | "title">;
    const todo: TodoPreview = {
        text: "",
        completed: false,
    };
    ```
- NonNullable<T>
    - 返回一个类型，不包含空类型
    ```ts
    type MyNonNullable<T> = T extends null ? never : T;
    type T0 = MyNonNullable<string | number | undefined | null | never>; // string | number
    ```
- Parameters<F>
    - 返回F函数的参数列表
    ```ts
    declare function f1(arg: { a: number; b: string }): void;
    // 实现Parameters
    type MyParameters<F> = F extends (...args: infer R) => any ? R : any;
    type T0 = Parameters<() => string>; // type T0 = []
    type T1 = MyParameters<(s: string) => void>; // type T1 = [s: string]
    ```
- ConstructorParameters<T>
    - T为 `typeof 类`
    ```ts
    class C {
        constructor(a: number, b: string) {}
    }
    type MyConstructorParameters<C> = C extends (...args: infer R) => any ? R : never;
    type T3 = ConstructorParameters<typeof C>; // typeof C 返回 constructor 类型
    type Params = MyConstructorParameters<typeof C>;
    ```
- ThisParameterType<T>
    - 获取函数参数列表中的this
    - T 是 `typeof 函数`
```ts
function toHex(this: Number) {
    return this.toString(16);
}
type MyThisParameterType<T> = T extends (this: infer R, ...rest: any[]) => any ? R : unknown;
// typeof toHex 是： (this: Number) => string
function numberToString(n: MyThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}
```
#### any unknown never void null undefined
- any，跳过所有ts检查，可以随便赋值跟js变量一样
    - any可以赋值给任何类型
    - 也可以接收任何类型
- unknown是更安全的any，在任何any适用的场景，都应该优先使用unknown
    - unknown类型只能赋值给unknown类型
    - 可以接收任何类型
- never是ts底层类型
    - 一个函数永远不会有返回值，或只会抛出错误的函数，返回值类型用never
- void其实可以理解为null和undefined的联合类型
    - 一般表示函数没有return语句 // （函数体不是死循环，且能执行到最后）
- null/undefined
    - null类型指的是js的null的类型
    - undefined类型指的是js的undefined的类型
    - 开启`--strictNullChecks`后，null/undefined类型只能接受unknown/any类型