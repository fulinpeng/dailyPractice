# 项目结构
* ...

# 运行
* npm run dev

# 响应式
* 统一设置了设备宽度小于1024px的都为移动端
* 用flex作为响应式布局
* 用rem控制字体和部分盒子大小，可以根据设备宽度自动缩放
    * 在屏幕宽度在(min, max)区间才会缩放，这个区间可以在[config](src/config/config.js)中配置
# 补充（未完成）
1. 可以吧所有UI组件整理到一个文件统一导出，引入时只需写一条`import`可引入多个组件
2. `webpack.config.js`还需要优化：
    * 提高打包效率配`happypack`
    * 将特定的类库提前打包用`dllPlugin`
    * 打包时文件合并`Scope Hoisting`
    * 删除无用代码`Tree Shaking`
    * 做按需加载提高页面性能，react-router按需加载`syntax-dynamic-import`
3. 与后端约定好接口后，为了开发效率，可以配置`mock`服务
4. 开始没想要用redux，所以所有数据用state模拟的，放在容器组件里管理，saga还需要封装
    * 后面又加了redux、saga，但是因为时间原因并未运用到该domo中去
5. 自动化测试(未完成)
    * 测试过程管理工具：karma
    * 断言库：Chai/jasmine
    * react组件测试：enzyme
    * mock框架针对action和异步请求：sinon
6. 调试：time-travelling tool
7. 还要封装一套`axois`，用来请求后端接口

# 引入react-redux后
* 使用方式嘛
    1. 就不用再向以前一样，每个组件引入store然后用`store.dispath`来触发action了
    2. actions里面就是所有的`actionCreactor`函数
    3. reducers里面就是所有模块的reducer，统一导出后，用`combineReducers`合并
* 注意
    1. 用了`combineReducers`后，那个store里面的数据结构会变化：每个reducer会对应个同名的对象