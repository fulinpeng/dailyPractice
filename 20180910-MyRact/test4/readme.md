## test4

> 最简单的 react：

> 前面的组件不太灵活，只能复用"点赞按钮"(只能复用某个组件)
> 实现Component类，将进一步抽取公共组件
> 实现props传参

* 将公用的方法尽量都抽离到 component 父类中
    * 调用 component 的构造方法(即`super(props)`)就能实现往子组件传参...
    * 父类是为了抽象，有的方法，可以让子类去定义，该类方法，是它的子类必须定义的如:`render`
    * 可能还要依赖其他辅助方法，如`mount`这类的工具方法

* `mount` 方法，相当于 `ReactDOM.render`