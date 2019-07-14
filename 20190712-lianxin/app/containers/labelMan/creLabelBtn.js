/*
 * @Description: 添加算法按钮
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel } from 'antd'
import _ from 'lodash'
// import './index.scss'
import { Table, Divider, Tag, message } from 'antd'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import CreLabelModal from './creLabelModal'
import { withRouter } from "react-router-dom";
import intl from 'react-intl-universal';

const param ={
  "caller": "browser",
  "intfName": "",
  "param": {
    "labelName": "",
    "labelPinYin": "2"
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const mapStateToProps = ({ algList }) => {
  if(!algList) return {}
}

@connect(mapStateToProps)
class CreateAlgButton extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      console.log(values)
      const {dispatch} = this.props
      param.param.labelName =  values.labelName

      reduxSagaInjector(dispatch, 'ALG_CREATE')('creLabel', param, (result) => {
        //console.log(result.data)
        if (result.data.retCode === 0) {
           message.success('标签添加成功')
             // 跳转至创建成功刷新页面
            this.setState({ visible: false })
            const patt=/labelManRe/g
            if(patt.test(location.href)) {
              this.props.history.push('/labelMan');
            }else {
              this.props.history.push('/labelManRe');
            }
        } else {
          message.error("标签添加失败，请重试");
        }
      })
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div className="creAlg">
        <Button type="primary" onClick={this.showModal}>{intl.get('lab-list-add-lab')}</Button>
          <CreLabelModal
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

      </div>
    );
  }
}

export default withRouter(CreateAlgButton);
