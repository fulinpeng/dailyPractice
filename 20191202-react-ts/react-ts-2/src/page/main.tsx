import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import View1 from "../component/view1/index";
import View2 from "../component/view2";
import { hot } from "react-hot-loader";

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;



class Main extends Component<{}, {title: string}> {
  constructor(props) {
    super(props);
    this.state = {
      title: "Hello World!"
    };
  }

  render() {
    return (
    <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/view1/">View1</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/view2/">View2</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h2>{this.state.title}</h2>
            <Switch>
              <Route exact path="/" component={View1} />
              <Route path="/view1/" component={View1} />
              <Route path="/view2/" component={View2} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
export default hot(module)(Main);

