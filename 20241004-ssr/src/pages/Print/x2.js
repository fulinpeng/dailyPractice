async function fetchTemplateData(templateId) {
    const response = await fetch(`/api/templates/${templateId}`);
    return response.json();
}

function App() {
    const [templateConfig, setTemplateConfig] = React.useState(null);

    React.useEffect(() => {
        fetchTemplateData("123").then(setTemplateConfig);
    }, []);

    if (!templateConfig) {
        return <div>加载中...</div>;
    }

    return parseConfigToComponent(templateConfig);
}
