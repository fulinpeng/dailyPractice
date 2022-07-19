```js
    // 兼容低版本浏览器没有hashchange事件
    var oldHash = location.hash;
    var oldURL = location.href;
    setInterval(function() {
        var newHash = location.hash;
        var newURL = loccation.href;
        if (newHash !== oldHash && typeof window.onhashchange == 'function') {
            window.onhashchange({
                type: 'hashchange',
                oldURL,
                newURL,
            });
            oldHash = newHash;
            oldURL = newURL;
        }
    }, 100);
```

* 测试history的时候，需要开服务器才行哦

* js调用history的api谷歌浏览器不会触发onpopstate事件
    * 用js主动调用一次这个方法
    ```js
    setTimeout(() => {
        window.onpopstate();
    }, 100);
    ```