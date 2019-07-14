/*
 * @Description: 算法管理-添加算法弹出框
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import './index.scss'
import { Button, Modal, Form, Input, Radio, Select } from 'antd'
const { TextArea } = Input
import reduxSagaInjector from '@/util/reduxSagaInjector'
import intl from 'react-intl-universal';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const FormItem = Form.Item
const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "obj": "",
    "uid": ""
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const mapStateToProps = ({algTypeList}) => {
  if(!algTypeList) return {}
  return {
    algTypeList: algTypeList.data
  }
}

@connect(mapStateToProps)
class CreateModel extends React.Component {

  fetch = (params = {}) => {
    param.param.uid = window.localStorage.uid
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALGTYPElIST')('algTypeList', param, "algTypeList")
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    let {algTypeList} = this.props
    if(_.isEmpty(algTypeList)) return null
    const algTypeOptions = algTypeList.map(algType => <Option key={algType.nameEn} value={algType.nameEn}>{algType.nameCn}</Option>)
    return (
      <Modal
        visible={visible}
        title={intl.get('lab-list-modal-tit')}
        okText={intl.get('btn-ok')}
        cancelText={intl.get('btn-cancel')}
        onCancel={onCancel}
        onOk={onCreate}
        className="cre-alg-modal cre-label"
        width="600px"
        maskClosable="false"
        centered={true}
        maskStyle={{"backgroundColor":'rgba(0, 0, 0, 0.4)'}}
      >
        <Form layout="inline">
          <FormItem label={intl.get('lab-lab')} style={{ margin: '0 auto', width:"310px",display:"block"}}>
            {getFieldDecorator('labelName', {
              rules: [{ required: true, message: intl.get('lab-form-fill-lab-name') }],
              initialValue:sessionStorage.getItem("labelName")
            })(
              <Input style={{width:"213px"}} placeholder=""/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
};

export default Form.create()(CreateModel);
