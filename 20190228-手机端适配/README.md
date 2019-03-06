
# viewport
* `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    * 不设置的时候：
        * screen.availWidth; // 414
        * document.documentElement.clientWidth; // 980
    * 设置了viewport后：
    * screen.availWidth === document.documentElement.clientWidth
    
# rem的使用

1. rem主要用来调字体适配不同设备像素比差异下显示问题
2. rem设置盒子宽高时，在不同设备下能自动伸缩
    * 这不如使用vh、vw作为单位，或者使用百分比
    * 更合适的是flex来布局
3. 正确的使用方式：用rem来适配字体，用flex来布局
4. 定义根元素的font-size
    * https://www.cnblogs.com/gymmer/p/6883063.html

# 移动端适配
1. 用viewport调整缩放比例为1
2. 用flex布局
3. rem调整字体
    * 因为rem计算有小数参与会有大小误差
    * 每次使用时都要计算，所以用sass来做吧，弄个函数
4. 写入CSS的尺寸/UI图标注的尺寸 = 屏幕宽度/UI图宽度
    * 这个比值由UI图与所最适应的手机做基准
    * https://www.cnblogs.com/gymmer/p/6883063.html