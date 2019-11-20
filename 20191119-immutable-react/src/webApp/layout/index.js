
import React, { Component } from "react";
import "./index.scss";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class AppLayout extends Component {
  constructor(props){
    super(props)
  }

  state = {
  }

  render() {
    return (
      <div className="layout-box">
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Contentssss</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
        {/* {this.props.children} */}
      </div>
    );
  }
}

export default AppLayout;