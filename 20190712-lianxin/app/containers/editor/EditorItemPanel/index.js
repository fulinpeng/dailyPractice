import React, { Component } from 'react'
import { Card,Input,Tree,Icon } from 'antd';
const Search = Input.Search
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { ItemPanel, Item,  RegisterNode } from 'gg-editor'
const { TreeNode } = Tree
const DirectoryTree = Tree.DirectoryTree
import  './index.scss'
import intl from 'react-intl-universal';

const mapStateToProps = ({ result }) => {
  if(!result) return {}
  return {
    result: result
  }
}

@connect(null)
class EditorItemPanel extends React.Component {

  state = {
    data:[],
    param:{
      "caller": "browser",
      "param": {
        "obj": "string",
        "uid": "string"
      },
      "timestamp": Date.parse(new Date()),
      "version": "2.5.1"
    },
    paramSearch:{
      "caller": "browser",
      "param": {
        "obj": "",
        "uid": ""
      },
      "timestamp": Date.parse(new Date()),
      "version": "2.5.1"
    }
  }

  renderTreeNodes = data => data.map((item) => {
    item.title=item.typeName
    item.children=item.algList
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodesSecound(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />
  })

  renderTreeNodesSecound = data => data.map((item) => {
    item.title=item.algName
    item.children=item.verList
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodesThree(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />
  })

  renderTreeNodesThree = data => data.map((item) => {
    // 输入、输出节点特殊处理
    if(item.algType=="INPUT") {
      item.outputParams='[{"origin":"","name":"a","remark":"11","type":"file","value":"11"}]'
      item.inputParams="[]"
    }
    if(item.algType=="OUTPUT") {
      item.outputParams="[]"
      item.inputParams='[{"origin":"","name":"a","remark":"11","type":"file","value":"11"}]'
    }
    item.key=item.algVer
    const shape = JSON.parse(item.inputParams).length+'*'+JSON.parse(item.outputParams).length
    item.title=<Item
      type="node"
      size="220*40"
      shape={shape}
      model={{
        color: '#141420',
        algVer: item.algVer,
        alias:item.alias,
        algName:item.algName,
        outputParams:item.outputParams,
        inputParams:item.inputParams,
        realId:item.id,
        algType:item.algType,
        state_icon_url:"",
        state:"",
      }}
    >
    {item.algName+"/"+item.alias+"/"+item.algVer}
    </Item>
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
        </TreeNode>
      );
    }
    return <TreeNode {...item} />
  })


  componentDidMount()  {
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALGTYPElIST')('algAcwTree', this.state.param, (result) => {
    console.log(result)
     this.setState({
       data:result.data.data
     })
    })
  }


  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    // 这里点击好像没有什么用，已经能够绑定参数
    console.log(JSON.parse(info.node.props.outputParams))
  }

  handSearch = (value) => {
    console.log(value.length)
    const {dispatch} = this.props
    if (value.length==0) {
      reduxSagaInjector(dispatch, 'ALGTYPElIST')('algAcwTree', this.state.param, (result) => {
       this.setState({
         data:result.data.data
       })
      })
    }else {
      this.state.paramSearch.param.obj=value
      reduxSagaInjector(dispatch, 'ALGTYPElIST')('algAcwFuzzyTree', this.state.paramSearch, (result) => {
       this.setState({
         data:result.data.data
       })
      })
    }
  }

  render() {

    const customLabel = (
      <span className="cus-label"></span>
    )

    return (
      <div>
          <div className="item-panel-head">
              <span className="item-panel-head-name">{intl.get('tem-detail-tit')}</span>
              <span className="item-panel-head-tip">({intl.get('tem-detail-tit-tip')})</span>
          </div>
          <Search
             placeholder={intl.get('tem-detail-search')}
             onSearch={(value) => this.handSearch(value)}
             enterButton
             style={{ width: 300,height:34 }}
             className="item-panel-search  search"
           />
          <div  style={{height:window.innerHeight-390,overflowX:'hidden'}}>
          <Tree
            showLine
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            onSelect={this.onSelect}
            className="tempalte-list-tree"
          >
           {this.renderTreeNodes(this.state.data)}
          </Tree>
          </div>
      </div>
    );
  }
}

export default EditorItemPanel;
