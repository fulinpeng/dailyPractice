import React, { Component } from 'react'
import { Card } from 'antd';
import { Minimap } from 'gg-editor'

class EditorMinimap extends Component {
  render() {
    return (
      <Card type="inner" title="缩略图" bordered={false}>
        <Minimap height={200} />
      </Card>
    );
  }
}

export default EditorMinimap;
