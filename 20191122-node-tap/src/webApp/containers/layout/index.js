
import React, { Component } from "react";
import "./index.scss";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import SideMenu from "_root/webApp/containers/menu";

class AppLayout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="layout-box">
        <Layout>
          <Sider>
            <SideMenu menus={this.props.menus}/>
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content>
              Content
              {this.props.children}
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AppLayout;