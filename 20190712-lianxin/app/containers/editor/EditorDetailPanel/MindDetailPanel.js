import React, { Component } from 'react'
import { Card } from 'antd';
import {
  NodePanel,
  CanvasPanel,
  DetailPanel,
} from 'gg-editor'
import NodeDetail from '../NodeDetail';
import  './index.scss';

class MindDetailPanel extends Component {
  render() {
    return (
      <DetailPanel className="detail-panel">
        <NodePanel>
          <NodeDetail />
        </NodePanel>
        <CanvasPanel>
          <Card type="inner" title="画布属性" bordered={false} />
        </CanvasPanel>
      </DetailPanel>
    );
  }
}

export default MindDetailPanel;
