/*
* @Description:模版编辑
*/
import React, { Component } from 'react'
import GGEditor, { Flow, RegisterNode } from 'gg-editor'
import { withPropsAPI } from 'gg-editor'
import { Button, Carousel, Switch ,LocaleProvider,Breadcrumb, Menu,message} from 'antd'
import './index.scss'
import { Row, Col } from 'antd'
import {withRouter} from "react-router-dom";
import EditorMinimap from '@/containers/editor/EditorMinimap'
import { FlowContextMenu } from '@/containers/editor/EditorContextMenu'
import { FlowToolbar } from '@/containers/editor/EditorToolbar'
import EditorItemPanel from '@/containers/editor/EditorItemPanel'
import { FlowDetailPanel } from '@/containers/editor/EditorDetailPanel'
import TemplateInfo from './templateInfo'
import FlowEdit from './flow'
import intl from 'react-intl-universal';

class FlowPage extends  React.Component {

  state = {
    collapsed: true,
    GGEditorHeight:window.innerHeight-100,
  }
  
  operation = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      })
  }
   
  renderFlow() {
    return (
      <FlowEdit />
    )
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
  componentDidMount() {
    this.addDragHandle();
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
      } else if (targetW - dis < 320 ) {
        editorSidebarRight.style.width = '320px';
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
  renderAuthor(x,y) {
    // console.log(x,y)
    let anchor = []
    for (let i = 1; i<(x + 1); i++) {
      anchor.push([(1/(x + 1) * i),0,{
        type: 'input'
      }])
    }
    for (let i = 1; i<(y + 1); i++) {
      anchor.push([(1/(y + 1) * i), 1, {
        type: 'output'
      }])
    }
    return anchor
  }

  return  = () => {
    this.props.history.push('/templateManList');
  }

 render() {
   let _this =this
   return (
     <div>
       <Breadcrumb>
         <Breadcrumb.Item className="crumb"><span className="hover" style={{cursor:"pointer"}} onClick={this.return}>{intl.get('nav-tem-man')}</span><span className="sub cur"><span className="icon">/</span>{intl.get('tem-detail-edit')}</span></Breadcrumb.Item>
       </Breadcrumb>
       <div className="main-container">
         <div className="ggEditor">
             <GGEditor className="editor" style={{height:this.state.GGEditorHeight}}>
               <Row type="flex" className="editor-hd">
                 <Col span={24}>
                   <FlowToolbar />
                 </Col>
               </Row>
               <Row type="flex" className="editor-bd">
                 <Col  className="editor-sidebar editor-sidebar-left" style={{display:this.state.collapsed ? 'block' : 'none'}}>
                   <EditorItemPanel />
                   <TemplateInfo/>
                 </Col>
                 <div class="item-panel-operation" onClick={() => this.operation()} style={{left:this.state.collapsed ? '283px' : '-37px'}}>
                   <div class="item-panel-trapezoid"></div>
                   <div class="item-panel-triangle"></div>
                 </div>
                 <Col  className="editor-content" style={{left:this.state.collapsed ? '320px' : '0px'}} id="flow">
                    {this.renderFlow()}
                    <RegisterNode
                      name="node-base"
                      config={{
                        draw(item) {
                          console.log(item)
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
                              stroke:'#464662',
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
                              stroke:'#464662',
                            },
                          })
                          
                          if (!item.model.state_icon_url) {
                            //绘制背景小矩形
                            group.addShape('rect', {
                              attrs: {
                                x: -88,
                                y: -8,
                                width: 16,
                                height: 16,
                                fill: '#383854',
                                stroke: '#383854'
                              }
                            })
                          }

                          // 类型 logo  需要在线地址
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
                          if (_this.strlen(label) > 22) {
                            label = _this.subStr(label, 22) + '...'
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

                          // 名称文本
                          // const state = model.state ? model.state : this.label;

                          // group.addShape('text', {
                          //   attrs: {
                          //     text: state,
                          //     x: x + 280,
                          //     y: y + 13,
                          //     textAlign: 'right',
                          //     textBaseline: 'top',
                          //     fill: '#DBE2EA',
                          //   },
                          // });

                          // // 状态 logo
                          group.addShape('image', {
                            attrs: {
                              img: item.model.state_icon_url,
                              x: -88,
                              y: -8,
                              width: 18,
                              height: 16,
                            },
                          });

                          return keyShape
                        },
                      }}
                    />
                    <RegisterNode name="0*0" config={{anchor: this.renderAuthor(0,0)}} extend="node-base"/>
                    <RegisterNode name="0*1" config={{anchor: this.renderAuthor(0,1)}} extend="node-base"/>
                    <RegisterNode name="0*2" config={{anchor: this.renderAuthor(0,2)}} extend="node-base"/>
                    <RegisterNode name="0*3" config={{anchor: this.renderAuthor(0,3)}} extend="node-base"/>
                    <RegisterNode name="0*4" config={{anchor: this.renderAuthor(0,4)}} extend="node-base"/>
                    <RegisterNode name="0*5" config={{anchor: this.renderAuthor(0,5)}} extend="node-base"/>

                    <RegisterNode name="1*0" config={{anchor: this.renderAuthor(1,0)}} extend="node-base"/>
                    <RegisterNode name="1*1" config={{anchor: this.renderAuthor(1,1)}} extend="node-base"/>
                    <RegisterNode name="1*2" config={{anchor: this.renderAuthor(1,2)}} extend="node-base"/>
                    <RegisterNode name="1*3" config={{anchor: this.renderAuthor(1,3)}} extend="node-base"/>
                    <RegisterNode name="1*4" config={{anchor: this.renderAuthor(1,4)}} extend="node-base"/>
                    <RegisterNode name="1*5" config={{anchor: this.renderAuthor(1,5)}} extend="node-base"/>

                    <RegisterNode name="2*0" config={{anchor: this.renderAuthor(2,0)}} extend="node-base"/>
                    <RegisterNode name="2*1" config={{anchor: this.renderAuthor(2,1)}} extend="node-base"/>
                    <RegisterNode name="2*2" config={{anchor: this.renderAuthor(2,2)}} extend="node-base"/>
                    <RegisterNode name="2*3" config={{anchor: this.renderAuthor(2,3)}} extend="node-base"/>
                    <RegisterNode name="2*4" config={{anchor: this.renderAuthor(2,4)}} extend="node-base"/>
                    <RegisterNode name="2*5" config={{anchor: this.renderAuthor(2,5)}} extend="node-base"/>

                    <RegisterNode name="3*0" config={{anchor: this.renderAuthor(3,0)}} extend="node-base"/>
                    <RegisterNode name="3*1" config={{anchor: this.renderAuthor(3,1)}} extend="node-base"/>
                    <RegisterNode name="3*2" config={{anchor: this.renderAuthor(3,2)}} extend="node-base"/>
                    <RegisterNode name="3*3" config={{anchor: this.renderAuthor(3,3)}} extend="node-base"/>
                    <RegisterNode name="3*4" config={{anchor: this.renderAuthor(3,4)}} extend="node-base"/>
                    <RegisterNode name="3*5" config={{anchor: this.renderAuthor(3,5)}} extend="node-base"/>

                    <RegisterNode name="4*0" config={{anchor: this.renderAuthor(4,0)}} extend="node-base"/>
                    <RegisterNode name="4*1" config={{anchor: this.renderAuthor(4,1)}} extend="node-base"/>
                    <RegisterNode name="4*2" config={{anchor: this.renderAuthor(4,2)}} extend="node-base"/>
                    <RegisterNode name="4*3" config={{anchor: this.renderAuthor(4,3)}} extend="node-base"/>
                    <RegisterNode name="4*4" config={{anchor: this.renderAuthor(4,4)}} extend="node-base"/>
                    <RegisterNode name="4*5" config={{anchor: this.renderAuthor(4,5)}} extend="node-base"/>

                    <RegisterNode name="5*0" config={{anchor: this.renderAuthor(5,0)}} extend="node-base"/>
                    <RegisterNode name="5*1" config={{anchor: this.renderAuthor(5,1)}} extend="node-base"/>
                    <RegisterNode name="5*2" config={{anchor: this.renderAuthor(5,2)}} extend="node-base"/>
                    <RegisterNode name="5*3" config={{anchor: this.renderAuthor(5,3)}} extend="node-base"/>
                    <RegisterNode name="5*4" config={{anchor: this.renderAuthor(5,4)}} extend="node-base"/>
                    <RegisterNode name="5*5" config={{anchor: this.renderAuthor(5,5)}} extend="node-base"/>

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
export default withRouter(withPropsAPI(FlowPage))
