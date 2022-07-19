# 前端操作文件的方式

* https://www.zhangxinxu.com/wordpress/2018/09/ajax-upload-image-from-clipboard/

`前端无法像原生APP一样直接操作本地文件，否则的话打开个网页就能把用户电脑上的文件偷光了`
`所以需要通过用户触发，用户可通过以下三种方式操作触发`

* 通过input type="file" 选择本地文件
* 通过拖拽的方式把文件拖过来
* 在编辑框里面复制粘贴

`拿到原始的File对象后，实例化一个FileReader，调它的readAsDataURL并把File对象传给它，监听它的onload事件，load完读取的结果就在它的result属性里了。它是一个base64格式的，可直接赋值给一个img的src.`

`关于src使用的是blob链接的，除了上面提到的img之外，另外一个很常见的是video标签，如youtobe的视频就是使用的blob`

`这种数据不是直接在本地的，而是通过持续请求视频数据，然后再通过blob这个容器媒介添加到video里面，它也是通过URL的API创建的`

```js
    let mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    let sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    sourceBuffer.appendBuffer(buf);
```

* 使用了三种方式获取文件内容，最后得到结果：

1. FormData格式
2. FileReader读取得到的base64或者ArrayBuffer二进制格式


* 如果直接就是一个FormData了，那么直接用ajax发出去就行了，不用做任何处理
* 如果用jQuery的话，要设置两个属性为false，原生的直接用`xhr.send`方法就行了
```js
    $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        processData: false,  // 不处理数据
        contentType: false   // 不设置内容类型
    });
```

`如果xhr.send的是FormData类型话，它会自动设置enctype，如果你用默认表单提交上传文件的话就得在form上面设置这个属性`
```html
    <form enctype="multipart/form-data" method="post">
        <input type="file" name="fileContent">
    </form>
```

`因为上传文件只能使用POST的这种编码。常用的POST编码是application/x-www-form-urlencoded，【它和GET一样，发送的数据里面，参数和参数之间使用&连接`】

`使用iframe没有办法获取上传进度，使用xhr可以获取当前上传的进度，这个是在XMLHttpRequest 2.0引入的：xhr.upload.onprogress` 

```javascript
function (event) {
    if (event.lengthComputable) {
        // 当前上传进度的百分比
        duringCallback ((event.loaded / event.total)*100);
    }
};
```

# Evevt.clipboardData 对象

`clipboardData是JavaScript剪切板对象，该对象提供了3个常用方法：`

1. clearData(): clipboardData对象从剪切板删除一种或多种数据格式（一个参数：数据类型）
2. getData(): clipboardData对象从剪切板获取指定格式的数据（一个参数：数据类型）
3. setData(): clipboardData对象赋予指定格式的数据（两个参数：数据类型，要赋予的值）

* 数据类型一般为"text/plain"

* 目前clipboardData在ios上的safari浏览器无效，为解决移动端这个问题，我们引用一个js插件——clipboard.js

* clipboard.js依赖于HTML5推出的Selection API和execCommand API

# blob还能使用window.URL读取

# note

1. 粘贴事件提供了一个clipboardData的属性，如果该属性有items属性，那么就可以查看items中是否有图片类型的数据了。Chrome有该属性，Safari没有。

2. clipboardData.items 这个东西啊，打印出来是啥子都看不到的，要用`items[i].getAsFile()`方法读取为blob格式才能看到

3. 当我们使用QQ或者公司内部聊天工具中的截图工具截屏的时候，剪切板中是有截屏图片的；当我们在任意网页中的图片上“右键-复制图片”，也是在剪切板中。`但是，但是，但是，我们在操作系统的文件夹中复制图片，不好意思，这个图片并不是在剪切板中，因此，无法上传。`，桌面系统中的图片，目前实践下来，比较便捷的还是拖拽上传，以及文件选择框多选上传。

# 拓展

* 就是操作剪切板，实现网页上的复制，粘贴按钮的风格等。以后遇到了再研究

* 把Web端数据粘贴到Excel中，也可以从Excel中直接粘贴数据到页面编辑器中
    * https://blog.csdn.net/hackersaillen/article/details/45694181