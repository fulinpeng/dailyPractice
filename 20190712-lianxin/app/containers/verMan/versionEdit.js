/*
 * @Description: 算法版本编辑
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
// import ModelUpload from './modelUpEdit'
// import SourceUpload from './sourceUpload'
import {withRouter} from 'react-router-dom'
import CommonTable from '../../components/common/commonTable/index'
import intl from 'react-intl-universal';

import { Form, Input, Popconfirm, Select, Row, Col, Button, message,Breadcrumb} from 'antd';

const FormItem = Form.Item
const Option = Select.Option

const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "inputParams": [
      {

      }
    ],
    "outputParams": [
      {

      }
    ],
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

const mapStateToProps = ({ algList2,imageList}) => {
  if(!algList2) return {}
  if(!imageList) return {}
  if (algList2.data) {
    for (let i = 0; i<algList2.data.algList.length; i++) {
      if (algList2.data.algList[i].algNo==sessionStorage.getItem("algNo")) {
        algInfo=algList2.data.algList[i]
        for (var j=0;j<algList2.data.algList[i].verList.length;j++){
          if(sessionStorage.getItem("algVer") == algList2.data.algList[i].verList[j].algVer){
            versionInfo=algList2.data.algList[i].verList[j]
            outputParams=JSON.parse(algList2.data.algList[i].verList[j].outputParams)
            inputParams=JSON.parse(algList2.data.algList[i].verList[j].inputParams)
            dockerImage=algList2.data.algList[i].verList[j].dockerImage
          }
        }
      }
    }
  }
  return {
    versionInfo: versionInfo,
    imageList: imageList.data,
    algInfo:algInfo
  }
}

// 为了辅助存放命令字对应的数据
let checkRepeatTemp = {};
@connect(mapStateToProps)
class CreateVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
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
      dataInfo: {},
      dataList: [],
    };
    const { getFieldDecorator } = this.props.form
    this.columns = [
       {
         title: intl.get('alg-detail-param-name'),
         key: '0',
         dataIndex: 'name',
         render: (text) => {
           console.log('row', text);
           return <span className="col-sql ant-form-item-required">{text}</span>
         }
       },
       {
         title: intl.get('alg-detail-param-type'),
         key: '1',
         dataIndex: 'nodeType',
         render: (text, record, index) => {
           return <Popconfirm placement="bottom" title={'text'} onConfirm={'confirm'} okText="Yes" cancelText="No">
               <Select value={text || ''} onChange={this.versionDataListSelectChange.bind(this, 'nodeType', record, index)}>
               <Option value="input">输入</Option>
               <Option value="output">输出</Option>
             </Select>
           </Popconfirm>
         }
       },
       {
         title: intl.get('alg-detail-param-format'),
         key: '2',
         dataIndex: 'type',
         render: (text, record, index) => {
           return <Select value={text || ''} onChange={this.versionDataListSelectChange.bind(this, 'type', record, index)}>
            <Option style={record.nodeType == 'output' ? {display:'none'} : {}} value="file">文件路径</Option>
            <Option value="path">文件夹路径</Option>
            <Option style={record.nodeType == 'output' ? {display:'none'} : {}} value="url">URL路径</Option>
            <Option style={record.nodeType == 'output' ? {display:'none'} : {}} value="string">字符串</Option>
         </Select>
         }
       },
       {
         title: intl.get('alg-detail-param-default'),
         key: '3',
         dataIndex: 'value',
         render: (text, record, index) => <Input value={text || ''} onChange={this.versionDataListInputChange.bind(this, 'value', record, index)}/>
       },
       {
         title: intl.get('alg-detail-param-remark'),
         key: '4',
         dataIndex: 'remark',
         render: (text, record, index) => <Input value={text || ''} onChange={this.versionDataListInputChange.bind(this, 'remark', record, index)}/>
       },
       {
         dataIndex: 'space',
         key: '5',
         width:'0px'
       }
     ]
   }
  

   fetch = () => {
     const {dispatch} = this.props;
     reduxSagaInjector(dispatch, 'VERSION_DETAILS')('versionDetails', this.state.detailParam, (res) => {
      if (res.data.retCode == 0 && res.data.data) {
        let data = res.data.data;
        let inputs = JSON.parse(data.inputParams);
        let outputs = JSON.parse(data.outputParams);
        let dataList = null;
        for (let k in inputs) {
          inputs[k].nodeType = 'input';
        }
        for (let k in outputs) {
          outputs[k].nodeType = 'output';
        }
        dataList = [...inputs, ...outputs];
        this.setState({
          dataInfo: {
            ...this.state.dataInfo,
            ...data
          },
          dataList
        });
        this.initCheckRepeatTemp(dataList); // 初始化 checkRepeatTemp 对象
      }
    })
    //  paramSearch.param.aliasOrAlgName = sessionStorage.getItem("aliasOrAlgName")
    //  paramSearch.param.pageNo = sessionStorage.getItem("algPageNo")
    //  paramSearch.param.pageRange = sessionStorage.getItem("algPageRange")
    //  reduxSagaInjector(dispatch, 'ALG_LIST')('algList', paramSearch, "algList2")
    //  paramImageList.param.uid = sessionStorage.getItem("uid")
    //  reduxSagaInjector(dispatch, 'IMAGELIST')('imageListNoPage', paramImageList, "imageList")

   }
   componentDidMount() {
     this.fetch()
   }
   return = () => {
    this.props.history.goBack();
   }
   reAlgVer  = () => {
    this.props.history.push(`/algDetailsTabVer/${this.props.match.params.id}`);
   }
   handleSubmit = (e) => {
     e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
        let listValue = this.state.dataList;
        let inputvalue = [];
        let outputvalue = [];
        for (let i = 0; i < listValue.length; i++) {
          let item = listValue[i]
          if (!item.nodeType) {
            message.error('请选择参数类型！')
            return;
          } else if (!item.type) {
            message.error('请选择参数格式！')
            return;
          }
          if (item.nodeType == "input") {
            inputvalue.push(item);
          } else {
            outputvalue.push(item);
          }
        };
         console.log('Received values of form: ', values)
         //param.param.algNo=sessionStorage.getItem("algNo")
         param.param.algVer = values.algVer
         param.param.argsTemplate = values.argsTemplateEdit
         param.param.execFile = values.execFile
         param.param.execFileType = values.execFileType
         param.param.cpuLimit = values.cpuLimit === '' ? 1 : values.cpuLimit;
         param.param.gpuLimit = values.gpuLimit === ''? 0 : values.gpuLimit;
         param.param.memoryLimit = values.memoryLimit === '' ? 512 : values.memoryLimit;
         param.param.invokeWord = values.invokeWord
         param.param.uid = this.state.detailParam.param.uid
         param.param.id = this.state.detailParam.param.obj

         if (listValue.length) {
          param.param.inputParams = inputvalue
          param.param.outputParams = outputvalue
         }else {
          param.param.inputParams=JSON.parse(sessionStorage.getItem("inputParams"))
          param.param.outputParams=JSON.parse(sessionStorage.getItem("outputParams"))
         }
         console.log(param.param)
         //param.param.dockerImage = values.algVer
         //param.param.execType = values.execType
         //param.param.execFile = values.execFile
         // 执行文件路径不需要传参，后端自动生成。
         // param.param.confPath = values.confPath
         //param.param.cpuLimit = values.cpuLimit
         //param.param.modelPath = sessionStorage.getItem("modelPath")
         //param.param.sourcePath = sessionStorage.getItem("source_url");
         //param.param.shellPath = values.shellPath

         //param.param.memoryLimit = values.gpuLimit.memoryLimit
         const {dispatch} = this.props

         reduxSagaInjector(dispatch, 'VERSION_UPDATE')('verUpdate', param, (result) => {
           if (result.data.retCode === 0) {
             message.success(intl.get('alg-detail-create-version-upload-suceess'));
             this.setState({ visible: false })
             console.log(this.props.history);
             this.props.history.go(-1);
           } else {
             message.error(result.data.errMsg)
           }
         })
       }
     });
   }

   handleConfirmBlur = (e) => {
     const value = e.target.value;
     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   }

  // 初始化 checkRepeatTemp 对象，辅助记住表格数据
   initCheckRepeatTemp = (dataList) => {
    for (let i =0; i < dataList.length; i++) {
      let item = dataList[i];
      checkRepeatTemp[item.name] = item;
    }
    console.log('初始化 checkRepeatTemp 对象', checkRepeatTemp);
   }

   change = (e) => {
    const { value } = e.target;
    // 获取表单数据
    let matchVal = value.match(/\$\{.*?\}/g);
    // 判断是否重复、或者输入不合法
    let temp = {}, isRepeat = false, isSpace = false, isErr = false;
    if (isRepeat || isSpace || isErr) return; // 重复、输入不合法、就退出该方法
    if (matchVal) {
      for (let i=0; i<matchVal.length; i++) {
        let v = matchVal[i]
        // 取出 ${xxx} 中间的内容，判断是否合法
        if (v == '${}') {
          isSpace = true;
          break;
        }
        if (/\$\{\$\{.*\}/.test(v) || /^.+\$\{.+$/.test(v)) {
          isErr = true;
          break;
        }
        if (temp[v]) {
          isRepeat = true;
          break;
        } else {
          temp[v] = 1;
        }
      }
      let _dataList = [];
      let _checkRepeatTemp = {}
      for (let i = 0; i < matchVal.length; i++) {
        let name = matchVal[i].substring(2, matchVal[i].length-1);
        if (checkRepeatTemp[name]) {
          _dataList.push(checkRepeatTemp[name])
          _checkRepeatTemp[name] = checkRepeatTemp[name];
        } else {
          let temp ={
            name: name,
            value:'',
            type:''
          };
          // 同时改变 checkRepeatTemp 对象，保持和 dataList 同步
          // 但是注意：checkRepeatTemp 是对象，dataList 是数组
          _dataList.push(temp)
          _checkRepeatTemp[name] = temp;
        }
      }
      console.log('修改命令字时：', checkRepeatTemp);
      this.setState({
        dataList : _dataList
      })
      checkRepeatTemp = _checkRepeatTemp;
    } else {
      this.setState({
        dataList : []
      })
      checkRepeatTemp = {};
    }
  }

  //  change= (e) => {
  //   const { value } = e.target
  //   const { getFieldDecorator } = this.props.form
  //    // 获取表单数据
  //    // const listValue = value.match(/(?=\$\{).*?(?<=})/g)
  //    listValue = value.match(/^\$.*}$/g)
  //    console.log(listValue)
  //    if (listValue) {
  //      this.setState({ showTable: "block" })
  //      listValue[0]=listValue[0].replace(/\s+/g,"")
  //      listValue[0].split("$")
  //      listValue =listValue[0].split("$")
  //      listValue.shift()
  //      dataList=[]
  //      for (let i = 0; i<listValue.length; i++) {
  //        listValue[i] = listValue[i].slice(1,listValue[i].length-1)
  //        dataList.push({
  //          title: listValue[i],
  //          index: i
  //        })
  //      }
  //    }else {
  //       this.setState({ showTable: "none" })
  //    }
  //  }
  
  //  changeInit= (e) => {
  //   //const { value } = e.target
  //   const { getFieldDecorator } = this.props.form
  //    // 获取表单数据
  //    // const listValue = value.match(/(?=\$\{).*?(?<=})/g)
  //    listValue = value.match(/^\$.*}$/g)
  //    console.log(listValue)
  //    if (listValue) {
  //      this.setState({ showTable: "block" })
  //      listValue[0]=listValue[0].replace(/\s+/g,"")
  //      listValue[0].split("$")
  //      listValue =listValue[0].split("$")
  //      listValue.shift()
  //      dataList=[]
  //      for (let i = 0; i<listValue.length; i++) {
  //        listValue[i] = listValue[i].slice(1,listValue[i].length-1)
  //        dataList.push({
  //          title: listValue[i],
  //          index: i
  //        })
  //      }
  //    }else {
  //       this.setState({ showTable: "none" })
  //    }
  //  }
 
  versionDataListSelectChange = (type, record, index, val) => {
    val = val || '';
    let dataList = [...this.state.dataList];
    let target = dataList.find((v) => v.name == record.name);
    target[type] = val;
    if (type == 'nodeType') target.type = '';
    this.setState({
      dataList
    });
    console.log('修改表格中内容时：', checkRepeatTemp);
  }

  versionDataListInputChange = (type, record, index, e) => {
    let val = e.target.value || '';
    if (val.length > 20) return message.error('不能超过20个字符');
    let dataList = [...this.state.dataList];
    let target = dataList.find((v) => v.name == record.name);
    target[type] = val;
    this.setState({
      dataList
    });
    console.log('修改表格中内容时：', checkRepeatTemp);
  }

   render() {
     let { dataInfo } = this.state;
    //  if(_.isEmpty(versionInfo)) return null
    //  let { algInfo } = this.props
    //  let {imageList} = this.props
    //  if(_.isEmpty(algInfo)) return null
    //  if(_.isEmpty(imageList)) return null
    //  const imageListOptions = imageList.map(imageList => <Option key={imageList.id} value={imageList.host + '/' + imageList.name
    //   + ':' + imageList.version}>{imageList.host + '/' + imageList.name+ ':' + imageList.version}</Option>)
     const { getFieldDecorator } = this.props.form
    //  const { autoCompleteResult } = this.state
    //  console.log(versionInfo.id)
    //  sessionStorage.setItem("versionID", versionInfo.id)
    //  sessionStorage.setItem("inputParams", versionInfo.inputParams)
    //  sessionStorage.setItem("outputParams", versionInfo.outputParams)

     return (
       <div>
           <Breadcrumb>
             <Breadcrumb.Item className="crumb"><span><span style={{cursor:"pointer","paddingLeft":0}} onClick={this.reAlgMan} className="hover">{intl.get('nav-alg-man')}</span>&thinsp;/&thinsp;<span style={{cursor:"pointer","padding-left":0}} onClick={this.reAlgVer} className="hover">{intl.get('btn-vie')}</span></span><span className="sub cur"><span className="icon">/</span>{intl.get('btn-version-detail')}</span></Breadcrumb.Item>
           </Breadcrumb>
           <div className="main-container">
               <div className="versionInfo versionEdit">
               <h3>{intl.get('alg-detail-tab-basic')}</h3>
               <Form onSubmit={this.handleSubmit} layout="inline">
               {/*
                 <FormItem label="参数模板" {...formItemLayout}>
                 {getFieldDecorator('argsTemplate',{
                   initialValue: versionInfo.argsTemplate,
                   rules: [{ required: true, message: '请输入参数模板!' }],
                 })(<TextArea rows={5} />)}
               </FormItem>
                 */}
                 <FormItem label={intl.get('alg-detail-alg-name')} className="inline">
                   {getFieldDecorator('argsTemplate555',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.algName}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-en-name')} className="inline">
                   {getFieldDecorator('argsTemplate66',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.alias}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('list-status')} className="inline">
                   {getFieldDecorator('argsTemplate88',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>已审核</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-alg-key')} className="block key">
                   {getFieldDecorator('argsTemplate00',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.algNo}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-version')} className="inline">
                   {getFieldDecorator('algVer',{
                     initialValue: dataInfo.algVer,
                     rules: [
                       { required: true,
                        message: '请输入三位有效版本号！',
                        pattern: /^[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}$/
                      }
                    ],
                   })(<Input />)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-run-file-type')} className="inline">
                   {getFieldDecorator('execFileType',{
                     initialValue: dataInfo.execType,
                     rules: [{ required: true, message: '' }],
                   })(<Select>
                     <Option value="python">python</Option>
                     <Option value="shell">shell</Option>
                   </Select>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-run-file')} className="inline">
                   {getFieldDecorator('execFile', {
                     initialValue: dataInfo.execFile,
                     rules: [{ required: true, message: '请输入算法执行文件!' }],
                   })(
                     <Input />
                   )}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-param-remark')} className="inline">
                   {getFieldDecorator('remarks', {
                     initialValue: dataInfo.remarks
                   })(
                     <Input placeholder="请输入备注"/>
                   )}
                 </FormItem>
                  <FormItem label={intl.get('alg-detail-shell-url')} className="block shell">
                    {getFieldDecorator('shellPath', {
                      initialValue: dataInfo.shellPath,
                      rules: [{ required: false, message: '请输入shellPath!' }],
                    })(
                      <div>{dataInfo.shellPath}</div>
                    )}
                   </FormItem>
                 <FormItem label={intl.get('alg-detail-module-path')} className="block">
                   {getFieldDecorator('argsTemplate1',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.modelPath}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-config-file-path')} className="block">
                   {getFieldDecorator('argsTemplate2',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.confPath}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-source-path')} className="block">
                   {getFieldDecorator('argsTemplate3',{
                     initialValue: dataInfo.argsTemplate,
                     rules: [{ required: false, message: '' }],
                   })(<div>{dataInfo.sourcePath}</div>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-run-command')} className="block">
                   {getFieldDecorator('argsTemplateEdit',{
                      initialValue: dataInfo.argsTemplate,
                      rules: [
                        {required: true, message: '无效命令!'},
                        {validator: (rule, value, callback) => {
                          let matchVal = value.match(/\$\{.*?\}/g);
                          if (!matchVal) return callback('无效命令!');
                          if (matchVal.length) {
                            let temp = {}, isRepeat = false, isSpace = false, isErr = false;
                            for (let i=0; i<matchVal.length; i++) {
                              let v = matchVal[i]
                              // 取出 ${xxx} 中间的内容，判断是否合法
                              if (v == '${}') {
                                isSpace = true;
                                break;
                              }
                              if (/\$\{\$\{.*\}/.test(v) || /^.+\$\{.+$/.test(v)) {
                                isErr = true;
                                break;
                              }
                              if (temp[v]) {
                                isRepeat = true;
                                break;
                              } else {
                                temp[v] = 1;
                              }
                            }
                            if (isErr) {
                              callback('格式不正确!')
                            }
                            if (isSpace) {
                              callback('命令字不能为空!')
                            } else {
                              if (isRepeat) {
                                callback('命令字不能重复!')
                              } else {
                                callback();
                              }
                            }
                          } else {
                            callback('无效命令,请参考实例!');
                          }
                        }}
                      ],
                   })(
                     <Input style={{width:'400px'}} onChange={this.change}/>
                   )}
                 </FormItem>
                 {this.state.dataList.length ? <div className="ver-cre-list-wapper ver-cre-list-wapper-edit">
                   <CommonTable
                    columns={this.columns}
                    dataSource={this.state.dataList}
                    className="ver-cre-list"
                    rowKey={'name'}
                    />
                 </div> : null}
                 <FormItem label={intl.get('alg-detail-cpu-num')} className="inline">
                   {getFieldDecorator('cpuLimit',{
                     initialValue: dataInfo.cpuLimit,
                     rules: [
                      { required: false, message: '' },
                      { pattern: /^[0-9]*$/, message: '请输入数字' },
                      {
                        validator: (rule, value, callback) => {
                          if (value == '') return callback();
                          if (value < 0) {
                            callback('请输入非负数')
                          } else if (value > 999999) {
                            callback('数值已超过最大范围')
                          } else {
                            callback()
                          }
                        }
                      }
                    ],
                   })(<Input style={{width:'100px'}} placeholder="默认值:1"/>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-gpu-num')} className="inline">
                   {getFieldDecorator('gpuLimit',{
                     initialValue: dataInfo.gpuLimit,
                     rules: [
                      { required: false, message: '' },
                      { pattern: /^[0-9]*$/, message: '请输入数字' },
                      {
                        validator: (rule, value, callback) => {
                          if (value == '') return callback();
                          if (value < 0) {
                            callback('请输入非负数')
                          } else if (value > 999999) {
                            callback('数值已超过最大范围')
                          } else {
                            callback()
                          }
                        }
                      }
                    ],
                   })(<Input style={{width:'100px'}} placeholder="默认值:0"/>)}
                 </FormItem>
                 <FormItem label={intl.get('alg-detail-memory-size')} className="inline">
                   {getFieldDecorator('memoryLimit',{
                     initialValue: dataInfo.memoryLimit,
                     rules: [
                      { required: false, message: '' },
                      { pattern: /^[0-9]*$/, message: '请输入数字' },
                      {
                        validator: (rule, value, callback) => {
                          if (value == '') return callback();
                          if (value < 0) {
                            callback('请输入非负数')
                          } else if (value > 999999) {
                            callback('数值已超过最大范围')
                          } else {
                            callback()
                          }
                        }
                      }
                    ],
                   })(<Input  style={{width:'100px'}} placeholder="默认值:512"/>)}
                 </FormItem>
                 {
                   // <FormItem label="镜像地址" className="block">
                   //   {getFieldDecorator('dockerImage', {
                   //     initialValue: dataInfo.dockerImage,
                   //     rules: [{ required: true, message: '请输入镜像地址!' }],
                   //   })(<Select>
                   //       {imageListOptions}
                   //     </Select>)}
                   // </FormItem>
                 }
               <FormItem className="block but">
                 <Button type="primary" htmlType="submit">{intl.get('btn-submit')}</Button>
                 <Button  onClick={this.return}>{intl.get('btn-back')}</Button>
               </FormItem>
               </Form>
               </div>
           </div>
       </div>
     );
   }
 }
const WrappedCreateVersion = Form.create()(CreateVersion)
export default withRouter(WrappedCreateVersion)
