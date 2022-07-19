/*
 * @Description: 路由
 */

import React, { Component } from "react";
import { HashRouter as Router, Route} from "react-router-dom";

// 容器组件
import Layout from "_root/webApp/layout";
import Dashboard from "_containers/dashboard";
import Courses from "_containers/courses";
import Forum from "_containers/forum";
import Account from "_containers/account";
import Messages from "_containers/messages";
import Logout from "_containers/logout";
import TestSaga from "_containers/TestSaga";

class WebApp extends Component {
  render() {
    // const { store } = this.props;
    return (
      <Router>
        <Route path="/">
          <Layout>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/courses" component={Courses} />
            <Route path="/forum" component={Forum} />
            <Route path="/account" component={Account} />
            <Route path="/messages" component={Messages} />
            <Route path="/logout" component={Logout} />
            <Route path="/test" component={TestSaga} />
          </Layout>
        </Route>
      </Router>
    );
  }
}

export default WebApp;

