# require

* [参考地址]('http://www.ruanyifeng.com/blog/2015/05/require.html')

* node环境下require怎么查找文件的？下面是简易过程
    * 内置模块 > 路径(如：'./component/index.js') > 目录(省略.js时: )
        * 路径，省略后缀时: x.js>x.json>x.node
        * 目录，省略后缀时: x/package.json(main字段) > x/index.js > x/index.json > x/index.node
    * 如果x不是内置模块，也不是路径和目录
        * 根据 X 所在的父模块，确定 X 可能的安装目录
        * 依次在每个目录中，将 X 当成文件名或目录名加载

* Module 构造函数和实例的属性，看这里：运行`node a.js`和`node b.js`看看终端执行结果

----

* 模块实例的 require 方法
    * 首先解析出模块的绝对路径（filename），以它作为模块的识别符，下面是简易过程
    * 第一步：如果是内置模块，不含路径返回
    * 第二步：确定所有可能的路径
    * 第三步：确定哪一个路径为真
* Module._load方法：
    * 有两个关键方法：
        * Module._resolveFilename() ：确定模块的绝对路径
        * module.load()：加载模块
    * 全部过程
        * 第一步：如果有缓存，取出缓存
        * 第二步：是否为内置模块
        * 第三步：生成模块实例，存入缓存
        * 第四步：加载模块
        * 第五步：输出模块的exports属性
    
* `require.resolve` 方法，供外部调用，用于从模块名取到绝对路径

* module跟module.exports有什么区别？
    1. exports 是指向的 module.exports 的引用
    2. module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
    3. require() 返回的是模块实例的exports 而不是 exports

* webpack4，没有入口配置也能工作，但是必须要设置package.json(main字段)

# require源码
* 怎么读源码
    * 读懂别人程序的根本基础，便是熟悉该程序提供的API、了解对方所用的程序语言及命名惯例
    * 阅读程序码的首要目的在于了解全貌而非细节，摸清架构，便可轻松掌握全貌，不要过早钻进细节，因为那通常对于你了解全貌，没有多大的帮助
    * 如果你有一个猜想，但是又和你的目标关联不太大，那就坚持这个猜想，直到出现明显反例。结果发现怎么做都不对，那就先放弃原来的目标，专门研究这个结构的用途。对于旁支猜想的不断切换，要做好自己的task stack保留
    * 了解架构，必须要加上层次感，在旁支猜想解决之后，要根据结论尽快回到上次中断的任务
    * 探索架构的第一件事：找出系统如何初始化，主入口

* 提供了三个API：requirejs, require, define
    * 具体用法不说了，看demo
    * require.config / requirejs.config ，两个是等价的，设置本地公共配置，和其它AMD库的全局配置
    * 可以先拉取cdn资源，找不到再请求本地资源
    * 还兼容第三方AMD库
    * 也支持commonJs模块方式
    * 可以按需加载模块
* 添加配置：
    * config是require函数的静态方法，指向require函数本身
    * define，name也可以不传，也可以只传一个函数、或者一个对象
    ```js
        if (typeof name !== 'string') {
            // 用类似这样的方法来做函数的重载...
            callback = deps;
            deps = name;
            name = null;
        }
    ```
    * fn.length，获取fn的形参个数
    * define方法，目的是将当前模块push到globalDefQueue
    * 核心方法newContext
* 动态加载脚本，就是js插入script标签，再添加 onload 事件，确保依赖都加载完成再执行回调

