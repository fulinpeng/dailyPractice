
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



