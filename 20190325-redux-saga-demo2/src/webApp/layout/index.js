
import React, { Component } from "react";
import "./index.scss";
import { NavLink, Route } from 'react-router-dom';

import Bundle from '_util/bundle'
const Welcome = (props) => (
  <Bundle loader={() => import(/* webpackPrefetch: true */'./testLazyLoad')}>
      {(C) => <C {...props}/>}
  </Bundle>
);

const loginUser = {
  name: "Ramkumar k",
  type: "Student"
};

const menu = [
  {
    src: require("../images/Dashboard.png"),
    name: "Dashboard",
    link:'/dashboard'
  },
  {
    src: require("../images/Logout.png"),
    name: "Redux/Saga",
    link:'/test'
  },
  {
    src: require("../images/Courses.png"),
    name: "Courses",
    link:'/courses'
  },
  {
    src: require("../images/Forum.png"),
    name: "Forum",
    link:'/forum'
  },
  {
    src: require("../images/Account.png"),
    name: "Account",
    link:'/account'
  },
  {
    src: require("../images/Messages.png"),
    name: "Messages",
    link:'/messages'
  },
  {
    src: require("../images/Logout.png"),
    name: "Logout",
    link:'/logout'
  }
];

class Layout extends Component {
  constructor(props){
    super(props)
  }

  state = {
    menuState: 0, // 当前导航栏处于第0个
    testLazyLoad: false,
  }

  // 点击导航条，修改路由，当前按钮处于active状态
  changeMenuState = i => {
    this.setState({ menuState: i });
  }
  onClick = () => {
    this.setState({
      testLazyLoad: true
    });
  }

  render() {
    const {menuState} = this.state;
    return (
      <div className="layout-box">
        <aside className="hidden-mobile">
          <div className="user-info">
            <div className="info-pic">
              <img src={require("../images/user-1.png")} />
            </div>
            <div className="info-desc">
              <div className="welcome" onClick={this.onClick}>
                {this.state.testLazyLoad ? <Welcome/> : 'LazyLoad'}
              </div>
              <div className="name">{loginUser.name}</div>
              <div className="type">{loginUser.type}</div>
            </div>
          </div>
          <nav>
            {menu.length
              ? menu.map((v, k) => {
                  return (
                    <NavLink to={v.link} replace key={k} className="nav-link">
                      <div
                        className={`nav-item ${menuState === k ? "active" : ""}`}
                        onClick={this.changeMenuState.bind(this, k)}
                      >
                        <img src={v.src} />
                        <span>{v.name}</span>
                      </div>
                    </NavLink>
                  );
                })
              : null}
          </nav>
        </aside>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;