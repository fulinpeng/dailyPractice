* 对这篇文章的理解

    1. 核心：watchers、watcher、digest
    2. 以scope为单位，ng就是一个scope树
    3. 里面的数据都是一次性更新，不是谁变谁更薪
    4. 任何一个数据改变，该scope的状态就是脏的

 * 问题

    1. 当用js改变scope内部的值得时候，怎么更新到dom?
        * ng提供一个$apply方法

* 扩展
    * Scope提供$watch方法监视Model的变化
    * Scope提供$apply方法传播Model的变化
    * Scope可以继承，用来隔离不同的application components和属性访问权限




