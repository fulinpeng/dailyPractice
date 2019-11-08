
# viewport
* `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    * 不设置的时候：
        * screen.availWidth; // 414
        * document.documentElement.clientWidth; // 1242
    * 设置了viewport后：
    * screen.availWidth === document.documentElement.clientWidth
    
# rem的使用

1. rem主要用来调字体适配不同设备像素比差异下显示问题
2. rem设置盒子宽高时，在不同设备下能自动伸缩
    * 这不如使用vh、vw作为单位，或者使用百分比
    * 使用flex来布局也是好的
3. 正确的使用方式：用rem来适配字体固定的宽或者高，用flex来布局
    * 文本字号不建议使用rem，因为本在Retina屏幕下会变小
4. 定义根元素的font-size
     * 用flexible.js，其它的都有问题啊😪
        * 就这篇文章还可以: https://www.jianshu.com/p/04efb4a1d2f8
        * 官方文档地址：https://github.com/amfe/article/issues/17

# 移动端适配
1. 用viewport调整缩放比例为1
2. 用flex布局
3. rem调整字体的适配
    * 因为rem计算有小数参与会有大小误差
    * 每次使用时都要计算，所以用sass来做吧，弄个函数
4. 设置设置根元素`font-size`
5. 采用rem：写入CSS的尺寸/UI图标注的尺寸 = 屏幕宽度/UI图宽度 (这个只是用来设置 baseSize 的)
    * 这个比值由UI图与所最其匹配的测试机做基准
6. 上面一直在讨论怎么适配宽度，那高度咋办喃
    * 比如整页那种排版，太长的手机不是最下面会出现空白太多
    * 用媒体查询器吧，

# 我以前的疑惑
* rem啊，根据设计稿和某个屏幕做好比例计算，先实现该屏幕下显示正常，然后考虑`其他屏幕怎么适配`
    * 该屏幕怎么适配，根据UI标注计算某盒子宽度：
        * `screenW = docEl.getBoundingClientRect().width / dpr`，`移动端获取到的是逻辑像素的宽375`
        * `cssW = screenW/UI宽*盒子宽/htmlFontSize`，单位是rem
    * 其他屏幕怎么适配，设置html元素的`font-size`，就会自动根据不同设备来缩放
        * 用flexible.js
        * 或者自己写吧，就几句代码: [test10]('./test10-rem.html')

    * 京东的做法：用`@media (min-width: 320px) {...}`
        * 如果只适配手机端的话，`主要是找到几个临界值就行了`，其他的啊，你想多了
        * js的来设置的话，关于`devicePixelRatio`之类的也加入计算，可能想复杂了，就两点就完了
            1. `viewport` 设置： `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
            2. 用临界值去动态设 `htmlFontSize`
            3. 根据设计图和测试机，计算合适的 `baseSize` 去方便开发时些css，如果用flexible这个值‘吃喝项目’用75哈

# 我再次疑惑
* flexible虽好，但是那个 `htmlFontSize = clientW / 10` 这是怎么得出来啊😂
    