/*
 * @Description: 添加算法按钮
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel } from 'antd'
import _ from 'lodash'
// import './index.scss'
import { withRouter } from "react-router-dom";
import { Table, Divider, Tag, message } from 'antd'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import LabelModalEdit from './labelModalEdit'
import intl from 'react-intl-universal';
const param ={
  "caller": "browser",
  "intfName": "",
  "param": {
      "labelId": 0,
      "labelName": "",
      "labelPinYin": ""
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

      param.param.labelName = values.labelName
      param.param.labelId = sessionStorage.getItem("labelId");

      console.log(param)
      const {dispatch} = this.props

      reduxSagaInjector(dispatch, 'ALG_CREATE')('labelUpdate', param, (result) => {
        if (result.data.retCode === 0) {
          message.success('编辑成功！')
          this.handleCancel()
          const patt=/labelManRe/g
          if(patt.test(location.href)) {
            this.props.history.push('/labelMan');
          } else {
            this.props.history.push('/labelManRe');
          }
        } else {
          message.error("编辑失败，请重试")
        }
      })
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        <span onClick={this.showModal}>{intl.get('list-edit')}</span>

          <LabelModalEdit
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
