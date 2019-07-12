/*
 * @Description: 主布局页面-拼接组件
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Breadcrumb, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { Header, Sider, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
import './header/index.scss'
// 导入其他组件
import SignOut from './header/signOut'
import HeaderContent from '@/components/header/header'
import algorithmManagement from './algMan/algMan'
import LoadingComponent from '@/components/loading/LoadingComponent'
// import algorithmDetails from './algDetails/versionMan'
import algDetailsTab from '@/components/algDetails/algDetailsTab'
import algDetailsTabEdit from '@/components/algDetails/algDetailsTabEdit'
import algDetailsTabVer from '@/components/algDetails/algDetailsTabVer'
import createVersion from './verMan/creVer'
import versionEdit from './verMan/versionEdit'
import versionInfo from './verMan/versionInfo'
import versionMan from './verMan/versionMan'
import dockerMan from './dockerMan/dockerMan' // 镜像列表
import DockerDetailsTab from '@/components/docker/dockerDetailsTab' // 镜像详情tab
import labelMan from './labelMan/labelMan'
import labelManRe from './labelMan/labelManRe'
import algType from './algType/algTypeMan'
import TemplateEdit from './templateMan/templateEdit'
import AlgStatis from './statisReport/algStatis'
import TaskStatis from './statisReport/taskStatis'

// antd内部的国际化
import { LocaleProvider } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'; //不加这个切换中文时，日期组件年是中文，月是英文
import config from '@/config/base.config';
// 项目js的国际化
import intl from 'react-intl-universal';
import enUS from '../locales/en-US.js';
import zhCN from '../locales/zh-CN.js';
const locales = {
  "en-US": enUS,
  "zh-CN": zhCN,
};
console.log('locales', locales);

// 如何解决ggEditor引入报错？重装ggEditor or  yarn install  yarn run dll

import TemplateManList from './templateMan/templateManList'
import TaskManList from './taskMan/taskManList'
import TaskQueue from './taskMan/taskQueue'
import TaskDetail from './taskMan/taskDetail'
import Echarts from './home/echarts'
// 按需加载
import Loadable from 'react-loadable'

@connect(null)
export default class PrimaryHeaderContainer extends Component {
  state = {
    collapsed: false,
    openKeys: sessionStorage.getItem("openKeys") ? [sessionStorage.getItem("openKeys")] : ['sub1'],
    defaultSelectedKeys: sessionStorage.getItem("defaultSelectedKeys") ? [sessionStorage.getItem("defaultSelectedKeys")] : ['1'],
    langType: localStorage.getItem('lang_type') || config.defaultLangType, // localStorage中没有就采用默认值
    initDone: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  getClickInfo = (item, key, keyPath) => {
    sessionStorage.setItem("openKeys", item.keyPath[1])
    sessionStorage.setItem("defaultSelectedKeys", item.keyPath[0])
  }

  componentDidMount() {
    this.loadLocales();
    
  }

  loadLocales() {
    // 需要转一下，因为用了两个插件，一个用的是en_US，一个是en-US
    const currentLocale = this.state.langType == 'en_US' ? 'en-US' : 'zh-CN';
    intl.init({
      currentLocale,
      locales:{
        [currentLocale]: locales[currentLocale],
      }
    }).then(() => {
      this.setState({ initDone: true });
    });
  }

  render() {
    const { match } = this.props
    console.log('this.state.langType', this.state.langType);
    return (
      this.state.initDone ? <LocaleProvider locale={this.state.langType == 'en_US' ? en_US : zh_CN}>
        <Layout className="container">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            width={220}
          >
            <div className="silder-logo">
              <div className="logo">
                <NavLink to="/" exact className="nav-key"></NavLink>
              </div>
            </div>
            <Menu theme="dark"
              mode="inline"
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              style={{ minHeight: window.innerHeight - 50 }}
              defaultOpenKeys={['sub1']}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              onClick={this.getClickInfo}
            >
              <SubMenu
                key="sub1"
                title={<span> <i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe6a8;</i><span className="menu">{intl.get('nav-alg-man')}</span></span>}
              >
                <Menu.Item key="1">
                  <NavLink to="/algMan" exact activeClassName='active' className="nav-key">{intl.get('nav-alg-man')}</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe6aa;</i><span className="menu">{intl.get('nav-dic-man')}</span></span>}
              >
                <Menu.Item key="2">
                  <NavLink to="/labelMan" exact className="nav-key">{intl.get('nav-lab-man')}</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/algType" exact className="nav-key">{intl.get('nav-alg-typ')}</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={<span><i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe6a9;</i><span className="menu">{intl.get('nav-ima-man')}</span></span>}
              >
                <Menu.Item key="4">
                  <NavLink to="/dockerMan" exact className="nav-key">{intl.get('nav-ima-man')}</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe625;</i><span className="menu">{intl.get('nav-tem-man')}</span></span>}
              >
                <Menu.Item key="5">
                  <NavLink to="/templateManList" exact className="nav-key">{intl.get('nav-tem-man')}</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={<span><i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe616;</i><span className="menu">{intl.get('nav-tas-sch')}</span></span>}
              >
                <Menu.Item key="7">
                  <NavLink to="/taskManList" exact className="nav-key">{intl.get('nav-tas-list')}</NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                  <NavLink to="/taskQueue" exact className="nav-key">{intl.get('nav-tas-queue')}</NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                title={<span><i className="iconfont" style={{ color: '#BEBEBE' }}>&#xe616;</i><span className="menu">统计报表</span></span>}
              >
                <Menu.Item key="9">
                  <NavLink to="/algStatis" exact className="nav-key">算法统计</NavLink>
                </Menu.Item>
                <Menu.Item key="10">
                  <NavLink to="/taskStatis" exact className="nav-key">任务统计</NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#2E2F30', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              {/*
               <i className="trigger iconfont"
             type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
             onClick={this.toggle}>&#xe6a6;</i>
               */}
              {/*
             <SignOut/>
             */}
              <HeaderContent />
            </Header>
            <Content style={{ maxHeight: 800 }}>
              <div>
                <Switch>
                  <Route path={`${match.path}`} exact component={Echarts} />
                  <Route path={`${match.path}algMan`} exact component={algorithmManagement} />
                  <Route path={`${match.path}algDetailsTab/:id`} component={algDetailsTab} />
                  <Route path={`${match.path}algDetailsTabVer/:id`} component={algDetailsTabVer} />
                  <Route path={`${match.path}algDetailsTabEdit/:id`} component={algDetailsTabEdit} />
                  <Route path={`${match.path}createVersion`} component={createVersion} />
                  <Route path={`${match.path}versionEdit/:id`} component={versionEdit} />
                  <Route path={`${match.path}versionInfo/:id`} component={versionInfo} />
                  <Route path={`${match.path}versionMan`} component={versionMan} />
                  <Route path={`${match.path}dockerMan`} component={dockerMan} />
                  <Route path={`${match.path}dockerDetail/:id`} component={DockerDetailsTab} />
                  <Route path={`${match.path}labelMan`} component={labelMan} />
                  <Route path={`${match.path}labelManRe`} component={labelManRe} />
                  <Route path={`${match.path}algType`} component={algType} />
                  <Route path={`${match.path}TemplateEdit/:templateKey/:id/:templateName`} component={TemplateEdit} />
                  <Route path={`${match.path}templateManList`} component={TemplateManList} />
                  <Route path={`${match.path}taskManList`} component={TaskManList} />
                  <Route path={`${match.path}taskDetail/:id`} component={TaskDetail} />
                  <Route path={`${match.path}taskQueue`} component={TaskQueue} />
                  <Route path={`${match.path}algStatis`} component={AlgStatis} />
                  <Route path={`${match.path}taskStatis`} component={TaskStatis} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider> : null
    )
  }
}