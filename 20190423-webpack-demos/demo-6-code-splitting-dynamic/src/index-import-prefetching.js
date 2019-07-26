import React from "react"
import ReactDOM from "react-dom"

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import AsyncComponent from './asyncComponent.js';

const Main = AsyncComponent(() => import(
    /* webpackChunkName: "main" */
    /* webpackPrefetch: true */
    './main.js'
));
const ImportModule = AsyncComponent(() => import(
    /* webpackChunkName: "importModule" */
    /* webpackPrefetch: true */
    './importModule.js'
));

ReactDOM.render(
    <Router>
        {/* route外面必须包一层dev不然提示警告 */}
        <div>
            <Route path="/" component={Main}/>
            <Switch>
                <Route path="/main" component={Main} />
                <Route path="/importModule" component={ImportModule} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
)
