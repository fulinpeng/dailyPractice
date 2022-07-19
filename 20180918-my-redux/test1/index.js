const appState = {
    title : {
        text : '<h1>标题文本</h1>',
        color : 'red'
    },
    content : {
        text : '<h2>内容段落，内容段落，内容段落</h2>',
        color : 'orange'
    }
}

const renderTitle = (o)=>{
    const targetNode = document.getElementById('title');
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
}

const renderContent = (o)=>{
    const targetNode = document.getElementById('content');
    targetNode.innerHTML = o.text;
    targetNode.style.color = o.color;
}

const renderApp = (state)=>{
    renderTitle(state.title);
    renderContent(state.content);
}

renderApp(appState);