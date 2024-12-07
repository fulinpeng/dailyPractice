将一个不纯的函数改成纯函数的核心是**消除外部依赖和副作用**，使其输入与输出完全确定。

---

### **1. 识别副作用**
#### 常见副作用：
- 修改外部状态（如全局变量）。
- 使用非确定性函数（如 `Math.random()` 或 `Date.now()`）。
- 执行 I/O 操作（如读写文件、发起网络请求）。

**示例：不纯函数**
```javascript
let count = 0;

function increment() {
    count++; // 修改外部状态
    return count;
}
```

---

### **2. 消除对外部状态的依赖**
将函数所需的所有依赖项通过参数传递，而不是直接访问外部变量。

**改为纯函数：**
```javascript
function increment(currentCount) {
    return currentCount + 1;
}

// 使用时显式传入状态
let count = 0;
count = increment(count); // 1
```

---

### **3. 移除非确定性操作**
将非确定性操作（如生成随机数、获取当前时间）外置，并作为参数传递。

**示例：不纯函数**
```javascript
function generateRandomId() {
    return `id-${Math.random()}`;
}
```

**改为纯函数：**
```javascript
function generateRandomId(randomNumber) {
    return `id-${randomNumber}`;
}

// 调用时传入生成的随机数
const randomId = generateRandomId(Math.random());
```

---

### **4. 避免直接修改传入参数**
使用不可变数据结构或返回新值代替修改原值。

**示例：不纯函数**
```javascript
function addToArray(arr, value) {
    arr.push(value); // 修改了传入参数
    return arr;
}
```

**改为纯函数：**
```javascript
function addToArray(arr, value) {
    return [...arr, value]; // 返回一个新数组
}
```

---

### **5. 将副作用集中管理**
将无法避免的副作用（如网络请求、日志打印）提取到外部调用方管理。

**示例：不纯函数**
```javascript
function fetchData(url) {
    console.log(`Fetching data from ${url}`);
    return fetch(url).then(response => response.json());
}
```

**改为纯函数：**
```javascript
function formatResponse(response) {
    return response.data;
}

// 副作用管理由调用方完成
const url = "https://api.example.com/data";
fetch(url)
    .then(response => response.json())
    .then(formatResponse)
    .then(data => console.log(data));
```

---

### **纯函数的优点**
1. **可预测性**：相同的输入必定产生相同的输出。
2. **易测试性**：纯函数无需外部环境依赖，可直接测试。
3. **复用性**：因为纯函数只依赖输入，适合在多场景下复用。
