/*
 * @Description: 版本详情
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './versionInfo.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
// import ModelUpload from './modelUpEdit'
// import SourceUpload from './sourceUpload'
import { withRouter } from 'react-router-dom'

import CommonTable from '../../components/common/commonTable/index'
import { Form, Button, Breadcrumb } from 'antd';

import Moment from 'moment';
import intl from 'react-intl-universal';

const FormItem = Form.Item


const mapStateToProps = ({ algList2 }) => {
  // if (!algList2) return {}
  // if (algList2.data) {
  //   let list = algList2.data.algList;
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i].algNo == sessionStorage.getItem("algNo")) {
  //       algInfo = list[i]
  //       for (let j = 0; j < algInfo.verList.length; j++) {
  //         let verList = algInfo.verList[j];
  //         if (sessionStorage.getItem("algVer") == verList.algVer) {
  //           versionInfo = verList
  //           outputParams = JSON.parse(verList.outputParams)
  //           inputParams = JSON.parse(verList.inputParams)
  //         }
  //       }
  //     }
  //   }
  //   dataSource = []
  //   inputParams = inputParams[0]
  //   for (var prop in inputParams) {
  //     console.log(prop)
  //     dataSource.push({
  //       label: prop,
  //       type: 'input',
  //       format: inputParams[prop]
  //     })
  //   }
  //   outputParams = outputParams[0]
  //   for (var prop in outputParams) {
  //     console.log(prop)
  //     dataSource.push({
  //       label: prop,
  //       type: 'output',
  //       format: outputParams[prop]
  //     })
  //   }
  // }
  // return {
  //   algInfo: algInfo,
  //   versionInfo: versionInfo
  // }
}

@connect(mapStateToProps)
class CreateVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailParam: {
        "caller": "browser",
        "intfName": "",
        "param": {
          "obj": this.props.match.params.id,
          "uid": sessionStorage.getItem("uid")
        },
        "sign": "",
        "timestamp": Date.parse(new Date()),
        "version": "2.5.1"
      },
      confirmDirty: false,
      autoCompleteResult: [],
      dataInfo: {},
      dataList: [],
    };
    this.columns = [
      {
        title: intl.get('alg-detail-param-name'),
        key: '0',
        dataIndex: 'name',
        render: (text) => {
          return text || '--';
        }
      },
      {
        title: intl.get('alg-detail-param-type'),
        key: '1',
        dataIndex: 'nodeType',
        render: (text) => {
          return text || '--';
        }
      },
      {
        title: intl.get('alg-detail-param-format'),
        key: '2',
        dataIndex: 'type',
        render: (text) => {
          return text || '--';
        }
      },
      {
        title: intl.get('alg-detail-param-default'),
        key: '3',
        dataIndex: 'value',
        render: (text) => {
          return text || '--';
        }
      },
      {
        title: intl.get('alg-detail-param-remark'),
        key: '4',
        dataIndex: 'remark',
        render: (text) => {
          return text || '--';
        }
      },
      {
        dataIndex: 'space',
        key: '5',
        width: '0px'
      },
    ]
  }

  componentDidMount() {
    this.fetch()
  }

  fmtDate = (obj) => {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  }

  fetch = () => {
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'VERSION_DETAILS')('versionDetails', this.state.detailParam, (res) => {
      if (res.data.retCode == 0 && res.data.data) {
        let data = res.data.data;
        let inputs = JSON.parse(data.inputParams);
        let outputs = JSON.parse(data.outputParams);
        let dataList = null;
        for (let k in inputs) {
          inputs[k].nodeType = '输入';
        }
        for (let k in outputs) {
          outputs[k].nodeType = '输出';
        }
        dataList = [...inputs, ...outputs];
        this.setState({
          dataInfo: {
            ...this.state.dataInfo,
            ...data
          },
          dataList
        })
      }
    })
  }

  reAlgMan = () => {
    this.props.history.push('/')
  }
  reAlgVer = () => {
    this.props.history.push(`/algDetailsTabVer/${this.state.detailParam.param.obj}`)
  }
  veredit = () => {
    this.props.history.push(`/versionEdit/${this.state.detailParam.param.obj}`)
  }

  render() {
    let { dataInfo } = this.state;

    // if (_.isEmpty(versionInfo)) return null
    // if (_.isEmpty(algInfo)) return null
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item className="crumb"><span><span style={{ cursor: "pointer", "padding-left": 0 }} onClick={this.reAlgMan} className="hover">{intl.get('nav-alg-man')}</span>&thinsp;/&thinsp;<span style={{ cursor: "pointer", "padding-left": 0 }} onClick={this.reAlgVer} className="hover">{intl.get('btn-vie')}</span></span><span className="sub cur"><span className="icon">/</span>{intl.get('btn-version-detail')}</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-container">
          <div className="versionInfo">
            <h3>{intl.get('alg-detail-tab-basic')}</h3>
            <Form onSubmit={this.handleSubmit} layout="inline">
              <FormItem label={intl.get('alg-detail-alg-name')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.algName || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-en-name')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.alias || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('list-status')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>已审核</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-alg-key')} className="block key">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.algNo || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-create-time')} className="block key">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.createTime,
                  rules: [{ required: false, message: '' }],
                })(<div>{(dataInfo.createTime || dataInfo.createTime == 0) ? Moment(dataInfo.createTime*1000).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-version')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.algVer || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-run-file-type')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.execType || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-run-file')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.execFile || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-param-remark')} className="inline">
                {getFieldDecorator('remarks', {
                  initialValue: dataInfo.remarks,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.remarks || '--'}</div>)}
              </FormItem>
              {
                // <FormItem label="上架状态:" className="inline">
                //   {getFieldDecorator('argsTemplate',{
                //     initialValue: versionInfo.argsTemplate,
                //     rules: [{ required: false, message: '' }],
                //   })(<div>{}</div>)}
                // </FormItem>
              }
              <FormItem label={intl.get('alg-detail-shell-url')} className="block">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.shellPath || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-docker')} className="block">
                {getFieldDecorator('dockerImage', {
                  initialValue: dataInfo.dockerImage,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.dockerImage || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-module-path')} className="block">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.modelPath || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-config-file-path')} className="block">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.confPath || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-source-path')} className="block">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.sourcePath || '--'}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-source-path')} className="block">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.argsTemplate || '--'}</div>)}
              </FormItem>
              {this.state.dataList.length && <div className="ver-cre-list-wapper ver-info">
                <CommonTable
                  columns={this.columns}
                  dataSource={this.state.dataList}
                  className="ver-cre-list"
                  rowKey={'id'}
                />
              </div>}
              <FormItem label={intl.get('alg-detail-cpu-num')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.cpuLimit}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-gpu-num')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.gpuLimit}</div>)}
              </FormItem>
              <FormItem label={intl.get('alg-detail-memory-size')} className="inline">
                {getFieldDecorator('argsTemplate', {
                  initialValue: dataInfo.argsTemplate,
                  rules: [{ required: false, message: '' }],
                })(<div>{dataInfo.memoryLimit}</div>)}
              </FormItem>
              <FormItem className="block but">
                {
                  // <Button type="primary" onClick={this.return}>审核</Button>
                }
                <Button type="primary" onClick={this.veredit}>{intl.get('btn-edit')}</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Form.create()(CreateVersion));
