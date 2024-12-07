## **1. 处理用户身份认证**
在中间层集中处理用户身份认证，验证用户凭证（如 JWT Token）是否合法，避免后端服务重复验证。

### **场景**
前端在每次请求中都会携带用户的 JWT，Node.js 中间层负责验证 JWT 并决定是否将请求转发给后端。

### **代码示例**
```javascript
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "my_secret_key";

// 模拟后端服务
app.get("/api/protected", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "未提供授权头" });
    }

    const token = authHeader.split(" ")[1]; // 提取 Bearer Token

    try {
        // 验证 JWT
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("用户身份验证通过:", decoded);

        // 请求被转发到后端服务
        res.json({ message: "后端响应成功", user: decoded });
    } catch (error) {
        res.status(403).json({ message: "JWT 无效或过期" });
    }
});

// 启动服务
app.listen(3000, () => {
    console.log("Node.js 中间层已启动，监听端口 3000");
});
```

### **流程**
1. 前端请求中携带 `Authorization: Bearer <JWT>`。
2. 中间层解码并验证 JWT。
3. 如果验证通过，转发请求；否则返回 401 或 403。

---

## **2. 授权（基于用户角色的权限控制）**
中间层可以基于用户角色（Role）或权限（Permission）控制用户对后端接口的访问。

### **场景**
不同角色的用户（如管理员和普通用户）访问相同接口时，中间层可以限制普通用户的访问权限。

### **代码示例**
```javascript
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "my_secret_key";

// 模拟的用户角色数据
const rolesPermissions = {
    admin: ["view_orders", "manage_users"],
    user: ["view_orders"],
};

// 授权中间件
function authorize(requiredPermission) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "未提供授权头" });
        }

        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const userPermissions = rolesPermissions[decoded.role] || [];

            // 检查用户是否拥有所需的权限
            if (!userPermissions.includes(requiredPermission)) {
                return res.status(403).json({ message: "权限不足" });
            }

            // 授权通过，继续处理请求
            next();
        } catch (error) {
            return res.status(403).json({ message: "授权失败" });
        }
    };
}

// 路由 - 查看订单（所有角色均可访问）
app.get("/api/orders", authorize("view_orders"), (req, res) => {
    res.json({ message: "订单数据" });
});

// 路由 - 管理用户（仅管理员可访问）
app.post("/api/manage-users", authorize("manage_users"), (req, res) => {
    res.json({ message: "用户管理成功" });
});

// 启动服务
app.listen(3000, () => {
    console.log("Node.js 中间层已启动，监听端口 3000");
});
```

### **流程**
1. 用户发送请求，JWT 中包含角色信息（如 `role: "admin"`）。
2. 中间层解析 JWT 并检查用户的权限。
3. 如果权限符合要求，则允许访问；否则返回 `403 Forbidden`。

---

## **3. 数据加密和解密**
中间层可以对敏感数据进行加密后再存储到后端数据库，或者在从数据库中取出数据时进行解密。

### **场景**
在传输用户敏感信息（如密码、银行卡号）时，使用加密处理以提高数据安全性。

### **代码示例**
```javascript
const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// 加密密钥
const ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef"; // 32 字节
const IV = "abcdef9876543210"; // 16 字节

// 加密函数
function encrypt(text) {
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

// 解密函数
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// 模拟保存用户敏感数据
app.post("/api/save-data", (req, res) => {
    const { sensitiveData } = req.body;

    if (!sensitiveData) {
        return res.status(400).json({ message: "缺少敏感数据" });
    }

    const encryptedData = encrypt(sensitiveData);
    console.log("加密后的数据:", encryptedData);

    // 模拟存储到后端数据库
    res.json({ message: "数据已加密并保存", encryptedData });
});

// 模拟读取用户敏感数据
app.get("/api/read-data", (req, res) => {
    const encryptedData = req.query.encryptedData;

    if (!encryptedData) {
        return res.status(400).json({ message: "缺少加密数据" });
    }

    const decryptedData = decrypt(encryptedData);
    console.log("解密后的数据:", decryptedData);

    res.json({ message: "数据已解密", decryptedData });
});

// 启动服务
app.listen(3000, () => {
    console.log("Node.js 中间层已启动，监听端口 3000");
});
```

### **流程**
1. 在保存数据时，中间层对敏感数据进行加密后再存储到后端。
2. 在读取数据时，中间层从后端取出数据并解密，再返回给前端。
3. 加密和解密操作完全透明，保护数据在存储和传输中的安全性。

---

## **4. 限流与恶意请求过滤**
中间层可以对请求频率进行限制，防止某个用户发起过多请求（DDoS 攻击）。

### **场景**
为每个用户设置一个访问频率限制，比如每分钟最多 100 次请求。

### **代码示例**
```javascript
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// 配置限流策略
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 分钟
    max: 100, // 每分钟最多允许 100 个请求
    message: "请求过多，请稍后再试",
});

// 只对 `/api` 路径启用限流
app.use("/api", apiLimiter);

// 模拟 API 路由
app.get("/api/data", (req, res) => {
    res.json({ message: "这是受保护的数据" });
});

// 启动服务
app.listen(3000, () => {
    console.log("Node.js 中间层已启动，监听端口 3000");
});
```

### **流程**
1. 每个用户的请求频率被限制在 100 次/分钟以内。
2. 如果超过限制，直接返回 `429 Too Many Requests`。

---

## **总结**
Node.js 中间层服务在安全性方面的功能主要体现在：
1. **认证**：验证用户身份（如 JWT）。
2. **授权**：基于用户角色或权限限制接口访问。
3. **数据加密和解密**：保护敏感数据在存储和传输中的安全性。
4. **限流与过滤**：防止恶意请求和 DDoS 攻击。

通过这些功能，Node.js 中间层可以显著提升系统的整体安全性，保护后端服务免受直接威胁。