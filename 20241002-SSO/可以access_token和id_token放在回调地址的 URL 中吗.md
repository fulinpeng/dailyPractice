在单点登录（SSO）过程中，将 `access_token` 和 `id_token` 放在回调地址的 URL 中并不是最佳实践，原因有以下几点：

1. **安全风险**：
   - **Token泄露**：在 URL 中传递 `access_token` 和 `id_token` 会使这些令牌暴露在浏览器的历史记录、服务器日志和代理中。恶意攻击者如果能够访问这些存储（例如浏览器历史或代理缓存），就可能获取到令牌，并用来冒充用户。
   - **容易被复制**：URL 中的令牌还可能被用户复制或粘贴到其他地方，从而造成泄露的风险。

2. **浏览器限制**：
   - **Referer头信息泄露**：如果用户从回调页面跳转到其他页面，浏览器的 `Referer` 头会包含回调地址，这样其他页面的服务器可能会收到用户的令牌信息。
   
3. **令牌的传递标准**：
   - 大多数基于 OAuth 2.0 和 OpenID Connect 的 SSO 实现，建议通过 **HTTP POST** 或 **Authorization Header** 的方式传递 `access_token` 和 `id_token`。例如，OAuth 2.0 的隐式流程推荐使用 `fragment`（URL hash）来传递 token，因为 `fragment` 不会被服务器解析，只在浏览器端使用，安全性稍高于直接通过查询参数。

### 安全传输令牌的推荐方法

- **隐式流（Implicit Flow）**：如果一定要将令牌放在 URL 中，建议放在 `fragment` 中，例如 `https://client.example.com/callback#access_token=...`。浏览器会解析 `fragment`，但它不会随请求发送给服务器，从而减少了泄露的风险。
- **授权码流程（Authorization Code Flow）**：推荐使用授权码流程，通过返回授权码并使用服务器端的安全通信来交换 `access_token` 和 `id_token`，从而避免直接暴露令牌。

### 结论

为了安全性，最好不要直接将 `access_token` 和 `id_token` 放在回跳地址的 URL 中，而是采用 `fragment` 或使用授权码流程来安全地传递和管理令牌信息。这可以帮助防止敏感信息在回调过程中被第三方截获或泄露。