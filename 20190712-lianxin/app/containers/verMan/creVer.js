/*
 * @Description: 创建算法版本
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { push } from 'react-router-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Table, Button, AutoComplete, message, Modal, Upload, List, Avatar } from 'antd';
const { TextArea } = Input

const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
import urlConfig from '@/config/base.config'
const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "algNo": "",
    "algVer": "",
    "argsTemplate": "",
    "confPath": "",
    "cpuLimit": 0,
    "dockerImage": "",
    "execFile": "",
    "execType": "",
    "gpuLimit": 0,
    "uid": "",
    "inputs": [
      {

      }
    ],
    "memoryLimit": 0,
    "modelPath": "string",
    "outputs": [
      {

      }
    ],
    "sourcePath": "string"
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const paramImageList = {
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

let listData = []
let listValue

const mapStateToProps = ({ imageList }) => {
  if (!imageList) return {}
  console.log(imageList)
  return {
    imageList: imageList.data
  }
}

@connect(mapStateToProps)
class CreateVersion extends React.Component {constructor(props) {
    super(props);
    const { getFieldDecorator } = this.props.form
    this.columns = [{
      title: 'Action',
      key: 'action',
      render: (text, row, record) => {
        let index = row.index
        return (<div>
          <div className="title">{row.title}</div>
          <div>
            <FormItem
              label="参数"
            >
              {getFieldDecorator('type' + index, {
                rules: [{ required: true, message: ' 不得为空' },
                ],
              })(
                <Select>
                  <Option value="input">输入</Option>
                  <Option value="output">输出</Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('format' + index, {
                rules: [{ required: true, message: '不得为空！' },
                ],
              })(
                <Select>
                  <Option value="path">文件路径</Option>
                  <Option value="file">文件夹路径</Option>
                  <Option value="url">URL路径</Option>
                  <Option value="string">字符串</Option>
                </Select>
              )}
            </FormItem>
          </div>
        </div>
        )
      }
    }]
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    display: "block",
    show: "none",
    showSouce: "block",
    modal: "block",
    showsubmit: "none",
    visible: false,
    upload: "none",
    uploadRepeat: "none",
    uploadFirst: "block",
    zipImg: "none",
    errorImg: "block",
    showTable: "none"
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      showSouce: "block",
      showsubmit: "none",
      display: "block",
      show: "none",
      showSouce: "block",
      modal: "block",
      showsubmit: "none",
      visible: false,
      upload: "none",
      uploadRepeat: "none",
      uploadFirst: "block",
      zipImg: "none",
      errorImg: "block",
      showTable: "none"
    })
  }

  changeFile = () => {
    this.setState({
      showSouce: "block",
      showsubmit: "none",
      display: "block",
      upload: "none",
      showTable: "none"
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        param.param.algNo = sessionStorage.getItem("algNo")
        param.param.algVer = values.algVer
        param.param.dockerImage = values.dockerImage
        param.param.execType = values.execType
        param.param.execFile = values.execFile
        param.param.argsTemplate = values.argsTemplate
        param.param.invokeWord = values.invokeWord
        // 执行文件路径不需要传参，后端自动生成。
        // param.param.confPath = values.confPath
        param.param.cpuLimit = "1024"
        //param.param.modelPath = window.localStorage.modelPath
        param.param.sourcePath = sessionStorage.getItem("source_url")
        param.param.gpuLimit = "1024"
        param.param.memoryLimit = 1024
        param.param.uid = sessionStorage.getItem("uid")
        param.param.inputs[0] = {}
        param.param.outputs[0] = {}
        let inputvalue = {}
        let outputvalue = {}
        for (let i = 0; i < listValue.length; i++) {
          let labelvalue = listValue[i]
          if (values['type' + i] == "input") {
            console.log("00")
            // inputvalue =param.param.inputs[0]
            // inputvalue[labelvalue]=values['format' + i]
          } else {
            // outputvalue =param.param.outputs[0]
            // outputvalue[labelvalue]=values['format' + i]
            console.log("00")
          }
        }
        param.param.inputs[0] = inputvalue
        param.param.outputs[0] = outputvalue
        console.log(param)
        const { dispatch } = this.props
        reduxSagaInjector(dispatch, 'VER_CREATE')('verCreate', param, (result) => {
          if (result.data.retCode === 0) {
            message.success('版本添加成功')
            this.setState({ visible: false })

            const patt = /algDetailsTabVer/g
            if (patt.test(location.href)) {
              dispatch(push(`/algDetailsTab/${this.props.match.params.id}`))
            } else {
              dispatch(push(`/algDetailsTabVer/${this.props.match.params.id}`))
            }

          } else {
            message.error('版本添加失败，请重试！')
          }
        })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  fetch = (params = {}) => {
    paramImageList.param.uid = sessionStorage.getItem("uid")
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'IMAGELIST')('imageListNoPage', paramImageList, "imageList")
  }

  componentDidMount() {
    this.fetch();
  }
  return = () => {
    // const {dispatch} = this.props
    // dispatch(push('/versionMan'))
    // this.setState({
    //   show:"block",
    //   modal: "none"
    // })
  }
  change = (e) => {
    const { value } = e.target
    const { getFieldDecorator } = this.props.form
    // 获取表单数据
    // const listValue = value.match(/(?=\$\{).*?(?<=})/g)
    listValue = value.match(/^\$.*}$/g)
    console.log(listValue)
    if (listValue) {
      this.setState({ showTable: "block" })
      listValue[0] = listValue[0].replace(/\s+/g, "")
      listValue[0].split("$")
      listValue = listValue[0].split("$")
      listValue.shift()
      listData = []
      for (let i = 0; i < listValue.length; i++) {
        listValue[i] = listValue[i].slice(1, listValue[i].length - 1)
        listData.push({
          title: listValue[i],
          index: i
        })
      }
    } else {
      this.setState({ showTable: "none" })
    }
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state
    console.log(this.columns)
    let { imageList } = this.props
    if (_.isEmpty(imageList)) return null
    const imageListOptions = imageList.map(imageList => <Option key={imageList.id} value={imageList.host + '/' + imageList.name
      + ':' + imageList.version}>{imageList.host + '/' + imageList.name + ':' + imageList.version}</Option>)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { visible, onCancel, onCreate, form } = this.props;
    // const { getFieldDecorator } = form;
    const props = {
      name: 'file',
      action: urlConfig.proxyHost + '/alg/upload/source?uid=""&algNo=' + sessionStorage.getItem("algNo") + '&algVer=1.0.0',
      //action: urlConfig.proxyHost+'/alg/upload/source?uid=""&algNo='+ '&algVer=1.0.0',
      headers: {
        authorization: 'authorization-text',
      },
      accept: "zip/*",
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          //message.success(`${info.file.name} 上传成功!`)
          // 存储sourcePath到localStorage备用
          if (info.file.response.retCode == 0) {
            //window.localStorage.setItem("sourcePath",info.file.response.data)
            sessionStorage.setItem("source_url", info.file.response.data)
            this.sourceSucess()
            //this.closeMoal()
          } else {
            this.sourceError()
          }
        } else if (info.file.status === 'error') {
          this.sourceError()
        }
      },
      sourceSucess: () => {
        this.setState({
          showSouce: "none"
        }, () => {
          this.props.setStateFn({showAddVersionForm:true});
        });
      },
      sourceError: () => {
        this.setState({
          uploadRepeat: "block",
          uploadFirst: "none",
          display: "block",
          zipImg: "none",
          errorImg: "block",
          upload: "none"
        });
      },
      closeMoal: () => {
        this.setState({
          show: "block"
        })
      },
      beforeUpload: (file) => {

        if (file.name.match(/.zip$/g)) {
          this.setState({
            display: "none",
            upload: "block",
            zipImg: "block",
            errorImg: "none"
          });
        } else {
          message.error('仅支持ZIP格式的压缩文件上传!');
          return false
        }
      }
    }

    return (
      <div className="creAlg" style={{ marginLeft: 0 }}>
        <Button type="primary" onClick={this.showModal}>创建版本</Button>
        <Modal
          visible={this.state.visible}
          title="创建版本"
          okText="添加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          className="cre-alg-modal versionCreate"
          width="600px"
          maskClosable="false"
          centered={true}
          destroyOnClose={true}
          maskStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.4)' }}
        >
          <div>
            <div style={{ display: this.state.showSouce }}>
              <Form onSubmit={this.handleSubmitSource} layout="vertical" style={{ display: this.state.uploadFirst }}>
                <div>
                  <img src={require('./zip.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                </div>
                <p className="tip-upload" style={{ display: this.state.upload }}>文件上传中…</p>
                <FormItem label="">
                  {getFieldDecorator('uploadModel', {
                    rules: [{ required: true, message: ' ' }],
                  })(<Upload {...props} showUploadList="false" style={{ display: this.state.display }}>
                    <Button htmlType="submit" className="souUplBut">
                      选择文件
                   </Button>
                    <p className="tip">仅支持ZIP格式的压缩文件上传。</p>
                  </Upload>)}
                </FormItem>
              </Form>
              <Form onSubmit={this.handleSubmitSource} layout="vertical" className="upload-repeat" style={{ display: this.state.uploadRepeat }}>
                <div style={{ display: this.state.errorImg }}>
                  <img src={require('./error.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                </div>
                <div style={{ display: this.state.zipImg }}>
                  <img src={require('./zip.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                </div>
                <p className="tip-upload" style={{ display: this.state.upload }}>文件上传中…</p>
                <FormItem label="">
                  {getFieldDecorator('uploadModel', {
                    rules: [{ required: true, message: ' ' }],
                  })(<Upload {...props} showUploadList="false" style={{ display: this.state.display }}>
                    <Button htmlType="submit" className="souUplBut upload-error">
                      重新选择文件
                   </Button>
                    <p className="errorBar"></p>
                    <p className="tip">文件上传失败！</p>
                  </Upload>)}
                </FormItem>
              </Form>
              <Button onClick={this.handleCancel} style={{ "marginLeft": "480px" }}>取消</Button>
            </div>
          </div>
          <div>
            <Form onSubmit={this.handleSubmit} layout="inline" style={{ display: this.state.showsubmit }}>
              <FormItem>
                <div className="change_div">
                  <Button className="change_file" onClick={this.changeFile}>更改文件</Button><span className="file-url">{sessionStorage.getItem("source_url")}</span>
                </div>
              </FormItem>
              <FormItem label="版本号" {...formItemLayout}>
                {getFieldDecorator('algVer', {
                  rules: [{ required: true, message: '请输入三位有效版本号！', pattern: new RegExp('^[0-9]+\.[0-9]+\.[0-9]+$') },
                  ],
                })(
                  <div className="tipInfo">
                    <Input placeholder="版本号" /><span>实例：1.0.0</span>
                  </div>
                )}
              </FormItem>
              <FormItem label="镜像地址" className="dockerImage">
                {getFieldDecorator('dockerImage', {
                  initialValue: imageList[0].host + '/' + imageList[0].name + ':' + imageList[0].version,
                  rules: [{ required: true, message: '请输入镜像地址!' }],
                })(<Select>
                  {imageListOptions}
                </Select>)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="文件类型"
              >
                {getFieldDecorator('execType', {
                  initialValue: "python",
                  rules: [{ required: true, message: '请选择执行文件类型!' }],
                })(<Select>
                  <Option value="python">python</Option>
                  <Option value="shell">shell</Option>
                </Select>)}
              </FormItem>
              <FormItem label="执行文件" {...formItemLayout} className="execFile">
                {getFieldDecorator('execFile', {
                  rules: [{ required: true, message: '请输入算法执行文件!' }],
                })(
                  <div className="tipInfo">
                    <Input placeholder="执行文件" /><span>实例:eye.py</span>
                  </div>
                )}
              </FormItem>
              <FormItem label="参数模板" {...formItemLayout}>
                {getFieldDecorator('argsTemplate', {
                  rules: [
                    { required: true, message: '无效命令!', pattern: '}$' }
                  ],
                })(
                  <div className="tipInfo param">
                    <Input placeholder="按实例格式输入命令，生成参数" onChange={this.change} />
                  </div>
                )}
              </FormItem>
              <FormItem label="命令字" {...formItemLayout}>
                {getFieldDecorator('invokeWord', {
                  rules: [
                    { required: true, message: '请输入算法命令字!' }
                  ],
                })(
                  <div className="tipInfo param">
                    <Input placeholder="请输入算法命令字" />
                  </div>
                )}
              </FormItem>
              <div style={{ display: this.state.showTable }} className="ver-cre-list-wapper">
                <Table
                  columns={this.columns}
                  dataSource={listData}
                  showHeader={false}
                  rowKey={'id'}
                  className="ver-cre-list"
                />
              </div>
              <FormItem {...tailFormItemLayout} className="submit_data">
                <Button className="return" onClick={this.handleCancel}>返回</Button>
                <Button type="primary" htmlType="submit">创建</Button>
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
const WrappedCreateVersion = Form.create()(CreateVersion)
export default WrappedCreateVersion
