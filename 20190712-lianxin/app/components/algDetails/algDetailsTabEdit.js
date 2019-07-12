/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel,Breadcrumb,Menu} from 'antd'
import _ from 'lodash'
import { push } from 'react-router-redux'
import AlgVerMan from '@/containers/verMan/versionMan'
import AlgInfoEdit from '@/containers/algDetails/algInfoEdit'
import AlgInfo from '@/containers/algDetails/algInfo'
import BarChart from '@/containers/algStaInfo/barChart'
import RateArea from '@/containers/algStaInfo/rateArea'
import TimeArea from '@/containers/algStaInfo/timeArea'
import FreArea from '@/containers/algStaInfo/freArea'
import './index.scss'
import intl from 'react-intl-universal';

import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

@connect(null)
class algDetailsTab extends Component {
  state = {
    zoom:""
  }
  reAlgMan  = () => {
    this.props.history.push('/');
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
    return (
      <div>
          <Breadcrumb>
            <Breadcrumb.Item className="crumb"><span style={{cursor:"pointer"}} onClick={this.reAlgMan} className="hover">{intl.get('nav-alg-man')}</span><span className="sub cur"><span className="icon">/</span>{intl.get('btn-vie')}</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-container">
              <Tabs defaultActiveKey="1" className="algDetailsTab" animated="false">
                <TabPane tab={intl.get('alg-detail-tab-basic')} key="1">
                <AlgInfoEdit/>
                </TabPane>
                <TabPane tab={intl.get('alg-detail-tab-version')} key="2">
                <AlgVerMan/>
                </TabPane>
                <TabPane tab={intl.get('alg-detail-tab-static')} key="3" style={{"min-width":'1200px',}}>
                <div style={{"width":'1666px',"margin":"0 auto",zoom:this.state.zoom}}>
                <div>
                    <div className="bar-chart"><BarChart/></div>
                    <div className="rate-area"><RateArea/></div>
                </div>
                <div>
                    <div className="time-area"><TimeArea/></div>
                    <div className="fre-area"><FreArea/></div>
                </div>
                </div>
                </TabPane>
              </Tabs>
          </div>
      </div>
    )
  }
}

export default algDetailsTab
