
import React, { Component } from "react";
import "./index.scss";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "_root/webApp/pages/home";
import Wellcome from "_root/webApp/pages/wellcome";

const routes = [
    {
        path: "/home",
        main: Home,
        footer: Home,
    },
    {
        path: "/wellcome",
        main: Wellcome,
        // footer: Wellcome,
    },
];

import SideMenu from "_root/webApp/containers/menu";

class AppLayout extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="layout-box">
        <Layout>
          <Sider>
            <SideMenu/>
          </Sider>
          <Layout>
            {/* 单个路由不用switch */}
            <Header><Route path="/home" render={() => 'Header'} /></Header>
            <Content>
              Content
              <Switch>
                {routes.map((route, i) => (
                  <Route path={route.path} key={i} render={() => <route.main/>} />
                ))}
              </Switch>
            </Content>
            <Footer>
              <Switch>
                {routes.map((route, i) => (
                  // 组件有两种写法啊
                  <Route path={route.path} key={i} children={route.footer ? <route.footer/> : 'Footer'} />
                ))}
              </Switch>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AppLayout;