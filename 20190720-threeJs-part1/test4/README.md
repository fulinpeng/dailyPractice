
## 创建网格
```js
// geometry : 定义的几何体
// material : 材质
new THREE.Mesh(geometry,material)
```
* 修改属性
    * 除了在构造函数中指定材质，在网格被创建后，也能对材质进行修改
    ```js
    var material = new THREE.MeshLambertMaterial({
        color: 0xffff00
    });
    var geometry = new THREE.CubeGeometry(1, 2, 3);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // 重新赋值
    mesh.material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    ```

## 位置(移动)、缩放、旋转
* THREE.Mesh中，有分别对应的属性来修改: position/scale/rotation
* 还有种运动方式：物体不动，通过相机移动来模拟运动

## 性能检测
* threejs的性能检测器: https://github.com/mrdoob/stats.js 
* FPS表示：一秒的帧数，这个值越大越好，一般都为60左右
    * 人眼仍能继续保留其影像1/24秒左右的图像
    * 大多数游戏都会有超过30的FPS

