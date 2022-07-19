* react+ts+rx

* 几个资料，git上多找点项目，一起看，不然报错呀😂，不知道怎么解决
* 项目中标有😂的地方，都还不懂

* rx的资料
    * https://github.com/meizilp/ts-react-rxjs
    * https://segmentfault.com/a/1190000008464065

    * https://zhuanlan.zhihu.com/p/23464709
    * https://zhuanlan.zhihu.com/p/25383159
    * https://zhuanlan.zhihu.com/p/25059824

* 为啥要用rx？
    * RxJS至于event，就像以前jquery至于dom，lodash/underscore至于data。现在Jquery和lodash/undersocre可以完全用ES6+代替了。
    * 管道思想，通过管道，我们订阅了数据的来源，并在数据源更新时响应 。
    * 强大的操作符，通过操作符对流和流中的数据转换，拼接，以形成我们想要的数据模型 。
        * 操作符：https://blog.csdn.net/weixin_39460408/article/details/81811081
        * https://blog.csdn.net/bitushi1993/article/details/78227876
    * 事件流、
        * https://www.zhihu.com/question/48615787

* 我的理解：
    * Observer 相当于promise或者generator
        * promise中的resolve，reject。rxjs中的next,complete。
    * Subject是一种能够发射数据给多个observer的Observable, 这让Subject看起来就好像是EventEmitter。
* 感觉还好，就理解思想，然后熟悉api嘛
* 就ts现在是好多不懂，感觉好多坑不知道怎么填


* tsx
    * 基础: https://juejin.im/post/5bab4d59f265da0aec22629b
    * 基础: https://www.ctolib.com/topics-142043.html
    * 配置: https://www.jianshu.com/p/ec19c967c626

* 遇到问题是不是该去issure里面去找啊