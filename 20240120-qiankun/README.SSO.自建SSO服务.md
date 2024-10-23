在公司内部实现 SSO（单点登录）而不借助第三方，可以通过一系列步骤来实现。这里展示一个内部 SSO 的基本开发流程，包括身份验证、Token 的管理、用户会话的管理等。这个实现方案依赖于自定义的认证服务，多个应用可以通过共享的 SSO 服务来实现单点登录。

### 实现 SSO 的步骤流程

#### 1. **SSO 认证服务器**
SSO 系统的核心是一个认证服务器，负责统一处理用户的登录请求，并生成验证用户身份的 Token。在这个例子中，假设使用 JWT（JSON Web Token）来传递用户凭证。

- **身份验证**：用户首先通过 SSO 认证服务器进行登录，认证服务器通过数据库验证用户身份（如用户名和密码）。
- **生成 Token**：验证成功后，SSO 服务器生成 JWT Token，并返回给用户。这个 Token 可以存储在 Cookie 或浏览器的 Local Storage 中。
  
#### 2. **不同系统共享 SSO**
各个子系统在用户访问时，不再单独处理登录逻辑，而是将登录请求重定向到 SSO 认证服务器。SSO 认证服务器校验 Token 并返回用户信息。

- **无Token请求**：如果用户没有登录，系统会重定向到 SSO 认证服务器，用户登录后会返回一个带有 Token 的请求，完成认证。
- **有Token请求**：如果用户已经登录，前端会携带 Token，子系统会通过 SSO 服务验证该 Token 的有效性。

### SSO 登录流程：

1. **用户请求登录**：
   - 用户访问系统A，但还未登录，系统A会将用户重定向到 SSO 认证服务器（如 `/sso/login`）。
   
2. **SSO 服务器认证**：
   - 用户输入用户名和密码，SSO 认证服务器进行身份验证。
   
3. **生成 Token 并返回**：
   - 如果登录成功，SSO 服务器生成 JWT Token 并返回给系统A，通常通过 URL 的查询参数或在浏览器 Cookie 中保存。
   
4. **验证 Token**：
   - 系统A 通过 SSO 服务器的 `/sso/validateToken` 接口验证 Token。如果有效，系统A将允许用户访问资源并维持会话。
   
5. **跨系统访问**：
   - 当用户访问系统B时，系统B会检查 Token 是否存在。如果存在，则通过 SSO 服务器的 Token 验证接口 `/sso/validateToken` 来认证。认证通过后，用户直接登录到系统B。
   
6. **注销机制**：
   - SSO 服务器提供统一的注销接口 `/sso/logout`，所有系统收到该通知后统一清除 Token 和会话。

### Node.js 实现 SSO 的基本示例

#### 1. **SSO 服务器的 JWT Token 生成逻辑**

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secret = 'your-very-secure-secret';

// 登录接口
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 在这里实现实际的用户名和密码验证逻辑
    if (username === 'admin' && password === 'password') {
        // 验证成功后生成 JWT
        const token = jwt.sign({ username: username }, secret, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).send('Unauthorized');
    }
});

// Token 验证接口
app.post('/validateToken', (req, res) => {
    const { token } = req.body;
    
    // 验证 Token
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token is invalid');
        } else {
            return res.json({ valid: true, username: decoded.username });
        }
    });
});

app.listen(3000, () => {
    console.log('SSO server is running on http://localhost:3000');
});
```

#### 2. **在应用系统中验证 Token**

每个需要 SSO 认证的系统都会有一个验证 Token 的逻辑，判断用户是否已经登录：

```javascript
const axios = require('axios');

// 用户访问系统时的验证逻辑
function checkToken(token) {
    return axios.post('http://localhost:3000/validateToken', { token })
        .then(response => {
            if (response.data.valid) {
                console.log('User authenticated:', response.data.username);
            } else {
                console.log('Invalid token');
            }
        })
        .catch(error => {
            console.log('Error validating token', error);
        });
}
```

### 核心技术说明

1. **JWT（JSON Web Token）**：JWT 是一种非常适合 SSO 系统的 Token 格式，可以在客户端存储并携带用户身份信息，每个应用通过解析 JWT 就能快速获取用户身份。
   
2. **Token 验证**：在每个应用中，只需通过 SSO 认证服务器的 `/validateToken` 接口验证用户的 Token 是否有效，从而实现登录状态的共享。

3. **Token 过期**：为了提高安全性，可以在 SSO 服务器上设置 JWT 的过期时间，防止 Token 长期有效导致安全隐患。

4. **注销**：通过一个统一的注销接口来清除用户的登录状态，在所有系统中清除 Token 和会话数据。

### 小结

通过自建 SSO 认证服务器，可以在公司内部实现跨系统的单点登录机制，集中化管理用户的身份认证和授权过程，确保用户在不同系统中都能无缝登录。这不仅提升了用户体验，还能统一安全管理。