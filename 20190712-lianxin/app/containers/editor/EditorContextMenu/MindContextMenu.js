import React, { Component } from 'react'
import {
  Command,
  NodeMenu,
  CanvasMenu,
  ContextMenu,
} from 'gg-editor'
import  './index.scss';
import iconfont from '../theme/iconfont.scss';

class MindContextMenu extends Component {
  render() {
    return (
      <ContextMenu className="context-menu">
        <NodeMenu>
          <Command name="append">
            <div className="item">
              <i className={`${iconfont.biIcon} ${iconfont.iconInsertSibling}`} />
              <span>插入同级</span>
            </div>
          </Command>
          <Command name="appendChild">
            <div className="item">
              <i className={`${iconfont.biIcon} ${iconfont.iconInsertChild}`} />
              <span>插入子级</span>
            </div>
          </Command>
          <Command name="collapse">
            <div className="item">
              <i className={`${iconfont.biIcon} ${iconfont.iconCollapseSubtree}`} />
              <span>折叠</span>
            </div>
          </Command>
          <Command name="expand">
            <div className="item">
              <i className={`${iconfont.biIcon} ${iconfont.iconExpandSubtree}`} />
              <span>展开</span>
            </div>
          </Command>
          <Command name="delete">
            <div className="item">
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
        </NodeMenu>
        <CanvasMenu>
          <Command name="undo">
            <div className="item">
              <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
              <span>撤销</span>
            </div>
          </Command>
          <Command name="redo">
            <div className="item">
              <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
              <span>重做</span>
            </div>
          </Command>
        </CanvasMenu>
      </ContextMenu>
    );
  }
}

export default MindContextMenu;
