import React, { Component } from 'react'
import { Tooltip, Divider, message } from 'antd'
import { Toolbar, Command, withPropsAPI } from 'gg-editor'
import  './index.scss'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal';
 
const mapStateToProps = (resultData) => {}

@connect(null)
 
class FlowToolbar extends Component {
  state = {
    param: {
      "caller": "browser",
      "intfName": "",
      "param": {
        "canvasDetails": "",
        "description": "",
        "templateId": this.props.match.params.id,
        "templateItems": [],
        "templateName": this.props.match.params.templateName
      },
      "timestamp": Date.parse(new Date()),
      "version": "2.5.1"
    },
    isFullScreen: false
  }
  constructor(props){
    super(props)
  }
  saveCanvasDetails = (params = {}) => {

    const {dispatch} = this.props
    this.state.param.param.templateItems = []

    // 画布信息
    this.state.param.param.canvasDetails = JSON.stringify(this.props.propsAPI.save())
    let nodes = this.props.propsAPI.save().nodes
    let edges = this.props.propsAPI.save().edges

    // 当画布中没有连线与节点
    if (nodes) {
      //  有连线
      if (edges) {
        console.log("nodes",nodes)
        console.log("edges",edges)

        // 修改输入节点参数为label值
        for (let i = 0; i < nodes.length; i++) {
          if(nodes[i].algType=="INPUT"){
            nodes[i].outputParams=JSON.stringify([{"origin":"","name":nodes[i].label?nodes[i].label:nodes[i].algVer,"remark":"11","type":"file","value":"11"}])
          }
        }

        let result = []
        // 循环nodes 找到itemUid、algType、algVersionId参数
        for (let i = 0; i < nodes.length; i++) {
          result.push({
            "itemUid":nodes[i].id,
            "algType":nodes[i].algType,
            "algVersionId":nodes[i].realId,
            'itemParamMappings':[]
          })
        }

        for (let i = 0; i < result.length; i++) {
          // 循环边
          for (let j = 0; j < edges.length; j++) {
            // 找到tartget为itemUid的边
            if (result[i].itemUid === edges[j].target) {
              // 封装sourceItemUid
              let sourceItemUid = edges[j].source
              // 封装paramKey paramValueKey
              let  paramKey
              let paramValueKey
              let inputParams
              let outputParams
              let inputLength 
              for (let k = 0; k < nodes.length; k++) {
                // 找到该边
                if (result[i].itemUid === nodes[k].id) {
                  // 找到输入参数
                  inputParams = JSON.parse(nodes[k].inputParams)
                }
                if (edges[j].source === nodes[k].id) {
                  outputParams = JSON.parse(nodes[k].outputParams)
                  let inputParams = JSON.parse(nodes[k].inputParams)
                  inputLength = inputParams.length
                }
              }
              paramKey = inputParams[edges[j].targetAnchor].name
              paramValueKey = outputParams[(edges[j].sourceAnchor-inputLength)].name

              result[i].itemParamMappings.push({
                "sourceItemUid":sourceItemUid,
                "paramKey":paramKey,
                "paramValueKey":paramValueKey
              })
            }
          }
        }

        // 对开始节点进行特殊处理
        // 对最后节点进行特殊处理
        for (let i = 0; i < result.length; i++) {

          // 对开始节点特殊处理
          if (result[i].algType==='INPUT') {
            let paramKey
            // 从nodes中独取label or algVer
            for (let j = 0; j < nodes.length; j++) {
              if (result[i].itemUid === nodes[j].id ) {
                paramKey = nodes[j].label?nodes[j].label:nodes[j].algVer
              }
            }
            result[i].itemParamMappings.push({
              paramKey:paramKey
            })
          }
          
          // 对结束节点特殊处理
          if (result[i].algType==='OUTPUT') {
            // 循环改变paramKey参数
            for (let j = 0; j < result[i].itemParamMappings.length; j++) {
              result[i].itemParamMappings[j].paramKey = 'input' + (j + 1)
            }
          }
        }

        console.log("最终结果：",result)
        //return false
        this.state.param.param.templateItems = result

      } else {
        // 当没有edges拿不到层级关系，给个错误提示
        message.error("模板尚不完善，请连线！")
        return false
      }
    } else {
      this.state.param.param.templateItems=[]
    }
    if (sessionStorage.getItem('templateName')) {
      this.state.param.param.templateName = sessionStorage.getItem('templateName')
    }
    reduxSagaInjector(dispatch, 'ALG_LIST2')('templateUpdate', this.state.param, (result) => {
      if(result.data.retCode==0) {
          message.success("保存成功")
      }else {
          message.error("保存失败，请重试！")
      }
    })
  }
  componentDidMount() {
    const _this = this
    sessionStorage.setItem("templateName",this.props.match.params.templateName)
    // 1分钟自动保存一次
    // setInterval(function(){
    //   const {dispatch} = _this.props
    //   param.param.canvasDetails=sessionStorage.getItem("canvasDetails")
    //   reduxSagaInjector(dispatch, 'ALG_LIST2')('templateUpdate', param, (result) => {
    //     //message.success("自动保存成功！")
    //   })
    // }, 60000)
    this.watchFullScreen();
  }

