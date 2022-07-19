# 基本几何形状

## 立方体(CubeGeometry)

* 后三个参数分别是在三个方向上的分段数，如widthSegments为3的话，代表x方向上水平分为三份
    ```js
    new THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    ```
    * 注意这个分段是对六个面进行分段，而不是对立方体的体素分段，因此在立方体的中间是不分段的，只有六个侧面被分段

## 平面(PlaneGeometry)
* 这里的平面(PlaneGeometry)其实是一个长方形，而并非是数学意义上无限大的平面
    ```js
    new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    ```
    * 其中，width是x方向上的长度；height是y方向上的长度；后两个参数同样表示分段
    * new THREE.PlaneGeometry(2, 4);创建的平面在x轴和y轴所在平面内
* 如果需要创建的平面在x轴和z轴所在的平面内，可以通过物体的旋转来实现

## 球体(SphereGeometry)
* 球体的构造函数: THREE.SphereGeometry
    ```js
    new THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
    ```
    * radius 是半径；
    * segmentsWidth 表示经度上的切片数
    * segmentsHeight 表示纬度上的切片数
    * phiStart 表示经度开始的弧度
    * phiLength 表示经度跨过的弧度
    * thetaStart 表示纬度开始的弧度
    * thetaLength 表示纬度跨过的弧度
* segmentsWidth相当于经度被切成了几瓣，而segmentsHeight相当于纬度被切成了几层
    * 因为在图形底层的实现中，并没有曲线的概念，曲线都是由多个折线近似构成的
    * 对于球体而言，当这两个值较大的时候，形成的多面体就可以近似看做是球体了
* 经度弧度 phiStart, phiLength
    * 如果设置了 phiStart, phiLength ，效果是：这个弧度区间会被分割成segmentsWidth份

* 纬度弧度 thetaStart, thetaLength
    * 如果设置了 thetaStart, thetaLength ，效果是：这个弧度区间会被分割成segmentsHeight份

## 圆形(CircleGeometry)
* 可以创建圆形或者扇形
    ```js
    new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
    ```
    * radius是半径
    * segments表示切片数
    * thetaStart表示纬度开始的弧度
    * thetaLength表示纬度跨过的弧度

## 圆柱体(CylinderGeometry)
* 圆柱体构造函数
    ```js
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    ```
    * radiusTop与radiusBottom分别是顶面和底面的半径，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台
    * height是圆柱体的高度
    * radiusSegments与heightSegments可类比球体中的分段，一个表示底面、顶面的分段，另一个表示环面的分段
    * openEnded是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面
* 顶面、底面半径不一致的时候，即是一个圆台

## 正四面体(TetrahedronGeometry)、正八面体(OctahedronGeometry)、正二十面体(IcosahedronGeometry)
* 构造函数
    ```js
    // 正四面体
    new THREE.TetrahedronGeometry(radius, detail)
    // 正八面体
    new THREE.OctahedronGeometry(radius, detail)
    // 正二十面体
    new THREE.IcosahedronGeometry(radius, detail)
    ```
    * radius是半径
    * detail是细节层次(Level of Detail)的层数
        * 对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型
        * 一般可以对这个值缺省

## 圆环面(TorusGeometry)
* 效果图/构造函数
    > ![](./1615908822.jpg)
    ```js
    new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    ```
    * radius是圆环半径
    * tube是管道半径
    * radialSegments与tubularSegments分别是两个分段数
    * arc是圆环面的弧度，缺省值为Math.PI * 2

## 圆环结(TorusKnotGeometry)
* 构造函数
    ```js
    new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
    ```
* 前四个参数在圆环面中已经有所介绍
* p和q是控制其样式的参数，一般可以缺省
* heightScale是在z轴方向上的缩放

## 文字形状(TextGeometry)
* 使用文字前，需要下载和引用额外的字体库。字体库在[three.js Github master/examples/fonts](https://github.com/mrdoob/three.js/tree/master/examples/fonts)目录下，下载里面的json文件，放在你的目录下，然后用服务器加载
    ```js
    new THREE.TextGeometry(text, parameters)
    ```
* 其中，text是要显示的文字字符串，parameters是以下参数组成的对象：
    * size ：字号大小，一般为大写字母的高度
    * height ：文字的厚度
    * curveSegments ：弧线分段数，使得文字的曲线更加光滑
    * font ：字体，默认是'helvetiker'，需对应引用的字体文件
    * weight ：值为'normal'或'bold'，表示是否加粗
    * style ：值为'normal'或'italics'，表示是否斜体
    * bevelEnabled ：布尔值，是否使用倒角，意为在边缘处斜切
    * bevelThickness ：倒角厚度
    * bevelSize ：倒角宽度

## 自定义形状
* 对于Three.js没有提供的形状，可以通过自定义形状来创建
    * 由于自定义形状需要手动指定每个顶点位置，以及顶点连接情况，如果该形状非常复杂，程序员计算量就会比较大。这种情况，建议使用建模工具，创建好之后，再通过three.js导入到场景中，这样会十分高效、方便。
    * 自定义形状使用的是Geometry类，它是其他如CubeGeometry、SphereGeometry等几何形状的父类，其构造函数是: new THREE.Geometry()
* 我们以创建一个梯台为例，首先，初始化一个几何形状，然后设置顶点位置以及顶点连接情况:
    * 顶面创建4个点，底面创建4个点，按照顺时针的顺序逐个创建
    * geometry创建点的时候都是push到数组vertices里面的
    * 所以这8个点，按照顺序都有一个对应的索引值
    * 利用Face3的方法将3点连成一个三角面

* 自定义形状失败。。。




