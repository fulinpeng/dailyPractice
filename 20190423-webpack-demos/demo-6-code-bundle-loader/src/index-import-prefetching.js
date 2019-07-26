import ReactDOM from "react-dom"
import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import ImportComponent from './importComponent.js';

import mainLoader from './asyncModules/main.js'
import importModuleLoader from './asyncModules/importModule.js'

// import(/* webpackPrefetch: true */ './asyncModules/main.js');

const Main = ImportComponent(mainLoader);
const ImportModule = ImportComponent(importModuleLoader);

ReactDOM.render(
    <Router>
        {/* route外面必须包一层dev不然提示警告 */}
        <div>
            <Route path="/" component={Main} />
            <Switch>
                <Route path="/main" component={Main} />
                <Route path="/importModule" component={ImportModule} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
)

