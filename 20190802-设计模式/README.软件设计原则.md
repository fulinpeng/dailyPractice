### **SOLID原则**
#### 1. **Liskov Substitution Principle（LSP，里氏替换原则）**
> 子类必须能够替代父类，而不影响系统的正常运行。

**案例**：
- 不符合原则：假如父类提供方法 `draw()`，子类重写方法但抛出异常，这违反了 LSP。
- 符合原则：在图形类中，`Rectangle` 和 `Square` 都继承自 `Shape`，并保持接口一致性。

**代码示例**：
```javascript
class Shape {
  area() {
    throw new Error("Must implement");
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() {
    return this.side * this.side;
  }
}
```

---

#### 2. **Interface Segregation Principle（ISP，接口隔离原则）**
> 接口应当尽可能小，类不应被强制实现不需要的接口方法。

**案例**：
- 不符合原则：一个`Bird`接口要求实现 `fly` 和 `swim` 方法，但企鹅不会飞。
- 符合原则：分离接口为 `Flyable` 和 `Swimmable`，企鹅只实现 `Swimmable`。

**代码示例**：
```javascript
class Flyable {
  fly() {}
}
class Swimmable {
  swim() {}
}
class Penguin extends Swimmable {
  swim() {
    console.log("Penguin swims!");
  }
}
```

---

#### 3. **Dependency Inversion Principle（DIP，依赖倒置原则）**
> 高层模块不应该依赖低层模块，二者都应该依赖抽象；抽象不应该依赖具体实现。

**案例**：
- 不符合原则：高层模块直接依赖低层数据库实现。
- 符合原则：使用抽象接口或依赖注入将两者解耦。

**代码示例**：
```javascript
class Database {
  query() {
    throw new Error("Must implement");
  }
}
class MySQLDatabase extends Database {
  query() {
    console.log("Querying MySQL Database");
  }
}
class Application {
  constructor(database) {
    this.database = database;
  }
  run() {
    this.database.query();
  }
}

const app = new Application(new MySQLDatabase());
app.run(); // Output: Querying MySQL Database
```

---

### **其他常见设计原则**
#### 1. **KISS原则（Keep It Simple, Stupid）**
> 尽量保持代码简单，避免不必要的复杂性。

**案例**：
- 不符合原则：实现复杂的嵌套逻辑和不必要的工具类。
- 符合原则：用简单的结构或算法完成需求。

---

#### 2. **DRY原则（Don't Repeat Yourself）**
> 避免代码重复，将通用功能抽取到函数或模块中。

**案例**：
- 不符合原则：多个函数中存在相同逻辑。
- 符合原则：提取重复逻辑为通用工具函数。

---

#### 3. **YAGNI原则（You Aren't Gonna Need It）**
> 不要提前设计或开发不必要的功能，避免浪费资源。

**案例**：
- 不符合原则：预先开发未使用的接口。
- 符合原则：按实际需求进行设计与开发。

---

#### 4. **Law of Demeter（迪米特法则）**
> 一个模块不应直接调用其他模块的内部细节，仅通过公开的接口通信。

**案例**：
- 不符合原则：`a.b.c()` 调用链。
- 符合原则：`a` 通过 `b` 提供的接口调用 `c`。

---

#### 5. **Separation of Concerns（关注点分离）**
> 不同的代码模块应各司其职，避免相互混杂。

**案例**：
- 不符合原则：业务逻辑和视图逻辑写在一起。
- 符合原则：使用 MVC 模式分离数据、业务和视图。
