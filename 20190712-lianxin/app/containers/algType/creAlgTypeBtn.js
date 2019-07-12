/*
 * @Description: 添加算法按钮
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel } from 'antd'
import _ from 'lodash'
// import './index.scss'
import { push } from 'react-router-redux'
import { Table, Divider, Tag, message } from 'antd'
import reduxSagaInjector from '@/util/reduxSagaInjector'
// import CreateModal from './creModal'
const param ={
  "caller": "browser",
  "intfName": "",
  "param": {
    "algName": "",
    "algType": "",
    "alias": "",
    "appId": "",
    "description": "",
    "inputType": "file",
    "outputType": "file",
    "priority": 0,
    "uid": ""
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

      param.param.algName = values.algName,
      param.param.algType = values.algType,
      param.param.alias = values.alias,
      param.param.appId = values.appId,
      param.param.description = values.description,
      //param.param.priority = values.priority
      param.param.uid = window.localStorage.uid

      console.log(param)
      const {dispatch} = this.props

      reduxSagaInjector(dispatch, 'ALG_CREATE')('algCreate', param, (result) => {
        if (result.data.retCode === 0) {
          message.success('算法添加成功')
          // 跳转至创建成功刷新页面
          const {dispatch} = this.props
          this.setState({ visible: false })
          const patt=/algList/g
          if(patt.test(location.href)) {
            dispatch(push('/app'))
          }else {
            dispatch(push('/algList'))
          }
        } else {
          message.success(result.data.errMsg);
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
        <Button type="primary" onClick={this.showModal}>添加类型</Button>
        {
          // <CreateModal
          //   wrappedComponentRef={this.saveFormRef}
          //   visible={this.state.visible}
          //   onCancel={this.handleCancel}
          //   onCreate={this.handleCreate}
          // />
        }
      </div>
    );
  }
}

export default CreateAlgButton
