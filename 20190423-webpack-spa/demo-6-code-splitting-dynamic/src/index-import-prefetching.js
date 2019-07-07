import React from "react"
import ReactDOM from "react-dom"

import { HashRouter as Router, Route } from "react-router-dom";

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
        <Route path="/" component={Main}>
            <Route path="/main" component={Main} />
            <Route path="/importModule" component={ImportModule} />
        </Route>
    </Router>,
    document.getElementById("root")
)
