/*
 * @Description: 版本管理列表
  */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { withRouter } from "react-router-dom";
import { Form, Input, Popconfirm, Select, Table, Button, message, Modal, Upload, LocaleProvider, Row, Col } from 'antd';
const FormItem = Form.Item
const Option = Select.Option
// const Search = Input.Search
import 'moment/locale/zh-cn';
import urlConfig from '@/config/base.config'
import CommonTable from '../../components/common/commonTable/index'
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import Moment from 'moment';
import intl from 'react-intl-universal';
const paramForAddVersion = {
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
    "inputs": [],
    "memoryLimit": 0,
    "modelPath": "string",
    "outputs": [],
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

const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "aliasOrAlgName": "",
    "pageNo": 1,
    "pageRange": 10
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

// const mapStateToProps = ({ algList }) => {
//   if(!algList) return {}
//   return {
//     algList : algList.data
//   }
// }

// 为了辅助存放命令字对应的数据
let checkRepeatTemp = {};
@connect(null)

class algorithmManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false, // 删除行，弹出提示框
      showAddVersionModal: false, // 添加版本，弹出提示框
      showAddVersionForm: false, // 添加版本，导入数据成功后，填写表单
      confirmDirty: false,
      autoCompleteResult: [],
      display: "block",
      show: "none",
      showSouce: "block",
      modal: "block",
      showsubmit: "none",
      upload: "none",
      uploadRepeat: "none",
      uploadFirst: "block",
      zipImg: "none",
      errorImg: "block",
      showTable: "none",
      data: [],
      imageList: [],
      pagination: {
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', "30"],
        onShowSizeChange: function (current, pageSize) {
          console.log(current, pageSize)
        },
      },
      loading: false,
      ModalText: '确认删除选择的版本吗？',
      confirmLoading: false,
      addVersionDataList: [],
      validateVersion: {
        caller: "browser",
        param: {
          algNo: sessionStorage.getItem("algNo"),
          versionNo: ''
        },
        timestamp: Date.parse(new Date()),
        version: "2.5.1"
      }
    }

    const { getFieldDecorator } = this.props.form
    this.columns = [
      {
        title: intl.get('alg-detail-version'),
        dataIndex: 'algVer',
        key: '0',
        width: "11%",
        render: (algVer) => <span className="col-sql">{algVer || '--'}</span>
      },
      {
        title: intl.get('alg-detail-exec-file'),
        dataIndex: 'execFile',
        key: '1',
        width: "20%",
        render: (execFile) => <span className="col-sql">{execFile || '--'}</span>
      },
      {
        title: intl.get('alg-detail-docker'),
        dataIndex: 'dockerImage',
        key: '2',
        width: "28%",
        render: (dockerImage) => <span className="col-sql">{dockerImage || '--'}</span>
      },
      {
        title: intl.get('alg-detail-user'),
        dataIndex: 'uid',
        key: '3',
        width: "10%",
        render: (uid) => <span className="col-sql">{uid || '--'}</span>
      },
      {
        title: intl.get('alg-detail-create-time'),
        dataIndex: 'createTime',
        key: '6',
        width:"12%",
        render: (createTime) => <span className="col-sql">{(createTime || createTime == 0) ? Moment(createTime*1000).format('YYYY-MM-DD') : '--'}</span>
      },
      {
        title: intl.get('list-status'),
        dataIndex: 'status',
        key: '4',
        width: "14%",
        render: (status) => {
          let statusText = ""
          if (status == 0) {
            statusText = "未审核"
          } else {
            statusText = "已审核"
          }
          return (
            <span>{statusText}</span>
          )
        }
      },
      // {
      //   title: '算法编号',
      //   dataIndex: 'algVer',
      //   render: (text, row, index) => {
      //     console.log(row)
      //     return (
      //       <div>
      //         <div>{row.algNo}/{row.algVer}</div>
      //         <div className="argDic">{row.uid}/{this.fmtDate(row.lastUpdateTime)}</div>
      //         <div className="argDic">{row.execFile}</div>
      //       </div>
      //     )
      //   },
      // },
      {
        title: intl.get('list-edit'),
        dataIndex: 'verList',
        render: (text, row, record) => {
          return (
            (
              <div className="algBut">
                <a href="javascript:;" className="details" onClick={() => this.versionInfo(text, row, record)}>{intl.get('btn-vie')}</a>
                {/* <a href="javascript:;"  className="delete" onClick={() => this.handleDeleteRow(row.algVer)}>删除</a>
                 <Modal title="删除版本"
                   visible={this.state.showDeleteModal}
                   onOk={this.handleOk}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.showDeleteModalFn}
                   centered={true}
                   className="deleteModal"
                   width="400px"
                   cancelText="取消"
                   okText="确定"
                 >
                   <p>{this.state.ModalText}</p>
                  </Modal> */}
              </div>
            )
          )
        },
      }]

    this.columnsForAddVersion = [
      {
        title: intl.get('alg-detail-param-name'),
        dataIndex: 'name',
        render: (text) => {
          console.log('row', text);
          return <span className="col-sql ant-form-item-required">{text}</span>
        }
      },
      {
        title: intl.get('alg-detail-param-type'),
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
        dataIndex: 'type',
        render: (text, record, index) => {
          return <Select value={text || ''} onChange={this.versionDataListSelectChange.bind(this, 'type', record, index)}>
            <Option style={record.nodeType == 'output' ? { display: 'none' } : {}} value="file">文件路径</Option>
            <Option value="path">文件夹路径</Option>
            <Option style={record.nodeType == 'output' ? { display: 'none' } : {}} value="url">URL路径</Option>
            <Option style={record.nodeType == 'output' ? { display: 'none' } : {}} value="string">字符串</Option>
          </Select>
        }
      },
      {
        title: intl.get('alg-detail-param-default'),
        dataIndex: 'value',
        render: (text, record, index) => <Input value={text || ''} onChange={this.versionDataListInputChange.bind(this, 'value', record, index)} />
      },
      {
        title: intl.get('alg-detail-param-remark'),
        dataIndex: 'remark',
        render: (text, record, index) => <Input value={text || ''} onChange={this.versionDataListInputChange.bind(this, 'remark', record, index)} />
      },
      {
        dataIndex: 'space',
        width: '0px'
      },
    ]
  }

  componentDidMount() {
    this.fetchForImageList
      .then(() => {
        this.fetch();
      }, () => {
        this.fetch();
      });
  }

  versionDataListSelectChange = (type, record, index, val) => {
    val = val || '';
    let dataList = [...this.state.addVersionDataList];
    let target = dataList.find((v) => v.name == record.name);
    target[type] = val;
    if (type == 'nodeType') target.type = '';
    this.setState({
      addVersionDataList: dataList
    });
  }

  versionDataListInputChange = (type, record, index, e) => {
    let val = e.target.value || '';
    if (val.length > 20) return message.error('不能超过20个字符');
    let dataList = [...this.state.addVersionDataList];
    let target = dataList.find((v) => v.name == record.name);
    target[type] = val;
    this.setState({
      addVersionDataList: dataList
    });
  }

  fetchForImageList = new Promise((resolve, reject) => {
    paramImageList.param.uid = sessionStorage.getItem("uid")
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'IMAGELIST')('imageListNoPage', paramImageList, (res) => {
      if (res.data && res.data.data && res.data.data.length) {
        let data = res.data.data;
        resolve(data);
        this.setState({
          imageList: data
        });
      } else {
        reject();
      }
    })
  });

  showAddVersionModalFn = () => {
    this.setState({
      showAddVersionModal: true,
      showAddVersionForm: false,
      showSouce: "block",
      showsubmit: "none",
      display: "block",
      show: "none",
      showSouce: "block",
      modal: "block",
      showsubmit: "none",
      upload: "none",
      uploadRepeat: "none",
      uploadFirst: "block",
      zipImg: "none",
      errorImg: "block",
      showTable: "none"
    })
  }

  handleCancel = () => {
    this.setState({
      showAddVersionModal: false,
      showAddVersionForm: false,
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let listValue = this.state.addVersionDataList;
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
        }
        console.log('Received values of form: ', values)
        paramForAddVersion.param = {
          ...paramForAddVersion.param,
          algNo: sessionStorage.getItem("algNo"),
          algVer: values.algVer,
          dockerImage: values.dockerImage,
          execType: values.execType,
          execFile: values.execFile,
          argsTemplate: values.argsTemplate,
          remarks: values.remarks,
          cpuLimit: values.cpuLimit === '' ? 1 : values.cpuLimit,
          gpuLimit: values.gpuLimit === ''? 0 : values.gpuLimit,
          memoryLimit: values.memoryLimit === '' ? 512 : values.memoryLimit,
          // confPath : values.confPath, // 执行文件路径不需要传参，后端自动生成。
          modelPath: window.localStorage.modelPath,
          sourcePath: sessionStorage.getItem("source_url"),
          uid: sessionStorage.getItem("uid"),
        }
        paramForAddVersion.param.inputs = inputvalue
        paramForAddVersion.param.outputs = outputvalue
        const { dispatch } = this.props
        reduxSagaInjector(dispatch, 'VER_CREATE')('verCreate', paramForAddVersion, (result) => {
          if (result.data.retCode === 0) {
            message.success('版本添加成功')
            this.setState({
              // showAddVersionForm: true,
              // showAddVersionModal: false
            })
            const patt = /algDetailsTabVer/g
            if (patt.test(location.href)) {
              this.props.history.push(`/algDetailsTab/${this.props.match.params.id}`);
            } else {
              this.props.history.push(`/algDetailsTabVer/${this.props.match.params.id}`);
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

  paramChange = (e) => {
    const { value } = e.target;
    // 获取表单数据
    let matchVal = value.match(/\$\{.*?\}/g);
    // 判断是否重复、或者输入不合法
    let temp = {}, isRepeat = false, isSpace = false, isErr = false;
    if (matchVal) {
      for (let i = 0; i < matchVal.length; i++) {
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
      if (isRepeat || isSpace || isErr) return; // 重复、输入不合法、就退出该方法
      let _dataList = [];
      let _checkRepeatTemp = {}
      for (let i = 0; i < matchVal.length; i++) {
        let name = matchVal[i].substring(2, matchVal[i].length - 1);
        if (checkRepeatTemp[name]) {
          _dataList.push(checkRepeatTemp[name])
          _checkRepeatTemp[name] = checkRepeatTemp[name];
        } else {
          let temp = {
            name: name,
            value: '',
            type: ''
          };
          // 同时改变 checkRepeatTemp 对象，保持和 dataList 同步
          // 但是注意：checkRepeatTemp 是对象，dataList 是数组
          _dataList.push(temp)
          _checkRepeatTemp[name] = temp;
        }
      }
      console.log('修改命令字时：', checkRepeatTemp);
      this.setState({
        addVersionDataList: _dataList,
        showTable: "block"
      })
      checkRepeatTemp = _checkRepeatTemp;
    } else {
      this.setState({
        addVersionDataList: []
      })
      checkRepeatTemp = {};
    }
  }

  fmtDate = (obj) => {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    // this.setState({
    //   ModalText: 'The modal will be closed after two seconds',
    //   confirmLoading: true,
    // });
    const algVer = sessionStorage.getItem("deleteAlgVer");
    setTimeout(() => {
      this.setState({
        showDeleteModal: false,
        confirmLoading: false,
      });
    }, 0);
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.algVer !== algVer) })
  }

  addVersionModalCancel = () => {
    this.setState({
      showAddVersionModal: false,
    });
  }

  // handleDeleteRow = (algVer) => {
  //   sessionStorage.setItem("deleteAlgVer", algVer)
  //   this.showDeleteModalFn()
  //   const dataSource = [...this.state.data];
  //   this.setState({ data: dataSource.filter(item => item.algNo !== algNo) });
  // }

  algDetails = (text, record) => {
    alert("此功能待开发！")
    // console.log("获取参数成功！")
    // console.log(record)
    // const {dispatch} = this.props
    // dispatch(push('/algDetails'))
  }

  versionEdit = (text, record) => {
    console.log(record)
    window.localStorage.setItem("algVer", record.algVer)
    const { dispatch } = this.props
    dispatch(push('/versionEdit'))
  }

  versionInfo = (text, row, record) => {
    sessionStorage.setItem("algVer", row.algVer)
    this.props.history.push(`/versionInfo/${row.id}`);
  }

  handleTableChange = (pagination, filters, sorter, value) => {
    console.log(value)
    if ((typeof value) == 'object') {
      value = ""
    }
    if (value) {
      pagination.current = 1
    }

    // 存sessionStorage
    sessionStorage.setItem("pagination", JSON.stringify(pagination))
    sessionStorage.setItem("filters", JSON.stringify(filters))
    sessionStorage.setItem("sorter", JSON.stringify(sorter))

    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    });

    // 10页 20页 30页切换 -参数修改]
    param.param.pageRange = pagination.pageSize
    // 暂不支持搜索
    // param.param.algList.algVer = value
    console.log(pagination)

    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      ...filters,
    });
  }

  fetch = (params = {}) => {

    // if (params.page) {
    //   param.param.pageNo = params.page
    // }
    // param.param.aliasOrAlgName = sessionStorage.getItem("aliasOrAlgName")
    // param.param.pageNo = sessionStorage.getItem("algPageNo")
    // param.param.pageRange = sessionStorage.getItem("algPageRange")

    // this.setState({ loading: true });
    // const { dispatch } = this.props
    // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', param, (result) => {
    //   const pagination = { ...this.state.pagination }
    //   let algList = result.data.data.algList;
    //   let algNo = sessionStorage.getItem("algNo");
    //   for (let i = 0; i < algList.length; i++) {
    //     let item = algList[i];
    //     if (item.algNo == algNo) {
    //       console.log('#########', item);
    //       pagination.total = item.verList.length
    //       this.setState({
    //         loading: false,
    //         data: item.verList,
    //         pagination
    //       });
    //     }
    //   }
    // })

    this.setState({ loading: true });
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'ALG_VERSION_LIST')('algVersionList', {id: this.props.match.params.id}, (res) => {
      const pagination = { ...this.state.pagination }
      let data = res.data && res.data.data;
      pagination.total = data.length
      this.setState({
        loading: false,
        data,
        pagination
      });
    })
  }

  createVersion = () => {
    const { dispatch } = this.props
    // 存储algNo作为唯一标识
    // window.localStorage.setItem("algNo",record.algNo)
    this.props.history.push('/createVersion');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageList } = this.state;
    // 需要添加镜像后才能创建版本
    const dockerImageValue = imageList && imageList.length ? (imageList[0].host + '/' + imageList[0].name + ':' + imageList[0].version) : null;
    const imageListOptions = imageList && imageList.length ? imageList.map(v => <Option key={v.id} value={v.host + '/' + v.name
      + ':' + v.version}>{v.host + '/' + v.name + ':' + v.version}</Option>) : <Option value="null">{null}</Option>;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 20 }, 
      },
    };

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
          showSouce: "none",
          showAddVersionForm: true
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
          message.error(intl.get('alg-detail-create-version-only-zip'));
          return false
        }
      }
    }

    return (
      <LocaleProvider locale={zh_CN}>
        {this.state.showAddVersionForm ? <div className="add_version_form" style={{ marginLeft: 0 }}>
          <Form onSubmit={this.handleSubmit} layout="inline">
            <Row>
              <div className="change_div versionCreate">
                <Button className="change_file" onClick={this.showAddVersionModalFn}>{intl.get('btn-change-file')}</Button><span className="file-url">{sessionStorage.getItem("source_url")}</span>
              </div>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem key={1} label={intl.get('alg-detail-version')} {...formItemLayout}>
                  {getFieldDecorator('algVer', {
                    rules: [{
                      required: true,
                      message: '必填项！',
                    },
                    {
                      validator: (rule, value, callback) => {
                        let reg = /^[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}$/;
                        console.log(value);
                        if (reg.test(value)) {
                          const { dispatch } = this.props;
                          let param = {
                            ...this.state.validateVersion,
                            param: {
                              ...this.state.validateVersion.param,
                              versionNo: value,
                            }
                          }
                          reduxSagaInjector(dispatch, 'VER_VERIFY')('verVerify', param, (result) => {
                            if (result.data && result.data.data) {
                              callback('该版本号已经存在！');
                            } else {
                              callback();
                            }
                          })
                        } else {
                          callback('请输入三位有效版本号！');
                        }
                      }
                    }],
                  })(
                    <div className="tipInfo">
                      <Input placeholder={intl.get('alg-detail-version')} /><span>实例：1.0.0</span>
                    </div>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem key={2} label={intl.get('alg-detail-ima-url')} {...formItemLayout} className="dockerImage">
                  {getFieldDecorator('dockerImage', {
                    initialValue: dockerImageValue,
                    rules: [{ required: true, message: '请输入镜像地址!' }],
                  })(<Select>
                    {imageListOptions}
                  </Select>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem key={3} label={intl.get('alg-detail-file-type')} {...formItemLayout}>
                  {getFieldDecorator('execType', {
                    initialValue: "python",
                    rules: [{ required: true, message: '请选择执行文件类型!' }],
                  })(<Select>
                    <Option value="python">python</Option>
                    <Option value="shell">shell</Option>
                  </Select>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem key={5} label={intl.get('alg-detail-param-template')} {...formItemLayout}>
                  {getFieldDecorator('argsTemplate', {
                    rules: [
                      { required: true, message: '无效命令!' },
                      {
                        validator: (rule, value, callback) => {
                          let matchVal = value.match(/\$\{.*?\}/g);
                          if (!matchVal) return callback('无效命令!');
                          if (matchVal.length) {
                            let temp = {}, isRepeat = false, isSpace = false, isErr = false;
                            for (let i = 0; i < matchVal.length; i++) {
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
                        }
                      }
                    ],
                  })(
                    <div className="tipInfo param">
                      <Input placeholder="按实例格式输入命令，生成参数" onChange={this.paramChange} />
                      <span>{'$' + '{' + 'name}'}</span>
                    </div>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem key={6} label={intl.get('alg-detail-param-remark')} {...formItemLayout}>
                  {getFieldDecorator('remarks')(
                    <div className="tipInfo param">
                      <Input placeholder="请输入备注" />
                    </div>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem key={4} label={intl.get('alg-detail-run-file')} {...formItemLayout} className="execFile">
                  {getFieldDecorator('execFile', {
                    rules: [{ required: true, message: '请输入算法执行文件!' }],
                  })(
                    <div className="tipInfo">
                      <Input placeholder="执行文件" /><span>实例:eye.py</span>
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            {this.state.addVersionDataList.length ? <div className="ver-cre-list-wapper">
              <CommonTable
                showHeader={true}
                columns={this.columnsForAddVersion}
                dataSource={this.state.addVersionDataList}
                key={'key'}
                className="ver-cre-list"
              />
            </div> : null}
            <Row>
              <Col span={8}>
                <FormItem label={intl.get('alg-detail-cpu-num')} className="inline">
                  {getFieldDecorator('cpuLimit', {
                    // initialValue: 1,
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
                  })(<Input style={{ width: '100px' }} placeholder="默认值:1" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={intl.get('alg-detail-gpu-num')} className="inline">
                  {getFieldDecorator('gpuLimit', {
                    // initialValue: 0,
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
                  })(<Input style={{ width: '100px' }} placeholder="默认值:0" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={intl.get('alg-detail-memory-size')} className="inline">
                  {getFieldDecorator('memoryLimit', {
                    // initialValue: 512,
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
                  })(<Input style={{ width: '100px' }} placeholder="默认值:512" />)}
                </FormItem>
              </Col>
            </Row>
            <div className="ant-row ant-form-item submit">
              <div className="ant-form-item-control-wrapper">
                <div className="ant-form-item-control">
                  <button type="primary" htmlType="submit" className="ant-btn confim ant-btn-primary">{intl.get('btn-create-version')}</button>
                  <button type="button" onClick={this.handleCancel} className="ant-btn cancel ant-btn-dashed">{intl.get('btn-back')}</button>
                </div>
              </div>
            </div>
          </Form>
        </div> :
          <div>
            <Button type="primary" onClick={this.showAddVersionModalFn} style={{position:"absolute"}}>{intl.get('btn-create-version')}</Button>
            {this.state.showAddVersionModal ? <Modal
              visible={this.state.showAddVersionModal}
              title={intl.get('btn-create-version')}
              okText={intl.get('btn-add-version')}
              cancelText={intl.get('btn-cancel')}
              onCancel={this.addVersionModalCancel}
              onOk={this.onCreate}
              className="cre-alg-modal versionCreate"
              width="600px"
              maskClosable={false}
              centered={true}
              destroyOnClose={true}
              maskStyle={{ "backgroundColor": 'rgba(0, 0, 0, 0.4)' }}
            >
              <div>
                <div style={{ display: this.state.showSouce }}>
                  <Form layout="vertical" style={{ display: this.state.uploadFirst }}>
                    <div>
                      <img src={require('./zip.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                    </div>
                    <p className="tip-upload" style={{ display: this.state.upload }}>{intl.get('alg-detail-create-version-tip-upload')}</p>
                    <FormItem label="">
                      {getFieldDecorator('uploadModel', {
                        rules: [{ required: true, message: ' ' }],
                      })(<Upload {...props} showUploadList="false" style={{ display: this.state.display }}>
                        <Button htmlType="submit" className="souUplBut">
                        {intl.get('alg-detail-create-version-btn-upload')}
                    </Button>
                        <p className="tip">{intl.get('alg-detail-create-version-only-zip')}</p>
                      </Upload>)}
                    </FormItem>
                  </Form>
                  <Form layout="vertical" className="upload-repeat" style={{ display: this.state.uploadRepeat }}>
                    <div style={{ display: this.state.errorImg }}>
                      <img src={require('./error.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                    </div>
                    <div style={{ display: this.state.zipImg }}>
                      <img src={require('./zip.png')} style={{ display: "block", float: "left", margin: "20px 31px 0 109px " }} />
                    </div>
                    <p className="tip-upload" style={{ display: this.state.upload }}>{intl.get('alg-detail-create-version-tip-upload')}</p>
                    <FormItem label="">
                      {getFieldDecorator('uploadModel', {
                        rules: [{ required: true, message: ' ' }],
                      })(<Upload {...props} showUploadList="false" style={{ display: this.state.display }}>
                        <Button htmlType="submit" className="souUplBut upload-error">
                          {intl.get('btn-reselect-file')}
                        </Button>
                        <p className="errorBar"></p>
                        <p className="tip">{intl.get('alg-detail-create-version-upload-failed')}</p>
                      </Upload>)}
                    </FormItem>
                  </Form>
                  <Button onClick={this.addVersionModalCancel} style={{ "marginLeft": "480px" }}>{intl.get('btn-cancel')}</Button>
                </div>
              </div>
            </Modal> : null}
            {
              // <Search
              //    placeholder="按条件搜索..."
              //    onSearch={(value) => this.handleTableChange(JSON.parse(sessionStorage.getItem("pagination")), JSON.parse(sessionStorage.getItem("filters")),  JSON.parse(sessionStorage.getItem("sorter")),value)}
              //    enterButton
              //    style={{ width: 200,height:34 }}
              //    className="search"
              //  />
            }
            <Table
              columns={this.columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              className="table"
              rowKey={'id'}
              style={{ paddingLeft: 0 }}
            />
          </div>}
      </LocaleProvider>
    )
  }
}

export default withRouter(Form.create()(algorithmManagement));
