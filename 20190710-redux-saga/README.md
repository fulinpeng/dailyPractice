
* 参考地址: https://github.com/forthealllight/blog/issues/14

这样子在获取 store 里面的数据
```js
@connect(({ topics, collected }) => ({
  topics,
  collected,
}))
```

被监听的 action ，会被 saga 拦截吗？？？

直接就是dispatch，dispatch的是一个action对象，没有commit、没有commit、没有commit
dispatch触发了被监听的action，saga来处理后put一个成功的action就是完事了

action里面带的可能是副作用函数需要的参数，也可能是副作用的结果(作为reducer的参数)

dispatch 还是在组件中发出的
异步，就调用对应的处理异步的action，就是对应的actionCreater

call和fork表示异步调用，其中call表示的是阻塞调用，fork表示的是非阻塞调用。

put对应的是middleware中的dispatch方法，参数是一个plain object，一般在异步调用返回结果后，接着执行put。select相当于getState，用于获取store中的相应部分的state。

thunk 中间件：
    判断发出的action是对象还是函数，同步的就是对象，异步的是函数了
    是函数就执行，再执行对应的reducer，此时就是把副作用payload传给reduce就是了，同步的action直接调用对应的reducer就是了

* redux-thunk的缺点： 
1. action的形式不统一，因为，有的action是对象，有的是函数，函数里面更乱了，可能写很多复杂的形式，不好做统一封装
2. 不好测试，你想测一个异步的action函数，那么里面有ajax你测不了...

* redux-saga 解决了thunk的缺点：
1. 在redux-saga中action是原始的js对象，把所有的异步副作用操作放在了saga函数里面。这样既统一了action的形式，又使得异步操作集中可以被集中处理
2. 测试的时候，测试Effect类方法就可以了，不用管ajax返回的数据

* redux
    * UI—————>action（plain）—————>reducer——————>state——————>UI
* redux-thunk
    * UI——>action(side function)—>middleware—>action(plain)—>reducer—>state—>UI
* redux-saga
    * UI——>action1————>redux-saga中间件————>action2————>reducer..
    * saga 在处理`一个`异步需要`两个`action
        * saga 一定有两个action吧... action1 是saga用的，action2是redux用的
* take: 是用来监听action，返回的是监听到的action对象。
    * 监听并得到的action1，去put真正的action2
    * take的方式得用while(true)，知道为什么吗？？？有意思哦
* call和apply方法与js中的call和apply相似，
    * 返回一个描述对象。不过这里call方法传入的函数fn可以是普通函数，也可以是generator。call方法应用很广泛，在redux-saga中使用异步请求等常用call方法来实现
    * 在call方法调用结束之前，call方法之后的语句是无法执行的
    * `注意:`这个call啊，如果调用的函数返回的是一个promise，call会把promise的返回值res取出来并返回(也就是resolve(res)那个res啊~)
    * 如果那个函数返回的是普通对象或者值，就直接返回这个值
* put这个Effect方法跟redux原始的dispatch相似，都是可以发出action，且发出的action都会被reducer监听到。
* select方法对应的是redux中的getState
* fork方法相当于web worker，fork方法不会阻塞主线程，在非阻塞调用中十分有用
    * 非阻塞用fork代替call
* takeEvery和takeLatest用于监听相应的动作并执行相应的方法，是构建在take和fork上面的高阶api

* 使用redux，那种发请求的actions、reducers，最好封装成动态的，这样就不需要专门维护了，就像连心的项目与咪咕的相比，就能体现差别
