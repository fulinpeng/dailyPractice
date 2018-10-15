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

const createStore = (state, handler) => {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = action => {
        handler(state, action);
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
        default:
            break;
    }
};

const store = createStore(appState, handleStateChange);
store.subscribe(() => renderApp(store.getState()));

renderApp(store.getState()); // 初始化
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
