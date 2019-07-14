import React, { Component } from 'react'
import { Card } from 'antd';
import {
  NodePanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  CanvasPanel,
  DetailPanel,
  withPropsAPI
} from 'gg-editor'
import { withRouter } from "react-router-dom";
import NodeDetail from '../NodeDetail';
import TaskNodeDetail from '../TaskNodeDetail';
import EdgeDetail from '../EdgeDetail';
import GroupDetail from '../GroupDetail';
import { connect } from 'react-redux'
import './index.scss';
import intl from 'react-intl-universal';


@connect(null)
class FlowDetailPanel extends Component {

  render() {
    return (
      <DetailPanel className="detail-panel">
        <NodePanel>
          {this.props.match.path=="/taskDetail/:id" ? <TaskNodeDetail /> : <NodeDetail />}
        </NodePanel>
        <EdgePanel>
          <EdgeDetail />
        </EdgePanel>
        <GroupPanel>
          <GroupDetail />
        </GroupPanel>
        <MultiPanel>
          <Card type="inner" title="多选属性" bordered={false} />
        </MultiPanel>
        <CanvasPanel>
          {
              // <Card type="inner" title="命令字参数" bordered={false} />
          }
          <div className="item-panel-head">
              <span className="item-panel-head-name">{intl.get('tem-detail-alg-ver-param')}</span>
          </div>
        </CanvasPanel>
      </DetailPanel>
    );
  }
}

export default withRouter(FlowDetailPanel);
