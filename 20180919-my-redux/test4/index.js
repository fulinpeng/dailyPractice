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
            let asyncData = {};
            setTimeout(() => {
                // 这就成了异步的数据，3秒之后才更新，页面还能变吗？不能了吧
                asyncData = {color: "red"};
                state.content = {
                    ...state.content,
                    ...asyncData,
                    ...newData
                };
            }, 3000);
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

// redux-thrunk是吧dispatch都封装起来了，我们看不到的，只能传入回调或者，直接传入一个action

renderApp(store.getState()); // 初始化
setTimeout(() => {
    store.dispatch({
        type: "ASYNC_DATA",
        newData : {
            type : 'ASYNC_DATA'
        }
    });
}, 0);
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
