/*
 * @Description: 顶部  导航
  */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import './index.scss'
import { Avatar, Button } from 'antd';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import config from '@/config/base.config';

const local_lang_type = localStorage.getItem('lang_type');
@connect(null)

// 两种写法都可以
class HeaderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langType: local_lang_type && local_lang_type !== 'undefined' ? local_lang_type : config.defaultLangType, // localStorage中没有就采用默认值
    }
  }
  changeLang = () => {
    let langType = this.state.langType;
    let lang_type;
    switch (langType) {
      case 'en_US':
        langType = 'zh_CN';
        lang_type = 'zh_CN';
        break;
      case 'zh_CN':
        langType = 'en_US';
        lang_type = 'en_US';
        break;
      default:
        langType = 'zh_CN';
        lang_type = 'zh_CN';
        break;
    }
    this.setState({ langType }, () => {
      localStorage.setItem('lang_type', lang_type);
      window.location.reload();
    })
  }
  render() {
    return (
      <div className="header-info">
        <i className="iconfont help">&#xe63b;</i>
        {/*}<i className="iconfont head"> &#xe65f;</i>*/}
        <span className="change_lang" onClick={this.changeLang}>
          {this.state.langType == 'en_US' ? 'ENG' : '中文'}
        </span>
        <img src={require('./user.png')} className="head" />
      </div>
    )
  }
}

export default HeaderContent
