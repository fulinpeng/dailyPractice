/*
* @Description:模版信息
*/
import React, { Component } from 'react'
import GGEditor, { Flow, RegisterNode } from 'gg-editor'
import { withPropsAPI } from 'gg-editor'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'

const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "pageNo": 1,
    "pageRange": 10,
    "templateNameOrTemplateKey": ""
  },
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

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
  constructor(props) {
    super(props);
  }
  state = {
    canvasDetails: {
      nodes: [
        { type: "node", size: "220*40", shape: "1*1", color: "#141420", label: "1.0.0", realId: 6, x: 474, y: 193, id: 'ea1184e8', index: 0, outputParams:'[]', inputParams:'[]' },
        { type: "node", size: "220*40", shape: "1*1", color: "#141420", label: "1.0.1", realId: 9, x: 574, y: 293, id: '481fbb1a', index: 2, outputParams:'[]', inputParams:'[]' },
      ],
      edges: [
        {
          shape:"flow-polyline-round",
          source: 'ea1184e8',
          sourceAnchor: 2,
          target: '481fbb1a',
          targetAnchor: 0,
          id: '7989ac70',
          index: 0,
        },
      ]
    },
  }

  componentDidMount() {
    const { propsAPI } = this.props;
    console.log("@@@@@@-propsAPI", propsAPI);
    const page = propsAPI.editor.getCurrentPage()
    console.log("@@@@@@-page", page);

    // 修改默认的线形

    page.changeAddEdgeModel({
      shape: 'flow-polyline-round'
    })

    // 交互优化，输入只能连接输出
    // 输入锚点不可以连出边
    page.on('hoveranchor:beforeaddedge', ev => {
      return;
      // if (ev.anchor.type === 'input') {
      //   ev.cancel = true;
      // }
    })

    page.on('dragedge:beforeshowanchor', ev => {
      return;
      // // 只允许目标锚点是输入，源锚点是输出，才能连接
      // if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
      //   ev.cancel = true;
      // }
      // // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
      // if (ev.dragEndPointType === 'target' && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
      //   ev.cancel = true;
      // }
      // // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
      // if (ev.dragEndPointType === 'source' && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
      //   ev.cancel = true;
      // }
    })
  }


  componentWillUnmount() {
    // clearInterval(this.timerID)
  }

  render() {
    return <Flow className="flow"
      style={{height:window.innerHeight-100,width:window.innerWidth-420}}
      noEndEdge="false"
      data={this.props.canvasDetails}
      // graph={{ mode: 'readOnly' }}
    />
  }
}

export default withPropsAPI(FlowEdit)
