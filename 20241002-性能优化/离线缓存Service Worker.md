Service Worker 是一种浏览器 API，它允许你在后台运行 JavaScript 代码，从而能够拦截网络请求并缓存资源，实现离线功能和更高效的资源管理。使用 Service Worker，你可以为 Web 应用提供离线缓存功能，即使用户没有网络连接，依然可以访问应用的某些部分。下面我们详细了解如何使用 Service Worker 来实现离线缓存。

### 1. 基本概念

- **Service Worker**：它是运行在浏览器后台的脚本，不直接操作 DOM，但可以拦截网络请求、更新缓存、推送通知等。它允许你控制页面的网络请求，缓存资源，并使得 Web 应用具有离线能力。

- **Cache API**：通过 Cache API，Service Worker 可以缓存应用的静态资源，并在没有网络连接时提供这些缓存内容。

- **离线缓存**：离线缓存是通过缓存网站的资源（如 HTML、CSS、JavaScript 文件等）来实现即使没有网络连接，用户仍然可以访问应用的部分内容。

### 2. Service Worker 的工作原理

1. **注册 Service Worker**：首先，必须在客户端 JavaScript 代码中注册 Service Worker。它是一个独立于页面的脚本文件，可以通过 `navigator.serviceWorker.register()` 来注册。

2. **激活和安装**：当 Service Worker 被注册后，它会进入安装阶段，在此阶段可以将需要缓存的资源添加到缓存中。

3. **拦截请求**：一旦 Service Worker 被激活，它就会拦截所有的网络请求，并可以根据需要返回缓存的内容，或者将请求通过网络发送给服务器。

4. **离线工作**：当用户断网时，Service Worker 通过缓存的资源来响应请求，从而让 Web 应用能够继续离线运行。

### 3. 使用 Service Worker 实现离线缓存的步骤

#### 1. 注册 Service Worker

首先，我们需要在主 JavaScript 文件中注册 Service Worker：

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker 注册成功:', registration);
    }).catch((error) => {
      console.log('Service Worker 注册失败:', error);
    });
  });
}
```

#### 2. 编写 Service Worker 脚本

在 `/service-worker.js` 中，我们可以实现资源缓存、拦截请求等功能。以下是一个简单的示例，它将会缓存一些静态资源，并在离线时提供缓存的资源。

```javascript
// 缓存的资源列表
const CACHE_NAME = 'v1_cache';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/offline.html',
];

// 安装 Service Worker 时缓存静态资源
self.addEventListener('install', (event) => {
  console.log('Service Worker 安装');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('缓存静态资源');
      return cache.addAll(CACHE_URLS);
    })
  );
});

// 激活 Service Worker 时清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker 激活');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('删除缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截网络请求并提供缓存的响应
self.addEventListener('fetch', (event) => {
  console.log('拦截请求:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果缓存中有相应的资源，直接返回缓存内容
      if (cachedResponse) {
        return cachedResponse;
      }
      // 否则从网络请求数据
      return fetch(event.request).then((response) => {
        // 将新请求的资源缓存，以便后续使用
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

#### 3. 添加离线页面

当用户处于离线状态时，我们可以提供一个离线页面。可以将离线页面（例如 `offline.html`）添加到 `CACHE_URLS` 中，并在没有网络连接时返回该页面。

在 `fetch` 事件中，检查请求的资源是否存在，如果用户没有网络连接且请求的资源也不在缓存中，就返回离线页面。

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).catch(() => {
        // 当无法访问网络时，返回离线页面
        return caches.match('/offline.html');
      });
    })
  );
});
```

#### 4. 更新缓存

当资源发生变化时，我们需要更新缓存中的内容。可以在 `fetch` 事件中进行判断，获取到最新的内容并更新缓存。

1. **缓存资源版本控制**：通过缓存资源时给每个缓存加上版本标识，确保每次更新缓存时都有新版本。
2. **文件内容变化判断**：我们可以利用 `ETag` 或 `Last-Modified` 进行网络请求判断文件是否已更新。如果没有 `ETag` 或 `Last-Modified`，我们也可以通过文件哈希值（如 SHA256）来判断文件是否发生了变化。
3. **自动更新缓存**：如果检测到文件变化，则自动激活新版本缓存。

### 4. 处理缓存更新的策略

为了确保缓存中的资源总是最新的，您可以在 Service Worker 中使用不同的缓存策略：

- **Cache First**：如果资源存在于缓存中，直接使用缓存。否则，发起网络请求并将其缓存。
- **Network First**：首先尝试从网络请求资源，如果请求失败，则使用缓存中的内容。
- **Stale-While-Revalidate**：使用缓存的内容，但同时也会发起一个网络请求，获取新的内容并更新缓存。

### 5. 缓存清理

缓存会占用存储空间，尤其是当资源过多时。为了避免缓存溢出，需要定期清理旧缓存。可以在 Service Worker 的 `activate` 事件中处理缓存清理：

```javascript
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['v1_cache'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 6. 与 HTTP 协商缓存的比较
* HTTP 协商缓存：
    * 通过 ETag 或 Last-Modified 等头部，浏览器和服务器可以协商资源是否有变化。如果服务器返回 304 响应，浏览器可以直接使用缓存的资源。此方式主要依赖服务器的响应。
    * 纯后台定制更新策略

* Service Worker：
    * Service Worker 没有直接使用 ETag 或 Last-Modified，它通过拦截请求和使用 Cache API 来决定是否需要更新缓存。
    * 可以前端定制更新策略，甚至通过后台定期请求资源来强制更新缓存。

### 7. 小结

Service Worker 是实现 Web 应用离线功能的强大工具，允许开发者拦截网络请求并缓存静态资源，确保即使在没有网络的情况下，应用仍然可以访问。通过结合 Cache API，Service Worker 可以高效地管理资源缓存，提升用户体验。

要实现离线缓存，开发者需要：
1. 注册和激活 Service Worker。
2. 缓存所需的静态资源。
3. 在 `fetch` 事件中拦截请求，并返回缓存资源或离线页面。
4. 定期清理旧缓存，避免存储空间浪费。