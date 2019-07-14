/*
 * @Description: 算法管理-添加算法弹出框
  */

 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import './index.scss'
 import { Button, Modal, Form, Input, Radio, Select } from 'antd'
 const { TextArea } = Input
 import reduxSagaInjector from '@/util/reduxSagaInjector'
 import intl from 'react-intl-universal';
 
 const FormItem = Form.Item
//  const param = {
//    "caller": "browser",
//    "intfName": "",
//    "param": {
//      "obj": "",
//      "uid": ""
//    },
//    "sign": "",
//    "timestamp": Date.parse(new Date()),
//    "version": "2.5.1"
//  }
 const mapStateToProps = ({algTypeList}) => {
   if(!algTypeList) return {}
   return {
     algTypeList: algTypeList.data
   }
 }
 const CreateModel = Form.create()(
   @connect(mapStateToProps)
   class extends React.Component {
 
    //  fetch = (params = {}) => {
    //    param.param.uid = window.localStorage.uid
    //    const {dispatch} = this.props
    //    reduxSagaInjector(dispatch, 'ALGTYPElIST')('algTypeList', param, "algTypeList")
    //  }
 
    //  componentDidMount() {
    //    this.fetch();
    //  }
 
     render() {
       const { visible, onCancel, onCreate, form } = this.props;
       const { getFieldDecorator } = form;
      //  let {algTypeList} = this.props
      //  if(_.isEmpty(algTypeList)) return null
      //  const algTypeOptions = algTypeList.map(algType => <Option key={algType.nameEn} value={algType.nameCn}>{algType.nameCn}</Option>)
       return (
         <Modal
           visible={visible}
           title={intl.get('tem-list-add-tem')}
           okText={intl.get('btn-ok')}
           cancelText={intl.get('btn-cancel')}
           onCancel={onCancel}
           onOk={onCreate}
           className="cre-alg-modal"
           width="650px"
           maskClosable="true"
           centered={true}
           destroyOnClose={true}
           maskStyle={{"backgroundColor":'rgba(0, 0, 0, 0.4)'}}
         >
            <Form layout="inline">
              <FormItem label={intl.get('tem-tem')} style={{marginRight:0,marginBottom:0}}>
                {getFieldDecorator('templateName', {
                  rules: [{ required: true, message: intl.get('tem-form-fill-tem-name')}],
                })(
                  <Input placeholder={intl.get('tem-tem')}  style={{width:490}}/>
                )}
              </FormItem>
              <FormItem
                label={intl.get('tem-type')}
                className="algType"
              >
              {getFieldDecorator('templateType',{
                initialValue: intl.get('tem-form-add-temp-sys'),
                rules: [{ required: true, message: intl.get('tem-form-sele-tem-type') }],
              })(<Select>
                  <Option value="0">{intl.get('tem-form-add-temp-sys')}</Option>
                  <Option value="1">{intl.get('tem-form-add-temp-org')}</Option>
                  <Option value="2">{intl.get('tem-form-add-temp-per')}</Option>
                </Select>)}
              </FormItem>
              <FormItem label={intl.get('tem-des')} className="description">
                {getFieldDecorator('description',{
                  rules: [{ required: false, message: intl.get('alg-form-max-len-2000'), max:2000}]
                })(<TextArea rows={5} style={{height:"102px"}} placeholder={intl.get('tem-form-des-for-temp')}/>)}
              </FormItem>
            </Form>
         </Modal>
       );
     }
   }
 );
 
 export default CreateModel