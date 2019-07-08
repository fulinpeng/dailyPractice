const appState = {
    title: {
        text: "<h1>标题文本</h1>",
        color: "red"
    },
    content: {
        text: "<h2>内容段落，内容段落，内容段落</h2>",
        color: "orange"
    }
};

const renderTitle = o => {
    const targetNode = document.getElementById("title");
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
};

const renderContent = o => {
    const targetNode = document.getElementById("content");
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
};

const renderApp = state => {
    renderTitle(state.title);
    renderContent(state.content);
};

// 先 subscribe ，再 dispatch ，dispatch 中会执行开始注册的 listener
// createStore 生成发的 store 是那给业务逻辑(react)用的，不是redux自己的哦，执行结束会有个初始的 store.state
// dispatch 会调用 reducer 改变store里面的state，reducer返回的state是给业务逻辑(react)用的
// 所以，进一步理解什么是"库"，就是操作的都是目标对象提供的数据，库本身只提供方法，从来不维护自己的数据
//      可以说库都是"纯的"，就类似纯函数一样去理解
// redux 就这么点内容，就一个核心的 createStore 方法，和简单的使用规则
// 达到的效果：
//      1. "规范全局变量的使用"
//      2. "代码复用"
//      3. "是使用者更清晰的知道改的是什么"

const createStore = (state, reducer) => {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = action => {
        reducer(state, action);
        listeners.forEach((listener) => listener());
    }
    return { getState, dispatch, subscribe };
};

// handleStateChange
// 这是在使用库，不是在写一个库
// 这是使用库时，定义的reducer，想怎么写就怎么写
// 作用就是传一个action返回一个新的state而已
const handleStateChange = (state, action) => {
    const type = action.type;
    const newData = action.newData;
    switch (type) {
        case "MODEFIED_TITLE":
            state.title = {
                ...state.title,
                ...newData
            };
            break;
        case "MODEFIED_CONTENT":
            state.content = {
                ...state.content,
                ...newData
            };
            break;
        case "ASYNC_DATA":
            // let asyncData = {};
            // setTimeout(() => {
            //     // 这就成了异步的数据，3秒之后才更新，页面还能变吗？不能了吧
            //     asyncData = {color: "red"};
            //     state.content = {
            //         ...state.content,
            //         ...asyncData,
            //         ...newData
            //     };
            // }, 3000);

            state.content = {
                ...state.content,
                ...newData
            };
            break;
        default:
            break;
    }
};

const store = createStore(appState, handleStateChange);
store.subscribe(() => renderApp(store.getState())); // 注册，即更新哪一个数据(然后还要渲染到页面，即触发setState)
// 只需注册一次，可以更新很多次呀
// 多次提交action

// 异步的action为什么会有问题呢，感觉不会有啥子问题嘛。？？？？？？？？？？？？？？？？
// 那就在生命周期里面，发一个请求，然后数据来了再发action指令也没问题吧

// readux-thunk的意义到底在何处？？？？？？？？？？？？？？？？？？？？？？？？？


// 加入有一个ajx请求有很多地方用，那么每次我只用调用一个指令就可以去改变页面，这是不是一种应用场景呢？
// 我把发请求的逻辑写在什么地方呢？我写到handleStateChange里面可以吗？newData就当做是荷载了

// handleStateChange叫Reducer，返回action的那个叫Action Creator(这里没有)

// 还有一个redux的重要规定：Reducer 函数最重要的特征是，它是一个纯函数
// 所以上面我把异步请求放到handleStateChange里面就是不合理的，违背了redux的规则

// 正解：
// （1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
// （2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
// （3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

// 想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能

// redux-thrunk是把dispatch都封装起来了，我们看不到的，只能传入回调或者，直接传入一个action

renderApp(store.getState()); // 初始化

// 下面是一个中间件的雏形
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log(action.type + ':', action.newData); // dispatch之前打印newData功能
    next(action);
    console.log('next state', store.getState());
}

setTimeout(() => {
    store.dispatch({
        type: "MODEFIED_TITLE",
        newData: {
            color: "green"
        }
    });
}, 1000);
setTimeout(() => {
    store.dispatch({
        type: "MODEFIED_CONTENT",
        newData: {
            text: "<p>修改后的文本，修改后的文本，修改后的文本</p>",
            color: "red"
        }
    });
}, 2000);

setTimeout(() => {
    store.dispatch({
        type: "ASYNC_DATA",
        newData: {
            color: "black"
        }
    });
}, 3000);

// applyMiddlewares
// 它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        var store = createStore(reducer, preloadedState, enhancer);
        var dispatch = store.dispatch;
        var chain = [];

        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };
        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return { ...store, dispatch }
    }
}

// redux 利用了react原生的context方法，上面 20180919-myRedux 有讲
// 使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数
// store.dispatch方法可以接受 Promise 对象作为参数

// 异步的做法：就是先发送一个普通的action，然后请求异步数据，等待异步数据回来就再次调用dispatch
// 就是重新定义dispatch方法，让它可处理对象，也可以处理函数


// 将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，
// 一级级将state传下去就很麻烦
// <Provider> 组件 可以让容器组件拿到state
// Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了
