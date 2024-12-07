// 定义缓存名称和要缓存的文件列表
const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
    "/index.html",
    "/style.css",
    "/script.js",
    "/assets/logo.png", // 你可以添加你需要缓存的文件
];

// 获取文件的哈希值
async function getFileHash(url) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // 转换成字节数组
        const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
        return hashHex;
    } catch (error) {
        console.error("Error calculating hash:", error);
        return null;
    }
}

// 检查文件是否需要更新（通过比较哈希值）
async function checkForFileUpdate(url) {
    const currentHash = await getFileHash(url);

    if (!currentHash) {
        return; // 如果哈希值计算失败，跳过更新
    }

    // 从缓存中获取上次的哈希值
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    const cachedHash = cachedResponse ? await cachedResponse.text() : null; // 获取缓存中的哈希值

    if (currentHash !== cachedHash) {
        console.log("File updated, updating cache...");
        // 如果文件内容有变化，更新缓存
        cache.put(url, new Response(currentHash)); // 存储新的哈希值
        cache.add(url); // 缓存文件本身
    } else {
        console.log("File not updated, skipping cache update.");
    }
}

// 自动更新缓存的资源
async function updateCacheIfNeeded(url) {
    await checkForFileUpdate(url);
}

// 在 Service Worker 安装时缓存文件
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log("Service Worker: Caching resources...");
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log("Service Worker: Installation complete.");
            }),
    );
});

// 在 Service Worker 激活时，检查缓存并更新
self.addEventListener("activate", (event) => {
    event.waitUntil(
        Promise.all(
            urlsToCache.map((url) => updateCacheIfNeeded(url)), // 检查每个文件是否需要更新
        ).then(() => {
            console.log("Service Worker: Cache update complete.");
        }),
    );
});

// 拦截网络请求并使用缓存
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 如果有缓存，直接返回缓存的内容
            if (cachedResponse) {
                console.log(`Service Worker: Serving cached ${event.request.url}`);
                return cachedResponse;
            }

            // 如果没有缓存，则通过网络请求获取资源
            console.log(`Service Worker: Fetching ${event.request.url}`);
            return fetch(event.request)
                .then((networkResponse) => {
                    // 如果是成功的响应，存储到缓存
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch((error) => {
                    console.error("Service Worker fetch failed:", error);
                });
        }),
    );
});
