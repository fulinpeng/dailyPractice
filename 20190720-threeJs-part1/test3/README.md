# 材质(material)
## 基本材质(BasicMaterial)
* 基本材质的物体，渲染后物体的颜色，始终为该材质的颜色，不会由于光照产生明暗、阴影效果
```js
new THREE.MeshBasicMaterial(opt) // 其中参数opt可以缺省
```
* 参数：
    * visible：是否可见，默认为true
    * side：渲染面片正面或是反面，默认为正面THREE.FrontSide，可设置为反面THREE.BackSide，或双面* THREE.DoubleSide
    * wireframe：是否渲染线而非面，默认为false
    * color：十六进制RGB颜色，如红色表示为0xff0000
    * map：使用纹理贴图(下面会着重讲解)
* 对于基本材质，即使改变场景中的光源，使用该材质的物体也始终为颜色处处相同的效果。
    * 当然，这不是很具有真实感

## Lambert材质(MeshLambertMaterial)
* [实例](./index.4.html)
* Lambert材质是符合Lambert光照模型的材质
* Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适应，对于其他大部分物体的漫反射效果都是适用的
    * 漫反射光照模型的公式为：
    ```js
    Idiffuse = Kd * Id * cos(theta)
    ```
    * Idiffuse是漫反射光强
    * Kd是物体表面的漫反射属性
    * Id是光强
    * theta是光的入射角弧度
* 当然，对于使用Three.js的Lambert材质，不需要了解以上公式就可以直接使用
    * 直接使用Lambert材质的构造函数：
    ```js
    // 添加光照
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    scene.add(light);

    // Lambert材质
    var material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
    });
    ```
    * color是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性
    * 除此之外，还可以用ambient和emissive控制材质的颜色
        * ambient 表示对环境光的反射能力，只有当设置了AmbientLight后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。
        * emissive是材质的自发光颜色，可以用来表现光源的颜色。
    
## Phong材质(MeshPhongMaterial)
* [实例](./index.6.html)
* Phong材质(明暗处理算法的一种名称)是符合Phong光照模型的材质
    * 和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合
    * 漫反射部分和Lambert光照模型是相同的
    * 镜面反射模型的公式为：
    ```js
    Ispecular = Ks * Is * (cos(alpha)) ^ n
    ```
    * Ispecular是镜面反射的光强
    * Ks是材质表面镜面反射系数
    * Is是光源强度
    * alpha是反射光与视线的夹角
    * n是高光指数，越大则高光光斑越小
    * 由于漫反射部分与Lambert模型是一致的，因此，如果不指定镜面反射系数，而只设定漫反射，其效果与Lambert是相同的
    * Phong材质的构造函数使用：
    ```js
    // 添加光照
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    scene.add(light);

    // 镜面反射材质 MeshPhongMaterial
    var material = new THREE.MeshPhongMaterial({
        color: 0xffff00
    });
    ```
    * color是用来表现材质对镜面射光的反射能力
    * 除此之外，还可以用ambient和emissive控制材质的颜色
        * ambient 表示对环境光的反射能力，只有当设置了AmbientLight后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色
        * emissive是材质的自发光颜色，可以用来表现光源的颜色
        * shininess属性控制光照模型中的n值*(高光指数，光斑)，当shininess值越大时，高光的光斑越小，默认值为30

## 法向材质
* [实例](./index.7.html)
* 法向材质可以将材质的颜色设置为其法向量的方向
    * 有时候对于调试很有帮助
    * 法向材质的设定很简单，不需要设置参数
    ```js
    new THREE.MeshNormalMaterial()
    ```
## 材质的纹理贴图
* [实例](./index.8.html)
* 将其导入到纹理texture中：
    ```js
    var texture = THREE.ImageUtils.loadTexture('images/01.jpg');
    ```
* 然后，将材质的map属性设置为texture：
    ```js
    var material = new THREE.MeshLambertMaterial({
        map: texture
    });
    ```
* 长方体的六面各种的贴图都不同，可以分别导入图像到六个纹理，并设置到六个材质中
    ```js
    THREE.MeshFaceMaterial(materials); // materials 为贴图材质数组
    ```
* 用黑白相间的图片绘制一副棋盘
