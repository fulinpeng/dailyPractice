## **1. typeof**

### **功能**
- 返回一个字符串，表示操作数的数据类型。
- 可以检测以下类型：
  - 基本类型：`undefined`、`string`、`number`、`bigint`、`boolean`、`symbol`
  - 对象类型：`object`、`function`

### **语法**
```javascript
typeof operand;
```

### **特点**
- 对于基本类型，`typeof` 能准确返回类型：
  ```javascript
  console.log(typeof 123); // "number"
  console.log(typeof 'hello'); // "string"
  ```
- 对于引用类型（如对象、数组、null），`typeof` 的行为会有一些局限性：
  ```javascript
  console.log(typeof []); // "object"
  console.log(typeof {}); // "object"
  console.log(typeof null); // "object" (特殊情况)
  ```
- 能正确识别函数：
  ```javascript
  console.log(typeof function() {}); // "function"
  ```

### **优缺点**
- **优点**：适合快速判断基本类型，尤其是未初始化的变量或函数类型。
- **缺点**：对于引用类型的区分能力较弱，无法区分数组、普通对象、null 等。

---

## **2. instanceof**

### **功能**
- 用来检测某个对象是否是某个构造函数的实例，依赖原型链来判断。

### **语法**
```javascript
object instanceof Constructor;
```

### **特点**
- 返回 `true` 或 `false`，表示对象是否是构造函数的实例。
- 通过原型链判断：
  ```javascript
  const arr = [];
  console.log(arr instanceof Array); // true
  console.log(arr instanceof Object); // true
  ```
- 对于原生对象和自定义构造函数都有效：
  ```javascript
  function MyClass() {}
  const obj = new MyClass();
  console.log(obj instanceof MyClass); // true
  console.log(obj instanceof Object); // true
  ```
- 不能检测基本类型，因为基本类型没有原型链：
  ```javascript
  console.log(123 instanceof Number); // false
  ```

### **优缺点**
- **优点**：适合检测复杂引用类型，尤其是自定义类和继承关系。
- **缺点**：
  - 无法检测基本类型。
  - 依赖原型链，可能受原型被修改的影响：
    ```javascript
    const obj = new String('hello');
    String.prototype = {};
    console.log(obj instanceof String); // false
    ```

---

## **3. 性能对比**

### **执行机制**
- **`typeof`**：是一个语言内置的操作符，执行效率非常高。
- **`instanceof`**：需要遍历对象的原型链，性能相对较低。

### **性能场景**
- 对基本类型的判断：`typeof` 优于 `instanceof`。
- 对复杂引用类型的判断（尤其涉及继承关系）：只能使用 `instanceof`。

### **示例对比**
```javascript
const iterations = 1e6;
const obj = {};

console.time('typeof');
for (let i = 0; i < iterations; i++) {
  typeof obj === 'object';
}
console.timeEnd('typeof');

console.time('instanceof');
for (let i = 0; i < iterations; i++) {
  obj instanceof Object;
}
console.timeEnd('instanceof');
```

> 结果：在大多数场景下，`typeof` 的性能优于 `instanceof`。

---

## **4. 适用场景对比**

| 特性            | `typeof`                                     | `instanceof`                                |
|------------------|----------------------------------------------|---------------------------------------------|
| 判断基本类型     | ✅ 能正确判断                                | ❌ 无法判断                                |
| 判断 null       | ❌ 返回 "object" (局限性)                    | ❌ 无法判断                                |
| 判断引用类型     | ❌ 只能返回 "object"                         | ✅ 能判断实例关系                          |
| 判断函数         | ✅ 返回 "function"                           | ✅ 如果函数是对象                          |
| 检测继承关系     | ❌ 无法判断                                 | ✅ 支持                                    |
| 性能            | 高                                           | 较低（依赖原型链遍历）                     |

---

## **5. 总结**

- **`typeof`**：
  - 适合快速判断基本类型。
  - 局限性：无法区分具体的对象类型，特别是 `null`。
  - 性能较优。

- **`instanceof`**：
  - 适合检测复杂引用类型及继承关系。
  - 局限性：无法判断基本类型，依赖原型链，可能受原型链修改的影响。
  - 性能较低。

**综合使用建议：**
- 基本类型用 `typeof`。
- 判断对象类型或继承关系用 `instanceof`。