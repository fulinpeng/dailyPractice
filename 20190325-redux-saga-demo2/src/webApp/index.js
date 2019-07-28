/*
 * @Description: 路由
 */

import React, { Component } from "react";
import { HashRouter as Router, Route} from "react-router-dom";

import ImportComponent from '_util/importComponent.js';

// 容器组件
import Layout from "_root/webApp/layout";

// 不在 package.json 中配置 bundle-loader 可以在引入的时候配
// import dashboardLoder from "bundle-loader?lazy!_containers/asyncModules/dashboard";
// import coursesLoder from "bundle-loader?lazy!_containers/asyncModules/courses";
// import forumLoder from "bundle-loader?lazy!_containers/asyncModules/forum";
// import accountLoder from "bundle-loader?lazy!_containers/asyncModules/account";
// import messagesLoder from "bundle-loader?lazy!_containers/asyncModules/messages";
// import logoutLoder from "bundle-loader?lazy!_containers/asyncModules/logout";
// import testLoder from "bundle-loader?lazy!_containers/asyncModules/test";

// 这里用什么加载方式， ImportComponent 内部就得用对应的方式拿取组件

// 1. require(...) 方式加载：
// const dashboardLoder = require("_containers/asyncModules/dashboard");
// const coursesLoder = require("_containers/asyncModules/courses");
// const forumLoder = require("_containers/asyncModules/forum");
// const accountLoder = require("_containers/asyncModules/account");
// const messagesLoder = require("_containers/asyncModules/messages");
// const logoutLoder = require("_containers/asyncModules/logout");
// const testLoder = require("_containers/asyncModules/test");

// 2. import from 方式加载，ImportComponent 中拿取组件的方式同require
// import dashboardLoder from "_containers/asyncModules/dashboard";
// import coursesLoder from "_containers/asyncModules/courses";
// import forumLoder from "_containers/asyncModules/forum";
// import accountLoder from "_containers/asyncModules/account";
// import messagesLoder from "_containers/asyncModules/messages";
// import logoutLoder from "_containers/asyncModules/logout";
// import testLoder from "_containers/asyncModules/test";

// 3. import(...) 方式加载
// const dashboardLoder = import("_containers/asyncModules/dashboard");
// const coursesLoder = import("_containers/asyncModules/courses");
// const forumLoder = import("_containers/asyncModules/forum");
// const accountLoder = import("_containers/asyncModules/account");
// const messagesLoder = import("_containers/asyncModules/messages");
// const logoutLoder = import("_containers/asyncModules/logout");
// const testLoder = import("_containers/asyncModules/test");

// 处理成懒加载组件
// const Dashboard = ImportComponent(dashboardLoder);
// const Courses = ImportComponent(coursesLoder);
// const Forum = ImportComponent(forumLoder);
// const Account = ImportComponent(accountLoder);
// const Messages = ImportComponent(messagesLoder);
// const Logout = ImportComponent(logoutLoder);
// const Test = ImportComponent(testLoder);

// 4. Bundle组件，预加载懒加载组件（注意要把webpack.config中那个asyncModules别排除掉，也别使用bundle-loader）
import Bundle from '_util/bundle'
const Dashboard = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/dashboard')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Courses = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/courses')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Forum = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/forum')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Account = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/account')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Messages = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/messages')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Logout = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/logout')}>
      {(C) => <C {...props}/>}
  </Bundle>
)
const Test = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'_containers/asyncModules/test')}>
      {(C) => <C {...props}/>}
  </Bundle>
)

class WebApp extends Component {
  render() {
    const { store } = this.props;
    return (
      <Router>
        <Route path="/">
        {/* Route 必须要一个div包一层，不然要提示警告，所以干脆用了这个Layout组建来包裹 */}
          <Layout>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/courses" component={Courses}/>
            <Route path="/forum" component={Forum}/>
            <Route path="/account" component={Account}/>
            <Route path="/messages" component={Messages}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/test" render={()=><Test/>}/>
          </Layout>
        </Route>
      </Router>
    );
  }
}

export default WebApp;
