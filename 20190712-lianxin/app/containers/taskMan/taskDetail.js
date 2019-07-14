/*
* @Description:模版编辑
*/
import React, { Component } from 'react'
import GGEditor, { Flow, RegisterNode } from 'gg-editor'
import { withPropsAPI } from 'gg-editor'
import { Button, Carousel, Switch, LocaleProvider, Breadcrumb, Menu, message, Modal } from 'antd'
import '../templateMan/index.scss'
import './index.scss'
import { Row, Col } from 'antd'
import Moment from 'moment'
import { FlowContextMenu } from '@/containers/editor/EditorContextMenu'
import { FlowToolbar } from '@/containers/editor/EditorToolbar'
import EditorItemPanel from '@/containers/editor/EditorItemPanel'
import { FlowDetailPanel } from '@/containers/editor/EditorDetailPanel'
import TemplateInfo from '../templateMan/templateInfo'
import FlowEdit from './flow'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import Config from '@/config/base.config'
import intl from 'react-intl-universal';

const sucess = require('./sucess.png')
const on = require('./on.png')
const wating = require('./wating.png')
const error = require('./error.png')

@connect(null)
class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: true,
    GGEditorHeight: window.innerHeight - 100,
    infoData: {}
  }

  fetchTaskDetail = (params = {}) => {
    const { dispatch } = this.props;
    reduxSagaInjector(dispatch, '')('getTaskDetail', params, (resultData) => {
      let canvasDetails = JSON.parse(resultData.data.data.canvasDetails);
      console.log('@@@@@@@@@@@@@@@@@@-getTaskDetail:', canvasDetails.nodes);

      this.setState({
        infoData: {
          ...resultData.data.data,
          canvasDetails

          // canvasDetails: {
          //   nodes: [
          //     { type: "node", size: "220*40", shape: "1*1", color: "#141420", label: "1.0.0", realId: 9, x: 474, y: 193, id: 'ea1184e8', index: 0, outputParams: '[]', inputParams: '[]' },
          //     { type: "node", size: "220*40", shape: "1*1", color: "#141420", label: "1.0.1", realId: 10, x: 574, y: 293, id: '481fbb1a', index: 2, outputParams: '[]', inputParams: '[]' },
          //   ],
          //   edges: [
          //     {
          //       shape: "flow-polyline-round",
          //       source: 'ea1184e8',
          //       sourceAnchor: 2,
          //       target: '481fbb1a',
          //       targetAnchor: 0,
          //       id: '7989ac70',
          //       index: 0,
          //     },
          //   ]
          // }
        }
      }, () => {
        this.fetchTaskProgress({ id: this.props.match.params.id });
      });
    })
  }

  fetchTaskProgress = (params = {}) => {
    const { dispatch } = this.props;
    reduxSagaInjector(dispatch, '')('getTaskProgress', params, (resultData) => {
      let nowNodes = resultData.data.data;
      let nodes = (this.state.infoData.canvasDetails &&
        this.state.infoData.canvasDetails.nodes &&
        this.state.infoData.canvasDetails.nodes.length) ? [...this.state.infoData.canvasDetails.nodes] : null;

      console.log('getTaskProgress', resultData.data, nodes, nowNodes);
      if (!nodes) return;
      for (let i = 0; i < nodes.length; i++) {
        let item = nodes[i];
        for (let j = 0; j < nowNodes.length; j++) {
          let nowItem = nowNodes[j];
          if (nowItem.itemUid == item.id) {
            // 修改状态
            switch (nowItem.status) {
              case "新建":
                nodes[i] = {
                  ...item,
                  runnerId: nowItem.runnerId,
                  state_icon_url: wating
                }
                break;
              case "完成":
                nodes[i] = {
                  ...item,
                  runnerId: nowItem.runnerId,
                  state_icon_url: sucess
                }
                break;
              default:
                nodes[i] = {
                  ...item,
                  runnerId: nowItem.runnerId,
                  state_icon_url: on
                };
                break;
            }
            if (nowItem.error == 1) {
              nodes[i] = {
                ...item,
                runnerId: nowItem.runnerId,
                state_icon_url: error
              }
            }
            break;
          }
        }
      }
      console.log('last --- canvasDetails', nodes);
      this.setState({
        infoData: {
          ...this.state.infoData,
          canvasDetails: {
            ...this.state.infoData.canvasDetails,
            nodes
          }
        }
      }, () => {
        if (this.state.infoData.status == '完成') {
          if (this.timer) clearTimeout(this.timer);
          return;
        }
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.fetchTaskDetail({ id: this.props.match.params.id });
        }, Config.timer || 30000);
      })
    })
  }


  componentDidMount() {
    clearInterval(this.timer);
    this.fetchTaskDetail({ id: this.props.match.params.id });
    this.addDragHandle();
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  addDragHandle = () => {
    const dragBar = this.refs.drag_bar;
    dragBar.addEventListener('mousedown', this.mousedownForDrag);
  }

  mousedownForDrag = (e) => {
    e = e || window.e;
    let startX = e.pageX,dis = 0;
    let editorSidebarRight = document.getElementById('editor_sidebar_right');
    let targetX = editorSidebarRight.offsetLeft;
    let targetW = editorSidebarRight.offsetWidth;
    let w = window.innerWidth;
    let docMousemoveForDrag = (e) => {
      e = e || window.e;
      let endX = e.pageX;
      dis = endX - startX;
      if (targetW - dis > 800 ) {
        editorSidebarRight.style.width = '800px';
      } else if (targetW - dis < 350 ) {
        editorSidebarRight.style.width = '350px';
      } else {
        editorSidebarRight.style.width = (targetW - dis) + 'px';
      }
    }
    let docMouseupForDrag = () => {
      document.removeEventListener('mousemove', docMousemoveForDrag);
      document.removeEventListener('mouseup', docMouseupForDrag);
    }
    document.addEventListener('mousemove', docMousemoveForDrag);
    document.addEventListener('mouseup', docMouseupForDrag);

  }

  operation = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  renderAuthor(x, y) {
    // console.log(x,y)
    let anchor = []
    for (let i = 1; i < (x + 1); i++) {
      anchor.push([(1 / (x + 1) * i), 0, {
        type: 'input'
      }])
    }
    for (let i = 1; i < (y + 1); i++) {
      anchor.push([(1 / (y + 1) * i), 1, {
        type: 'output'
      }])
    }
    return anchor
  }

  toTaskManList  = () => {
    this.props.history.push('/taskManList');
  }

  subStr(str, len){
    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
    // 当字符串字节长度小于指定的字节长度时
    if (str.replace(regexp, "aa").length <= len) {
      return str;
    }
    // 假设指定长度内都是中文
    var m = Math.floor(len/2);
    for (var i = m, j = str.length; i < j; i++) {
      // 当截取字符串字节长度满足指定的字节长度
      if (str.substring(0, i).replace(regexp, "aa").length >= len) {
        return str.substring(0, i);
      }
    }
    return str;
  }
  
  strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
  }

  
  handleStatusClass = (text) => {
    let res = '';
    // 0:准备，10:执行中, 100:完成, -1:异常，80:取消，50:暂停
    switch (text) {
      case '准备': res = 'ceate';
        break;
      case '执行中': res = 'ongoing';
        break;
      case '完成': res = 'finish';
        break;
      case '异常': res = 'abnormal';
        break;
      case '暂停': res = 'stop';
        break;
      case '取消': res = 'cancel';
        break;
      default: res = '';
    }
    return res;
  }

  render() {
    const { infoData } = this.state;
    const registerNodeConfig = {
      draw: (item) => {
        console.log('render--item', item);
        const group = item.getGraphicGroup();
        const model = item.getModel();
        const width = 220;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 20;
        const keyShape = group.addShape('rect', {
          attrs: {
            x,
            y,
            width,
            height,
            radius: borderRadius,
            fill: '#722ED1',
            stroke: '#464662',
          },
        });

        // // 左侧色条
        // group.addShape('path', {
        //   attrs: {
        //     path: [
        //       ['M', x, y + borderRadius],
        //       ['L', x, y + height - borderRadius],
        //       ['A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height],
        //       ['L', x + borderRadius, y],
        //       ['A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius],
        //     ],
        //     fill: this.color_type,
        //   },
        // });
        //

        // 样式有重叠再覆盖一层
        group.addShape('rect', {
          attrs: {
            x,
            y,
            width,
            height,
            radius: borderRadius,
            fill: '#141420',
            stroke: '#464662',
          },
        })

        // 绘制背景小矩形
        // group.addShape('rect', {
        //   attrs: {
        //     x: -88,
        //     y: -8,
        //     width: 16,
        //     height: 16,
        //     fill: '#383854',
        //     stroke: '#383854'
        //   }
        // })

        //类型 logo  需要在线地址
        // group.addShape('image', {
        //   attrs: {
        //     img: item.model.type_icon_url,
        //     x: x + 16,
        //     y: y + 12,
        //     width: 20,
        //     height: 16,
        //   },
        // });

        // 名称文本
        // 新版本已经去掉label字段，为兼容已经完成的模板，保留label字段
        // 若label字段存在，表明是之间新建的节点，否则为新建节点
        let  label = model.label ? model.label : model.algName+"/"+model.alias+"/"+model.algVer

        // 对字符长度进行判断，超出省略号
        if (this.strlen(label) > 22) {
          label = this.subStr(label, 22) + '...'
        }

        group.addShape('text', {
          attrs: {
            text: label,
            x: x + 128,
            y: y + 15,
            textAlign: 'center',
            textBaseline: 'top',
            fill: '#DBE2EA',
          },
        });

        // 状态 logo
        group.addShape('image', {
          attrs: {
            img: item.model.state_icon_url,
            x: -89,
            y: -9,
            width: 18,
            height: 18,
          },
        });

        return keyShape
      }
    }

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item className="crumb"><span  style={{cursor:"pointer"}} onClick={this.toTaskManList} className="hover">{intl.get('nav-tas-sch')}</span><span className="sub cur"><span className="icon">/</span>{intl.get('task-information')}</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-container">
          <div className="ggEditor">
            <GGEditor className="editor" style={{ height: this.state.GGEditorHeight }}>
              <Row type="flex" className="editor-hd task_editor_hd">
                <Col span={24}>
                  <FlowToolbar />
                </Col>
              </Row>
              <Row type="flex" className="editor-bd">
                {this.state.collapsed && <Col className="editor-sidebar editor-sidebar-left task_left">
                  <div className="task_left_title">{intl.get('task-information')}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-id')}</span>{infoData.id || '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-template')}</span>{infoData.templateName || '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-cre-date')}</span>{(infoData.createTime || infoData.createTime === 0) ? Moment(infoData.createTime*1000).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-begin-time')}</span>{infoData.startTime ? Moment(infoData.startTime*1000).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-end-time')}</span>{infoData.endTime ? Moment(infoData.endTime*1000).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-cre-user')}</span>{infoData.userId == '0' ? infoData.userId : (infoData.userId || '--')}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-list-inv')}</span>{infoData.platform || '--'}</div>
                  <div className="task_left_item"><span className="item_name">{intl.get('list-status')}</span><span className={this.handleStatusClass(infoData.status)}>{infoData.status || '--'}</span></div>
                  <div className="task_left_item"><span className="item_name">{intl.get('task-is-normal')}</span><span className={infoData.error == 1 ? 'error' : ''}>{infoData.error == 1 ? '异常' : '正常'}</span></div>
                </Col>}
                <div className="item-panel-operation" onClick={() => this.operation()} style={{ left: this.state.collapsed ? '283px' : '-37px' }}>
                  <div className="item-panel-trapezoid"></div>
                  <div className="item-panel-triangle"></div>
                </div>
                <Col className="editor-content" style={{ left: this.state.collapsed ? '320px' : '0px' }} id="flow">
                  <FlowEdit taskId={this.props.match.params.id} canvasDetails={this.state.infoData.canvasDetails || null} />
                  <RegisterNode
                    name="node-base"
                    config={registerNodeConfig}
                  />
                  <RegisterNode name="0*0" config={{ anchor: this.renderAuthor(0, 0) }} extend="node-base" />
                  <RegisterNode name="0*1" config={{ anchor: this.renderAuthor(0, 1) }} extend="node-base" />
                  <RegisterNode name="0*2" config={{ anchor: this.renderAuthor(0, 2) }} extend="node-base" />
                  <RegisterNode name="0*3" config={{ anchor: this.renderAuthor(0, 3) }} extend="node-base" />
                  <RegisterNode name="0*4" config={{ anchor: this.renderAuthor(0, 4) }} extend="node-base" />
                  <RegisterNode name="0*5" config={{ anchor: this.renderAuthor(0, 5) }} extend="node-base" />

                  <RegisterNode name="1*0" config={{ anchor: this.renderAuthor(1, 0) }} extend="node-base" />
                  <RegisterNode name="1*1" config={{ anchor: this.renderAuthor(1, 1) }} extend="node-base" />
                  <RegisterNode name="1*2" config={{ anchor: this.renderAuthor(1, 2) }} extend="node-base" />
                  <RegisterNode name="1*3" config={{ anchor: this.renderAuthor(1, 3) }} extend="node-base" />
                  <RegisterNode name="1*4" config={{ anchor: this.renderAuthor(1, 4) }} extend="node-base" />
                  <RegisterNode name="1*5" config={{ anchor: this.renderAuthor(1, 5) }} extend="node-base" />

                  <RegisterNode name="2*0" config={{ anchor: this.renderAuthor(2, 0) }} extend="node-base" />
                  <RegisterNode name="2*1" config={{ anchor: this.renderAuthor(2, 1) }} extend="node-base" />
                  <RegisterNode name="2*2" config={{ anchor: this.renderAuthor(2, 2) }} extend="node-base" />
                  <RegisterNode name="2*3" config={{ anchor: this.renderAuthor(2, 3) }} extend="node-base" />
                  <RegisterNode name="2*4" config={{ anchor: this.renderAuthor(2, 4) }} extend="node-base" />
                  <RegisterNode name="2*5" config={{ anchor: this.renderAuthor(2, 5) }} extend="node-base" />

                  <RegisterNode name="3*0" config={{ anchor: this.renderAuthor(3, 0) }} extend="node-base" />
                  <RegisterNode name="3*1" config={{ anchor: this.renderAuthor(3, 1) }} extend="node-base" />
                  <RegisterNode name="3*2" config={{ anchor: this.renderAuthor(3, 2) }} extend="node-base" />
                  <RegisterNode name="3*3" config={{ anchor: this.renderAuthor(3, 3) }} extend="node-base" />
                  <RegisterNode name="3*4" config={{ anchor: this.renderAuthor(3, 4) }} extend="node-base" />
                  <RegisterNode name="3*5" config={{ anchor: this.renderAuthor(3, 5) }} extend="node-base" />

                  <RegisterNode name="4*0" config={{ anchor: this.renderAuthor(4, 0) }} extend="node-base" />
                  <RegisterNode name="4*1" config={{ anchor: this.renderAuthor(4, 1) }} extend="node-base" />
                  <RegisterNode name="4*2" config={{ anchor: this.renderAuthor(4, 2) }} extend="node-base" />
                  <RegisterNode name="4*3" config={{ anchor: this.renderAuthor(4, 3) }} extend="node-base" />
                  <RegisterNode name="4*4" config={{ anchor: this.renderAuthor(4, 4) }} extend="node-base" />
                  <RegisterNode name="4*5" config={{ anchor: this.renderAuthor(4, 5) }} extend="node-base" />

                  <RegisterNode name="5*0" config={{ anchor: this.renderAuthor(5, 0) }} extend="node-base" />
                  <RegisterNode name="5*1" config={{ anchor: this.renderAuthor(5, 1) }} extend="node-base" />
                  <RegisterNode name="5*2" config={{ anchor: this.renderAuthor(5, 2) }} extend="node-base" />
                  <RegisterNode name="5*3" config={{ anchor: this.renderAuthor(5, 3) }} extend="node-base" />
                  <RegisterNode name="5*4" config={{ anchor: this.renderAuthor(5, 4) }} extend="node-base" />
                  <RegisterNode name="5*5" config={{ anchor: this.renderAuthor(5, 5) }} extend="node-base" />

                </Col>
                <Col id="editor_sidebar_right" className="editor-sidebar editor-sidebar-right">
                  <div ref="drag_bar" className="drag_bar"></div>
                  <FlowDetailPanel />
                </Col>
              </Row>
              <FlowContextMenu />
            </GGEditor>
          </div>
        </div>
      </div>
    )
  }
}
export default withPropsAPI(TaskDetail);