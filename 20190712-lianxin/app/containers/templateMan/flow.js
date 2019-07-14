/*
* @Description:模版信息
*/
import React, { Component } from 'react'
import GGEditor, { Flow, RegisterNode } from 'gg-editor'
import { Button, Carousel, Switch ,LocaleProvider,Breadcrumb, Menu,message,Collapse} from 'antd'
import { withPropsAPI } from 'gg-editor'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { withRouter } from 'react-router-dom'
const sucess = require('./sucess.png')
const on = require('./on.png')
const wating = require('./wating.png')

const mapStateToProps = (resultData) => {
  // console.log(resultData)
  // if(!resultData) return {}
  // if (resultData.resultData) {
  //   return {
  //     resultData: resultData.resultData.data.data[0]
  //   }
  // }
}

@connect(null)
class FlowEdit extends Component {

  state = {
    canvasDetails: [],
    param: {
      "caller": "browser",
      "intfName": "",
      "param": {
        "pageNo": 1,
        "pageRange": 10,
        "templateNameOrTemplateKey": this.props.match.params.templateKey
      },
      "timestamp": Date.parse(new Date()),
      "version": "2.5.1"
    },
    tipText:"",
    leftPX:0,
    topPX:0,
    display:"none",
  }

  fetch = (params = {}) => {
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST2')('getTemplateList', this.state.param, (resultData) => {
        //console.log(resultData.data.data.data[0].canvasDetails)
        //this.state.canvasDetails=resultData.data.data.data[0].canvasDetails
        console.log(resultData.data.data.data[0])
        const canvasDetails = JSON.parse(resultData.data.data.data[0].canvasDetails)
        // 测试代码
        // for (let i = 0;i<canvasDetails.nodes.length;i++) {
        //   console.log(canvasDetails.nodes[i])
        //   canvasDetails.nodes[i].state="已完成"
        //   canvasDetails.nodes[i].state_icon_url=sucess
        // }
        this.setState({
          canvasDetails: canvasDetails
        });
    })
    
    //测试GET请求
    // reduxSagaInjector(dispatch, 'ALG_LIST2')('getRequest', {id:1},(resultData) => {
    //     console.log(resultData)
    // })
  }

  componentDidMount() {
    this.fetch()
    const { propsAPI } = this.props
    const page = propsAPI.editor.getCurrentPage()

    // 修改默认的线形

    page.changeAddEdgeModel({
        //shape: 'flow-polyline-round'
        // 先试试这个效果吧
        shape: 'flow-smooth',
        // shape: 'flow-polyline'
    })
    
    // 交互优化，输入只能连接输出
    // 输入锚点不可以连出边
    page.on('hoveranchor:beforeaddedge', ev => {
      
      // 获取鼠标位置
      // var e = event || window.event;
      // console.log(e.clientX,e.clientY)

      // // 获取侧边导航宽度
      // document.getElementsByClassName('ant-layout-sider ')[0].clientWidth
      // console.log(document.getElementsByClassName('ant-layout-sider ')[0].clientWidth)

      // // 获取版本树宽度
      // document.getElementById('flow').offsetLeft
      // console.log(document.getElementById('flow').offsetLeft)

      // this.setState({
      //   leftPX: e.clientX - document.getElementsByClassName('ant-layout-sider ')[0].clientWidth - document.getElementById('flow').offsetLeft- 50,
      //   topPX: e.clientY - 140,
      //   display:"block"
      // })

      if (ev.anchor.type === 'input') {
        ev.cancel = true;
      }
    })
    
    page.on('dragedge:beforeshowanchor', ev => {
      // 只允许目标锚点是输入，源锚点是输出，才能连接
      if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
        ev.cancel = true;
      }
      // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点-【暂时允许多、输入、输出】
      // if (ev.dragEndPointType === 'target' && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
      //   ev.cancel = true;
      // }
      // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
      if (ev.dragEndPointType === 'source' && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
        ev.cancel = true;
      }
    })
  }

  constructor(props) {
      super(props);
  }

  // toolTip = (e) =>{
  //     if (e.item) {
  //       this.state.centerX = e.item.bbox.centerX
  //       this.setState({
  //         tipText:e.item.model.state,
  //         leftPX:e.item.bbox.centerX-107,
  //         topPX:e.item.bbox.centerY-45,
  //         display:"block"
  //       })
  //     }
  // }

  // hideTip = (e) =>{
  //   if (e.item) {
  //     this.setState({
  //       display:"none"
  //     })
  //   }
  // }
  // dragStart = (e) =>{
  //   console.log(e)
  //   this.setState({
  //     display:"none",
  //     dragStartX:e.domX,
  //     dragStartY:e.domY,
  //   })
  // }
  // dragEnd = (e) =>{
  //   console.log(e)
  //   this.setState({
  //     display:"none",
  //     dragEndX:e.domX,
  //     dragEndY:e.domY,
  //   })
  // }

  // edgeClick = (e) => {
  //  console.log(e)
  // }

  render() {
    return(
        <div>
          <Flow className="flow"
          style={{height:window.innerHeight-100,width:window.innerWidth-420}}
          noEndEdge={false}
          data={this.state.canvasDetails}
          // onEdgeClick={(e) => (this.edgeClick(e))}
          // onMouseEnter={(e) => (this.toolTip(e))}
          // onMouseLeave={(e) => (this.hideTip(e))}
          // onDragStart={(e) => (this.dragStart(e))}
          // onDragEnd={(e) => (this.dragEnd(e))}

          // 图形readOnly
          // graph={{ mode: 'readOnly' }}
          /> 
          {
          // 提示框有个bug，先注掉
          // <div className="temp-toolTip"
          //   style={{left:this.state.leftPX,top:this.state.topPX,display:this.state.display}}>
          //     {this.state.tipText}
          //     <div class="triangle-down">
          //     </div>
          // </div>
          // <div className="temp-toolTip"
          // style={{left:this.state.leftPX,top:this.state.topPX,display:this.state.display}}>
          //  节点名称
          //  <div class="triangle-down">
          //  </div>
          // </div>
          }
        </div>
    )
  }
}

export default  withRouter(withPropsAPI(FlowEdit))
