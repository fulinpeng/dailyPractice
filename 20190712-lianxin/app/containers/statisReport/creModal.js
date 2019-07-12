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
 
 let allowdRender = true;

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

     onCreate = () => {
        this.props.onCreate();
     }

     componentWillUnmount() {
       console.log('componentWillUnmount');
     }
 
     render() {
       if (!allowdRender) return null;
       const { visible, onCancel, form } = this.props;
       const { getFieldDecorator } = form;
       let {algTypeList} = this.props
       if(_.isEmpty(algTypeList)) return null
       const algTypeOptions = algTypeList.map(algType => <Option key={algType.nameEn} value={algType.nameCn}>{algType.nameCn}</Option>)
       return (
         <Modal
           visible={visible}
           title={intl.get('alg-list-add-alg')}
           okText={intl.get('btn-ok')}
           cancelText={intl.get('btn-cancel')}
           onCancel={onCancel}
           onOk={this.onCreate}
           className="cre-alg-modal"
           width="602px"
           maskClosable="true"
           centered={true}
           destroyOnClose={true}
           maskStyle={{"backgroundColor":'rgba(0, 0, 0, 0.4)'}}
         >
           <Form layout="inline">
             <FormItem label={intl.get('alg-zh-name')} className="algName">
               {getFieldDecorator('algName', {
                 rules: [{ required: true, message: '只允许中文/英文，限制长度32',whitespace:true, max:32, pattern:'^[\u4e00-\u9fa5a-zA-Z]+$'}],
               })(
                 <Input placeholder={intl.get('alg-zh-name')}/>
               )}
             </FormItem>
             <FormItem label={intl.get('alg-en-name')} className="alias">
               {getFieldDecorator('alias',{
                 rules: [{ required: true, message: intl.get('alg-form-allowd-en-sign-64'),whitespace:true,  max:64, pattern:'^[a-zA-Z/_/()/*]+$'}],
               })(<Input type="textarea" placeholder={intl.get('alg-en-name')}/>)}
             </FormItem>
             <FormItem
               label={intl.get('alg-alg-tym')}
               className="algType"
              >
              {getFieldDecorator('algType',{
               initialValue: algTypeList[0].nameCn,
                rules: [{ required: true, message: intl.get('alg-form-select-alg-type') }],
              })(<Select>
                {algTypeOptions}
              </Select>)}
             </FormItem>
             <FormItem label={intl.get('alg-des')} className="description">
               {getFieldDecorator('description',{
                 rules: [{ required: false, message: intl.get('alg-form-max-len-2000'), max:2000}]
               })(<TextArea rows={5} style={{height:"102px"}} placeholder={intl.get('alg-form-alg-des')}/>)}
             </FormItem>
           </Form>
         </Modal>
       );
     }
   }
 
 export default Form.create()(CreateModel);