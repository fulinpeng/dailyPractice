/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
import {withRouter} from "react-router-dom";
import _ from 'lodash'
import DockerDetailOne from '@/containers/dockerMan/dockerDetailOne'
import './index.scss'
import intl from 'react-intl-universal';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const mapStateToProps = ({algTypeList}) => {
  if(!algTypeList) return {}
  // return {
  //   algTypeList: algTypeList.data
  // }
}

@connect(null)
class ImageDetailsTab extends Component {
  state = {
    zoom:""
  }
  callback  = (key) => {
    // console.log(key)
    // const {dispatch} = this.props
    // const { match } = this.props
    // console.log( match)
    // dispatch(push('/FreArea'))
  }
  dockerMan  = () => {
    this.props.history.push('/dockerMan');
  }
  componentDidMount() {
   let zoom = (document.body.clientWidth-240)/1663
   if (zoom>0.72) {
     zoom = (document.body.clientWidth-240)/1663
   }else {
     zoom =0.72
   }
    this.setState({
      zoom:zoom
    })
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item className="crumb">
            <span style={{cursor:"pointer"}} onClick={this.dockerMan} className="hover">{intl.get('nav-ima-man')}</span>
            <span className="sub cur">
              <span className="icon">/</span>{intl.get('btn-vie')}
            </span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-container">
          <Tabs defaultActiveKey="1" className="algDetailsTab" animated="false" onChange={this.callback}>
            <TabPane tab={intl.get('alg-detail-tab-basic')} key="1">
              <DockerDetailOne id={this.props.match.params.id}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default withRouter(ImageDetailsTab);
