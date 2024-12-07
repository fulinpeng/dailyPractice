const pageConfig = {
    type: "div",
    props: { className: "template" },
    children: [
        {
            type: "h1",
            props: { style: { color: "green" } },
            children: "打印模板标题",
        },
        {
            type: "p",
            children: "这是一段描述内容。",
        },
        {
            type: "table",
            props: { border: 1 },
            children: [
                {
                    type: "tr",
                    children: [
                        { type: "th", children: "列1" },
                        { type: "th", children: "列2" },
                    ],
                },
                {
                    type: "tr",
                    children: [
                        { type: "td", children: "数据1" },
                        { type: "td", children: "数据2" },
                    ],
                },
            ],
        },
    ],
};
export default pageConfig;