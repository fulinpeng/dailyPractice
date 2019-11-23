
import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import routes from "_root/webApp/router";
import AppLayout from "_root/webApp/containers/layout";

// menus在后端维护做菜单权限
const menus = [
    {
        link: 'home',
        name: 'home',
    },
    {
        link: 'wellcome',
        name: 'wellcome',
    },
    {
        link: 'antForm',
        name: 'antForm',
    },
    {
        link: 'antTable',
        name: 'antTable',
    },
]

const AppIndex = (
    <Router>
        <AppLayout menus={menus}>
            <Switch>
                {routes.map((route, i) => (
                    <Route path={route.path} key={i} render={() => <route.main />} />
                ))}
            </Switch>
        </AppLayout>
    </Router>
);

export default AppIndex;