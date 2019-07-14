/*
 * @Description: 查看算法详情
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Button, Modal, Form, Input, Radio, Select, Switch} from 'antd'
const { TextArea } = Input
import {withRouter} from "react-router-dom";
import reduxSagaInjector from '@/util/reduxSagaInjector'
// import algInfoEdit from '@/containers/algDetails/algInfoEdit'
import Moment from 'moment';
import {push} from 'react-router-redux'
import intl from 'react-intl-universal';

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

const paramAlgList ={
  "caller": "browser",
  "intfName": "",
  "param": {
    "aliasOrAlgName":"",
    "pageNo": 1,
    "pageRange":10
  },
  "sign": " ",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
let algList2
const mapStateToProps = ({algTypeList,algList}) => {
  if(!algList) return {}
  if(!algTypeList) return {}
  if(algList.data){
    for (let i = 0; i<algList.data.algList.length; i++) {
      if (algList.data.algList[i].algNo==sessionStorage.getItem("algNo")) {
        algList2=algList.data.algList[i]
      }
    }
  }
  return {
    algTypeList: algTypeList.data,
    algList:algList2
  }
}
  @connect(mapStateToProps)
  class CreateModel extends React.Component {
    state = {
      algList: {}
    }
    fmtDate = (obj) => {
      var date =  new Date(obj);
      var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)
    }

    fetch = (params = {}) => {
      //param.param.uid = window.localStorage.uid
      // 修改algNo参数
      //paramAlgList.param.algNo = window.localStorage.algNo
      param.param.uid=sessionStorage.getItem("uid")

      const {dispatch} = this.props
      reduxSagaInjector(dispatch, 'ALGTYPElIST')('algTypeList', param, "algTypeList")
    }
    fetchAlgList = (params = {}) => {
      //param.param.uid = window.localStorage.uid
      // paramAlgList.param.aliasOrAlgName = sessionStorage.getItem("aliasOrAlgName")
      // paramAlgList.param.pageNo = sessionStorage.getItem("algPageNo")
      // paramAlgList.param.pageRange = sessionStorage.getItem("algPageRange")
      // const {dispatch} = this.props

      // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', paramAlgList, 'algList')

      
      const {dispatch} = this.props
      reduxSagaInjector(dispatch, 'ALGTDETAIL')('algDetail', {id: this.props.match.params.id}, (res) => {
        this.setState({
          algList: res.data.data
        });
      })
    }

    componentDidMount() {
      this.fetch();
      this.fetchAlgList();
    }

    edit = () => {
      this.props.history.push(`/algDetailsTabEdit/${this.props.match.params.id}`);
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      // let {algTypeList} = this.props
      // if(_.isEmpty(algTypeList)) return null
      let {algList} = this.state
      if(_.isEmpty(algList)) return null
      // const algTypeOptions = algTypeList.map(algType => <Option key={algType.nameEn} value={algType.nameEn}>{algType.nameCn}</Option>)
      return (
          <Form layout="inline" className="cre-alg-modal alg-info" onSubmit={this.handleSubmit}>
            <FormItem label={intl.get('alg-zh-name')} className="algName">
              {getFieldDecorator('algName', {
                rules: [{ required: false,message: ''}],
                initialValue:algList.algName
              },
            )(
                <div className="value">{algList.algName || '--'}</div>
              )}
            </FormItem>
            <FormItem label={intl.get('alg-en-name')} className="alias">
              {getFieldDecorator('alias',{
                rules: [{ required: false, message: '' }],
                initialValue:algList.alias
              })(<div className="value">{algList.alias || '--'}</div>)}
            </FormItem>
            <FormItem
              label={intl.get('alg-alg-tym')}
              className="algType"
             >
             {getFieldDecorator('algType',{
              // initialValue: algTypeList[0].nameCn,
               rules: [{ required: false, message: '' }],
               initialValue:algList.algType
             })(<div className="value">{algList.algType || '--'}</div>)}
            </FormItem>
            <FormItem
              label={intl.get('alg-alg-status')}
              className="status"
             >
             {getFieldDecorator('enable',{})(
              <span className="value">{algList.enable == 1 ? '关闭' : '开启'}</span>
             )}
            </FormItem>
            <FormItem label={intl.get('alg-user')} className="algName left">
              {getFieldDecorator('algName', {
                rules: [{ required: false,message: ''}],
                initialValue:algList.uid
              },
            )(
                <div className="value">{algList.uid || '--'}</div>
              )}
            </FormItem>
            <FormItem label={intl.get('alg-create-time')} className="alias">
              {getFieldDecorator('createTime',{
                rules: [{ required: false, message: '' }],
                // initialValue:algList.createTime
              })(<div className="value">{(algList.createTime || algList.createTime == 0) ? Moment(algList.createTime*1000).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>)}
            </FormItem>
            <FormItem
              label={intl.get('alg-alg-key')}
              className="algNo"
             >
             {getFieldDecorator('algType',{
              // initialValue: algTypeList[0].nameCn,
               rules: [{ required: false, message: '' }],
             })(<div className="value">{algList.algNo || '--'}</div>)}
            </FormItem>
            <FormItem label={intl.get('alg-des')} className="description_info description_info_other">
              {getFieldDecorator('description',{
                rules: [{ required: false, message: '' }],
                initialValue:algList.description
              })(<div className="value">{algList.description || '--'}</div>)}
            </FormItem>
            <FormItem className="submit">
              <Button type="primary" className="confim" onClick={() => this.edit()}>{intl.get('btn-edit')}</Button>
              {
                //  <Button type="dashed" className="cancel">取消</Button>
              }
            </FormItem>
          </Form>
      );
    }
  };
const wapperCreateModel = Form.create()(CreateModel)
export default withRouter(wapperCreateModel);
