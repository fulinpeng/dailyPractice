/*
 * @Description: 顶部导航
  */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import './index.scss'
import { Avatar, Button} from 'antd';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

@connect(null)

// 两种写法都可以
class SignOut extends Component {

  logout = () => {
    const { dispatch } = this.props
    dispatch(push('/auth/login'))
  }

  render() {
    return (
          <span className="user">
            <span className="user-info-container">
              {/*
              <span className="user-img">
                <Avatar size="large" icon="user" />
              </span>
              <span className="username">
                { window.localStorage.uid}
              </span>
                */}
              <Button  onClick={ this.logout }>退出</Button>
            </span>
          </span>
    )
  }
}

export default SignOut
