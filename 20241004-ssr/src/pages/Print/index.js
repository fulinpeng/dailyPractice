import React from "react";
import pageConfig from "./pageConfig.js";
import parseConfigToComponent from "./parseConfigToComponent.js";

function Print() {
    const componentTree = parseConfigToComponent(pageConfig);

    return (
        <div>
            <h2>React 动态模板</h2>
            {componentTree}
        </div>
    );
}
export default Print;
