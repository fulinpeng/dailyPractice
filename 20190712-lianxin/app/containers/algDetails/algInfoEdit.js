/*
 * @Description: 算法管理-添加算法弹出框
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Button, Modal, Form, Input, Radio, Select, message } from 'antd'
const { TextArea } = Input
import reduxSagaInjector from '@/util/reduxSagaInjector'
import {withRouter} from "react-router-dom";
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

const paramAlgList = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "aliasOrAlgName": "",
    "pageNo": 1,
    "pageRange": 10
  },
  "sign": " ",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

const paramSave = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "algCategoryId": 0,
    "algId": 0,
    "algName": "",
    "alias": "",
    "description": ""
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
// let algList2
// const mapStateToProps = ({ algTypeList, algList }) => {
//   if (!algList) return {}
//   if (!algTypeList) return {}
//   if (algList.data) {
//     for (let i = 0; i < algList.data.algList.length; i++) {
//       if (algList.data.algList[i].algNo == sessionStorage.getItem("algNo")) {
//         algList2 = algList.data.algList[i]
//       }
//     }
//   }
//   return {
//     algTypeList: algTypeList.data,
//     algList: algList2
//   }
// }

@connect(null)
class AlgInfoEdit extends React.Component {
  state = {
    algList: {},
    algTypeList: []
  }
  fetch = (params = {}) => {
    param.param.uid = sessionStorage.getItem("uid")
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'ALGTYPElIST')('algTypeList', param, (res) => {
      this.setState({
        algTypeList: res.data.data
      })
    })
  }
  fetchAlgList = (params = {}) => {

    // const { dispatch } = this.props
    // paramAlgList.param.aliasOrAlgName = sessionStorage.getItem("aliasOrAlgName")
    // paramAlgList.param.pageNo = sessionStorage.getItem("algPageNo")
    // paramAlgList.param.pageRange = sessionStorage.getItem("algPageRange")

    // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', paramAlgList, 'algList')
    const {dispatch} = this.props
      reduxSagaInjector(dispatch, 'ALGTDETAIL')('algDetail', {id: this.props.match.params.id}, (res) => {
        this.setState({
          algList: res.data.data
        });
      })
  }

  componentDidMount() {
    this.fetch()
    this.fetchAlgList()
  }

  cancel() {
    this.props.history.push(`/algDetailsTab/${this.props.match.params.id}`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        //form.resetFields();
        paramSave.param.algId = this.props.match.params.id;
        paramSave.param.algName = values.algName
        paramSave.param.description = values.description
        paramSave.param.alias = values.alias
        paramSave.param.algCategoryId = values.algType

        const { dispatch } = this.props
        reduxSagaInjector(dispatch, 'ALG_CREATE')('algUpdate', paramSave, (result) => {
          if (result.data.retCode === 0) {
            message.success(intl.get('alg-detail-edit-success'))
            this.props.history.push(`/algDetailsTab/${this.props.match.params.id}`);
          } else {
            message.error(result.data.errMsg)
          }
        })
      }
    });
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props
    const { getFieldDecorator } = form
    let {algTypeList, algList} = this.state
    if (_.isEmpty(algTypeList) || _.isEmpty(algList)) return null
    const algTypeOptions = algTypeList.map(algType => <Option key={algType.nameEn} value={algType.id}>{algType.nameCn}</Option>)

    // 算法类型id
    var nameCnIndex = 0
    algTypeList.forEach(function (element, index, array, adsf) {
      if (element.nameCn == algList.algType) {
        nameCnIndex = index
      }
    })

    return (
      <Form layout="inline" className="cre-alg-modal alg-edit" onSubmit={this.handleSubmit}>
        <FormItem label={intl.get('alg-zh-name')} className="algName">
          {getFieldDecorator('algName', {
            rules: [{ required: true, message: '只允许中文/英文，限制长度32', whitespace: true, max: 32, pattern: '^[\u4e00-\u9fa5a-zA-Z]+$' }],
            initialValue: algList.algName
          },
          )(
            <Input />
          )}
        </FormItem>
        <FormItem label={intl.get('alg-en-name')} className="alias">
          {getFieldDecorator('alias', {
            rules: [{ required: true, message: '只允许英文/_/()/*限制长度64', whitespace: true, max: 64, pattern: '^[a-zA-Z/_/()/*]+$' }],
            initialValue: algList.alias
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem
          label={intl.get('alg-alg-tym')}
          className="algType"
        >
          {getFieldDecorator('algType', {
            initialValue: algTypeList[nameCnIndex].id,
            rules: [{ required: true, message: '请选择算法类型!' }]
          })(<Select defaultValue="">
            {algTypeOptions}
          </Select>)}
        </FormItem>
        <FormItem
          label={intl.get('alg-alg-key')}
          className="algNo"
        >
          {getFieldDecorator('algType', {
            rules: [{ required: false, message: '请选择算法类型!' }],
          })(<div className="value">{algList.algNo}</div>)}
        </FormItem>
        <FormItem label={intl.get('alg-des')} className="description description-info">
          {getFieldDecorator('description', {
            rules: [{ required: false, message: '最多输入2000字!', max: 2000 }],
            initialValue: algList.description
          })(<TextArea style={{ height: "102px" }} rows={5} />)}
        </FormItem>
        <FormItem className="submit">
          <Button type="primary" className="confim" htmlType="submit">{intl.get('btn-submit')}</Button>
          <Button type="dashed" className="cancel" onClick={() => this.cancel()}>{intl.get('btn-cancel')}</Button>
        </FormItem>
      </Form>
    );
  }
}
const wapperCreateModel = Form.create()(AlgInfoEdit)
export default withRouter(wapperCreateModel);
