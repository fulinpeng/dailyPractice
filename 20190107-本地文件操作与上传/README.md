# 前端操作文件的方式

`前端无法像原生APP一样直接操作本地文件，否则的话打开个网页就能把用户电脑上的文件偷光了`
`所以需要通过用户触发，用户可通过以下三种方式操作触发`

* 通过input type="file" 选择本地文件
* 通过拖拽的方式把文件拖过来
* 在编辑框里面复制粘贴


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

`因为上传文件只能使用POST的这种编码。常用的POST编码是application/x-www-form-urlencoded，它和GET一样，发送的数据里面，参数和参数之间使用&连接`

