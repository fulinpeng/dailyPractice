
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
3. 正确的使用方式：用rem来适配字体，用flex来布局
4. 定义根元素的font-size
    * https://www.cnblogs.com/gymmer/p/6883063.html

# 移动端适配
1. 用viewport调整缩放比例为1
2. 用flex布局
3. rem调整字体的适配
    * 因为rem计算有小数参与会有大小误差
    * 每次使用时都要计算，所以用sass来做吧，弄个函数
4. 设置设置根元素`font-size`
5. 采用rem：写入CSS的尺寸/UI图标注的尺寸 = 屏幕宽度/UI图宽度
    * 这个比值由UI图与所最适应的手机做基准
    * https://www.cnblogs.com/gymmer/p/6883063.html
6. 上面一直在讨论怎么适配宽度，那高度咋办喃
    * 比如整页那种排版，太长的手机不是最下面会出现空白太多
    * 用媒体查询器吧，

# 我以前的疑惑
* rem啊，根据设计稿和某个屏幕做好比例计算，先实现该屏幕下显示正常，然后考虑`其他屏幕怎么适配`
    * 该屏幕怎么适配，根据UI标注计算某盒子宽度：
        * `screenW = document.documentElement.clientWidth`
        * `cssW = screenW/UI宽*盒子宽/htmlFontSize`，单位是rem
    * 其他屏幕怎么适配，设置html元素的`font-size`，就会自动根据不同设备来缩放
        * 用flexible.js
        * 或者自己写吧，就几句代码
        * 用`@media (min-width: 320px) {...}`
        * 主要是找到几个临界值就行了，至于那个系数是多少看自己，怎么方便计算怎么设置
* 其他的啊，你想多了，关于`devicePixelRatio`之类的也加入计算，真的想复杂了
* 想要设计稿上面是多少px，设置css时就写多少px理论上可以实现，好吧就试试：
    1. 准备设计稿宽`uiW = 1600px`，有个盒子高度为32px，我要转换成我代码中的rem值`cssH = 0.32rem`
    2. 其他的样式要用rem时，都是除以100，那么`htmlFontSize = 100rem`
    3. 我有设备iPhone7，`screenW = 414; devicePixelRatio = 3;`，然后根据`htmlFontSize = 100rem`反推'适配系数'`k`
    4. 设置html的font-size，`htmlFontSize == 100 == screenW*devicePixelRatio/uiW*k`，得出`k = 128.824`
    5. 这样子对于其他设备来说，计算量比较大了容易出现像素差，毕竟都是小数计算
        * 其它设备根元素font-size，`htmlFontSize = screenW*devicePixelRatio/uiW*k`
        ```js
            size = screen.availWidth*devicePixelRatio/uiW*k // iPhone5 320 2x 51.529790660225444
            size = screen.availWidth*devicePixelRatio/uiW*k // iPhone6 375 2x 60.38647342995169
            size = screen.availWidth*devicePixelRatio/uiW*k // iPhone6 414 3x 100 (我的设备)
            size = screen.availWidth*devicePixelRatio/uiW*k // iPhoneX 375 3x 90.57971014492753
            size = screen.availWidth*devicePixelRatio/uiW*k // iPad    768 2x 123.67149758454106
        ```
        * 由上面可以看出，availWidth比我的设备要宽的，都比100大，比我的设备要小的，都比100小，这不就适配了嘛
        * 实例：[test10](test10-rem.html)，说明我这样完全没有问题的
