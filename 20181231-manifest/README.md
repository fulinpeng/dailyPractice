# 使用方法
* 需要一个manifest文件，后缀可以是任意的
* html标签上添加`manifest`属性，值为manifest文件路径
* 服务器配置mime-type，`text/cache-manifest`

* tomcat上配置：
```xml
<mime-mapping>   
    <extension>manifest</extension>   
    <mime-type>text/cache-manifest</mime-type>
</mime-mapping>
```

# 如何判断离线缓存已经正常使用

* 浏览器控制台就可以看到如下信息(如果没有就打开`Preserve log`试试，还是没有那就配错了)
```
main.js
Navigated to http://localhost:8082/20181231-manifest/
localhost/:1 Document was loaded from Application Cache with manifest http://localhost:8082/20181231-manifest/cache.manifest
localhost/:1 Application Cache Checking event
localhost/:1 Application Cache NoUpdate event
```

* 然后勾选network的offline，刷新页面，可以离线看到页面就OK了

# manifest 文件

* 下面的例子中，如果无法建立因特网连接，则用 “404.html” 替代 /html5/ 目录中的所有文件
```
FALLBACK:
/html5/ /404.html
```
* 下面的例子中，当任何页面无法访问时跳转到 “404.html”页
```
FALLBACK:
*.html /404.html
```
# 如何更新缓存

* 浏览器在更新缓存过程中会触发一系列事件，可以通过注册处理程序来跟踪这个过程同时提供反馈用户
* 我们可以使用代码手动更新manifest缓存，一旦webapp源码更新，会自动更新本地manifest缓存，使用户始终访问到最新的源码
```javascript
window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
     window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
}, false);
```

# 常用API

* 0（UNCACHED） :  无缓存， 即没有与页面相关的应用缓存
* 1（IDLE） : 闲置，即应用缓存未得到更新
* 2（CHECKING） : 检查中，即正在下载描述文件并检查更新
* 3（DOWNLOADING） : 下载中，即应用缓存正在下载描述文件中指定的资源
* 4（UPDATEREADY） : 更新完成，所有资源都已下载完毕
* 5（IDLE） :  废弃，即应用缓存的描述文件已经不存在了，因此页面无法再访问应用缓存

# 扩展：如何检测设备是否离线

* navigator.onLine是HTML5定义用来检测设备是在线还是离线，对应的值为false或true。
* HTML5定义了online、offline事件用于监听网络状态变化
```js
    window.addEventListener('online', callback); // 离线到上线
    window.addEventListener('offline', callback); // 上线到离线
```
