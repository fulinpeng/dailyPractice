
* 加入mockjs
* 接口请求会动态生成saga
* [示例]('./src/webApp/containers/asyncModules/test/index.js')

* --mode development
    * 不提供此参数，有警告，但是可以不提供
    * 这种方式提供参数，可以不用配置开发工具，因为内部都做了
    * 只能是 development、production

# 待优化
* css压缩
* js console.log 要去掉
* treeshaking有吗
* http请求的错误被吞了

# 按需加载、懒加载
1. bundle-loader
    * 路由的话，得放到组件的component中才行
    * 测试的时候，自动合并了vender，没有吧bundle-loader的内容分离出来，好像是缓存了
        * 第二天改成了这种方式，然后再改回去，就可以了，确定了是缓存的问题
        ```js
        import forumLoder from "bundle-loader?lazy!_containers/asyncModules/forum";
        ```
    * 用 include 可以， exclude 字段居然不行
    * 实现了懒加载，就不能分离出公共的chunk了，反正就是报错
        * 可能需要插件，去判断哪个先执行吧，得先提取了公共chunk再进行懒加载处理才行
2. 自定义Bundle组件加载，引入模块必须得用 import
    * 例子在webApp/layout/index.js 中，懒加载组件为 TestLazyLoad

# 预加载
* 点击的例子在webApp/layout/index.js 中，路由的例子在webApp/index.js中
* 出现下面表现时说明预加载成功
    * 浏览器网页头部有 <link rel="prefetch" as="script" href="/scripts/async-9-b076c.js">
    * 当点击按扭，加载该条js，http状态码为 Status Code: 200 OK (from disk cache)

* 用了 dll 就不用 vendor: ['jquery', 'other-lib'] 了，对不？

* 发现一个规律：
    * plugin中 filename 才可以通过`[name]`动态定义name，name字段不可以
    * loader中name字段也是
    * /笑哭/

# 补充
* 什么是同构？做多个平台兼容的过程叫同构
    * mainFields配置 见 20190423-webpack-spa/demo-12-mainFields/

    * cross-env 可以跨平台设置参数
* package.json 的 script 标签，其实执行的是：node_modules/.bin下面的文件
    * node_modules/.bin/webpack-dev-server 等同于 webpack-dev-server
* 这次优化了reduxSagaInjector：
    1. 调用httpApi时，可以存数据到store中，只需将原来的callback参数换成自己的reducer名称即可
    2. 遗留问题
        * 请搜索`这个判断很明显是一个坑`，不好解决
        * 那些action/reducer名称最好以全局变量维护
        * css并没有热更新啊...缓存很严重，不是的啊，时你做了分离css，开发环境不做就是了
* ant自定制主题：
    1. app.js 中引入 `import 'antd/dist/antd.less';` 不要引入错了，注意时less不是css
    2. ant用的less，必须用less-loader
    3. webpack的less配置要加上有modifyVars配置的option
        * 如果引入js的话，webpack是commonJs环境，module.exports, exports.xxx 才行的

* 哪个saga啊，socket saga 怎么搞啊，怎么用这种saga并放到store里面去

* react-router:
    * 路由对应的组件有两种写法 `render={() => <route.main/>}` `children={route.footer}`
    * switch是在有多个路由的时候用

* immutable
    * https://github.com/immutable-js/immutable-js#nested-structures
    * https://www.jianshu.com/p/28544ba4ba3b
    * https://segmentfault.com/a/1190000002909224

```js
    const { Map, List, fromJS } = require('immutable');
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);
    map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50

    const list1 = List([ 1, 2 ]);
    const list2 = list1.push(3, 4, 5);
    const list3 = list2.unshift(0);
    const list4 = list1.concat(list2, list3);
    assert.equal(list1.size, 2);
    assert.equal(list2.size, 5);
    assert.equal(list3.size, 6);
    assert.equal(list4.size, 13);
    assert.equal(list4.get(0), 1);

    const alpha = Map({ a: 1, b: 2, c: 3, d: 4 });
    alpha.map((v, k) => k.toUpperCase()).join(); // 'A,B,C,D'

    const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
    const map2 = Map({ c: 10, a: 20, t: 30 });
    const obj = { d: 100, o: 200, g: 300 };
    const map3 = map1.merge(map2, obj);
    // Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
    const list1 = List([ 1, 2, 3 ]);
    const list2 = List([ 4, 5, 6 ]);
    const array = [ 7, 8, 9 ];
    const list3 = list1.concat(list2, array);
    // List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

    const obj = { 1: "one" };
    console.log(Object.keys(obj)); // [ "1" ]
    console.log(obj["1"], obj[1]); // "one", "one"
    const map = fromJS(obj);
    console.log(map.get("1"), map.get(1)); // "one", undefined

    const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
    console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
    console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
    JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'

    map.get('a') // {a:1} 得到1
    map.getIn(['a', 'b']) // {a:{b:2}} 得到2。访问深层次的key

    map.set('a', 2) // {a:1} 得到1
    map.setIn(['a', 'b'], 3)
    map.update('a',function(x){return x+1})
    map.updateIn(['a', 'b'],function(x){return x+1})

```


