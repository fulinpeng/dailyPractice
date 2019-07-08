const appState = {
    title: {
        text: '<h1>标题文本</h1>',
        color: 'red'
    },
    content: {
        text: '<h2>内容段落，内容段落，内容段落</h2>',
        color: 'orange'
    }
}

const renderTitle = (o) => {
    const targetNode = document.getElementById('title');
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
}

const renderContent = (o) => {
    const targetNode = document.getElementById('content');
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
}

const renderApp = (state) => {
    renderTitle(state.title);
    renderContent(state.content);
}

const dispatch = (action) => {
    const type = action.type;
    const newData = action.newData;
    switch (type) {
        case 'MODEFIED_TITLE':
            appState.title = {
                ...appState.title,
                ...newData
            }
            break;
        case 'MODEFIED_CONTENT':
            appState.content = {
                ...appState.content,
                ...newData
            }
            break;
        default:
            break;
    }
}

renderApp(appState);
setTimeout(() => {
    dispatch({
        type: 'MODEFIED_TITLE',
        newData: {
            color: 'green'
        }
    });
    renderApp(appState);
}, 1000);
setTimeout(() => {
    dispatch({
        type: 'MODEFIED_CONTENT',
        newData: {
            text: '<p>修改后的文本，修改后的文本，修改后的文本</p>',
            color: 'red'
        }
    });
    renderApp(appState);
}, 2000);