/*
 * @Description: 路由
 */

import React, { Component } from "react";
import { HashRouter as Router, Route} from "react-router-dom";

// 容器组件
// import Layout from "_root/webApp/layout";
// import Dashboard from "_containers/dashboard";
// import Courses from "_containers/courses";
// import Forum from "_containers/forum";
// import Account from "_containers/account";
// import Messages from "_containers/messages";
// import Logout from "_containers/logout";
// import Test from "_containers/test";

// 借用 AsyncComponent 实现：按需加载
// 借用 webpackPrefetch 实现：预先加载
import AsyncComponent from '_util/asyncComponent.js';

const Layout = AsyncComponent(() => import(
  /* webpackChunkName: "layout" */
  /* webpackPrefetch: true */
  '_root/webApp/layout'
));
const Dashboard = AsyncComponent(() => import(
  /* webpackChunkName: "dashboard" */
  /* webpackPrefetch: true */
  '_containers/dashboard'
));
const Courses = AsyncComponent(() => import(
  /* webpackChunkName: "courses" */
  /* webpackPrefetch: true */
  '_containers/courses'
));
const Forum = AsyncComponent(() => import(
  /* webpackChunkName: "forum" */
  /* webpackPrefetch: true */
  '_containers/forum'
));
const Account = AsyncComponent(() => import(
  /* webpackChunkName: "account" */
  /* webpackPrefetch: true */
  '_containers/Account'
));
const Messages = AsyncComponent(() => import(
  /* webpackChunkName: "messages" */
  /* webpackPrefetch: true */
  '_containers/messages'
));
const Logout = AsyncComponent(() => import(
  /* webpackChunkName: "logout" */
  /* webpackPrefetch: true */
  '_containers/logout'
));
const Test = AsyncComponent(() => import(
  /* webpackChunkName: "test" */
  /* webpackPrefetch: true */
  '_containers/test'
));

class WebApp extends Component {
  render() {
    const { store } = this.props;
    return (
      <Router>
        <Route path="/">
        {/* Route 必须要一个div包一层，不然要提示警告，所以干脆用了这个Layout组建来包裹 */}
          <Layout>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/courses" component={Courses} />
            <Route path="/forum" component={Forum} />
            <Route path="/account" component={Account} />
            <Route path="/messages" component={Messages} />
            <Route path="/logout" component={Logout} />
            <Route path="/test" component={Test} />
          </Layout>
        </Route>
      </Router>
    );
  }
}

export default WebApp;
