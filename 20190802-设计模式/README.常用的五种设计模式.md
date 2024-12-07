最常用的五种设计模式：  

---

### 1. **单例模式 (Singleton Pattern)**  
**目的**：保证一个类仅有一个实例，并提供全局访问点。  
**场景**：配置管理器、数据库连接池等。

**示例**：  
```javascript
class Singleton {
  constructor(name) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.name = name;
    Singleton.instance = this;
  }
  getName() {
    return this.name;
  }
}

// 使用
const instance1 = new Singleton("First Instance");
const instance2 = new Singleton("Second Instance");
console.log(instance1 === instance2); // true
```

---

### 2. **工厂模式 (Factory Pattern)**  
**目的**：定义一个用于创建对象的接口，而不指定具体类。  
**场景**：需要多个类似对象，但不希望直接实例化它们。

**示例**：  
```javascript
class Car {
  constructor(name) {
    this.name = name;
  }
}

class CarFactory {
  static createCar(type) {
    switch (type) {
      case "sedan":
        return new Car("Sedan Car");
      case "suv":
        return new Car("SUV Car");
      default:
        return new Car("Generic Car");
    }
  }
}

// 使用
const sedan = CarFactory.createCar("sedan");
console.log(sedan.name); // "Sedan Car"
```

---

### 3. **观察者模式 (Observer Pattern)**  
**目的**：定义对象间一对多依赖，当一个对象状态改变时，所有依赖者都会收到通知并自动更新。  
**场景**：事件监听器、发布订阅系统。

**示例**：  
```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  attach(observer) {
    this.observers.push(observer);
  }
  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`${this.name} received data: ${data}`);
  }
}

// 使用
const subject = new Subject();
const observer1 = new Observer("Observer1");
const observer2 = new Observer("Observer2");
subject.attach(observer1);
subject.attach(observer2);
subject.notify("Event happened");
```

---

### 4. **策略模式 (Strategy Pattern)**  
**目的**：定义一系列算法，将它们封装起来，并使它们可以互相替换。  
**场景**：需要动态切换算法，或者需要多种算法的场合。

**示例**：  
```javascript
class StrategyA {
  execute() {
    console.log("Strategy A executed");
  }
}

class StrategyB {
  execute() {
    console.log("Strategy B executed");
  }
}

class Context {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  executeStrategy() {
    this.strategy.execute();
  }
}

// 使用
const context = new Context();
context.setStrategy(new StrategyA());
context.executeStrategy(); // "Strategy A executed"
context.setStrategy(new StrategyB());
context.executeStrategy(); // "Strategy B executed"
```

---

### 5. **装饰器模式 (Decorator Pattern)**  
**目的**：动态地为对象添加职责，而不改变其接口。  
**场景**：需要扩展功能而不修改已有代码。

**示例**：  
```javascript
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 1;
  }
}

// 使用
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 8
```

---

### **总结**
- **单例模式**：控制实例数量。  
- **工厂模式**：简化对象创建逻辑。  
- **观察者模式**：实现事件驱动机制。  
- **策略模式**：动态切换算法。  
- **装饰器模式**：动态扩展对象功能。  