  fullScreen = () => {
    //console.log('fullscreen:',this.state.isFullScreen);

    if (!this.state.isFullScreen) {
      this.requestFullScreen();
    } else {
      this.exitFullscreen();
    }
  };

  //进入全屏
  requestFullScreen = () => {
    //console.log('requestFullScreen')
    let de = document.getElementById("flow")
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen();
    }
  }
  
  //退出全屏
  exitFullscreen = () => {
    let de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
  }

  //监听fullscreenchange事件
  watchFullScreen = () => {
    const _self = this;
    document.addEventListener(
      "fullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.fullscreen
        });
      },
      false
    )

    document.addEventListener(
      "mozfullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.mozFullScreen
        });
      },
      false
    )

    document.addEventListener(
      "webkitfullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.webkitIsFullScreen
        });
      },
      false
    )
  }

  render() {
    return (
      <Toolbar className="toolbar">
        <div onClick={() => this.saveCanvasDetails()} className="save">
            <Tooltip title={intl.get('gg-top-bar-save')} placement="bottom" overlayClassName="tooltip">
              <i className="iconfont">&#xe66c;</i>
            </Tooltip>
        </div>
        <Command name="zoomIn">
          <Tooltip title={intl.get('gg-top-bar-zoom-in')} placement="bottom" overlayClassName="tooltip">
            <i className="iconfont">&#xe6c0;</i>
          </Tooltip>
        </Command>
        <Command name="zoomOut">
          <Tooltip title={intl.get('gg-top-bar-zoom-out')} placement="bottom" overlayClassName="tooltip">
            <i className="iconfont">&#xe6bf;</i>
          </Tooltip>
        </Command>
        <Command name="autoZoom">
          <Tooltip title={intl.get('gg-top-bar-asap-can')} placement="bottom" overlayClassName="tooltip">
            <i className="iconfont">&#xe6bd;</i>
          </Tooltip>
        </Command>
        {
          /*
            <Command name="multiSelect">
              <Tooltip title="多选" placement="bottom" overlayClassName="tooltip">
                <i className="iconfont">&#xe6bd;</i>
              </Tooltip>
            </Command>
            <Command name="addGroup">
              <Tooltip title="成组" placement="bottom" overlayClassName="tooltip">
                <i className="iconfont">&#xe6bd;</i>
              </Tooltip>
            </Command>
            <Command name="unGroup">
              <Tooltip title="解组" placement="bottom" overlayClassName="tooltip">
                <i className="iconfont">&#xe6bd;</i>
              </Tooltip>
            </Command>
           */
        }
        <div onClick={this.fullScreen} className="flow-Toolbar-full-page">
          <Tooltip title={intl.get('gg-top-bar-full-scr')} placement="bottom" overlayClassName="tooltip">
            <i className="iconfont">&#xe6bc;</i>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

export default  withRouter(withPropsAPI(FlowToolbar));
