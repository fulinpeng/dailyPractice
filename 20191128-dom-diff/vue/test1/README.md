* 查看这篇文章：
    * Vue列表渲染性能优化原理
    * https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651221664&idx=1&sn=1ca64ae640b0ca48d5d4a44677bd1c00&scene=21#wechat_redirect

* DOM元素移动和启发算法
    * diff 算法中另一个重要的优化是 DOM 节点的移动。DOM 节点移动的性能开销非常大，因此减少 DOM节点移动次数是算法的核心。

    * 如果在移动之前判断一下，他是不是在正确的位置。而这里对于是否处在正确的判断，是看他们的前一个元素是否相同。

    * 因为是新老数据嘛，先姑且认为他们没有增删，这样只是移动，举例：站队列时，排头兵站到队列尾去。。。而不是教室里换位置，桌子不动，人交换那种。懂了吗？
    * 好好看看这篇文章，非常棒
* 增和删就简单多了，参考 immutable 这篇文章会有启发的，虽然它讲的不是dom-diff
    * https://www.jianshu.com/p/825b7b4c401d

* 今天看到早读君这篇文章，真是个有情怀的人啊
    * https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651222775&idx=1&sn=fd936a709a382c6957cce6efc2bde3b9&scene=21#wechat_redirect

    