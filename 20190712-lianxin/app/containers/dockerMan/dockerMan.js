/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Select, Switch, Upload, LocaleProvider, Breadcrumb, Form, Input, Table, Modal, message } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import _ from 'lodash'
import urlConfig from '@/config/base.config'
import './index.scss'
import { push } from 'react-router-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'

const zh_CN = require('antd/lib/locale-provider/zh_CN');
import 'moment/locale/zh-cn';
import intl from 'react-intl-universal';
const { TextArea, Search } = Input

const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "imageName": "",
    "pageNo": 1,
    "pageRange": 10
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const imageStatusUpdateParam = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "imageId": 0,
    "status": ""
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

const mapStateToProps = ({ algList }) => {
  if (!algList) return {}
  // 数据已经拿到
  // console.log(algList)
  // return {
  //   userList: userList.userList
  // }
}

@connect(mapStateToProps)
class algorithmManagement extends Component {

  fmtDate = (obj) => {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
  }

  state = {
    params:{
      "caller": "string",
      "param": {
      },
      "timestamp": 0,
      "version": "string"
  },
    data: [],
    pagination: {
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', "30"],
      onShowSizeChange: function (current, pageSize) {
        console.log(current, pageSize);
      },
    },
    reselectFile: false,
    showCreDockerModal: false,
    loading: false,
    ModalText: '所选镜像将会被永久删除',
    confirmLoading: false
  };

  handleOnChange = (checked) => {
    console.log(`${checked}`)
    // if (`${checked}`==false) {}
    imageStatusUpdateParam.param.status = `${checked}` == "false" ? 1 : 0
    imageStatusUpdateParam.param.imageId = sessionStorage.getItem("SaveId");
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST')('imageStatusUpdate', imageStatusUpdateParam, (result) => {
      console.log(result)
    })
  }
  handleSaveId = (id) => {
    sessionStorage.setItem("SaveId", id)
  }
  toDetail = (text, row, record) => {
    this.props.history.push(`/dockerDetail/${row.id}`);
  }

  constructor(props) {
    super(props)
    this.state = {
      upload: true,
      showCreDockerModal: false,
      params: {
        "caller": "string",
        "param": {
          "host": "string",
          "id": 0,
          "name": "string",
          "summary": "string",
          "path": "",
          "uid": "string",
          "version": "string"
        },
        "timestamp": 0,
        "version": "string"
      }
    }
    this.columns = [
      {
        title: `${intl.get('ima-ima')}`,
        dataIndex: 'name',
        key: '0',
        width: "18%",
        render: (name) => <span className="col-sql">{name}</span>
      },
      {
        title: `${intl.get('ima-ser')}`,
        dataIndex: 'host',
        key: '1',
        width: "25%",
        render: (host) => <span className="col-sql">{host}</span>
      },
      {
        title: `${intl.get('ima-ver')}`,
        dataIndex: 'version',
        key: '2',
        width: "18%",
        render: (version) => <span className="col-sql">{version}</span>
      },
      {
        title: `${intl.get('ima-des')}`,
        dataIndex: 'summary',
        key: '3',
        width: "25%",
        render: (summary) => {
          if (summary == "") {
            summary = "--"
          }
          return (
            <span className="col-sql">{summary}</span>
          )
        }
      },
      {
        title: intl.get('ima-structure-status'),
        dataIndex: 'buildStatus',
        key: '4',
        width: "12%",
        render: (text, row, index) => {
          // 0:准备中;1:构建中;2成功;-1:失败
          let status = '--';
          switch (text) {
            case 0: status = '准备中'
              break;
            case 1: status = '构建中'
              break;
            case 2: status = '成功'
              break;
            case -1: status = '失败'
              break;
            default:
              break;
          }
          return status;
        }
      },
      {
        title: `${intl.get('list-status')}`,
        dataIndex: 'status',
        key: '5',
        width: "8%",
        render: (text, row, index) => {
          const status = row.status == 0 ? true : false
          return (
            <div onClick={() => this.handleSaveId(row.id)}>
              <Switch defaultChecked={status} className="switch" onChange={this.handleOnChange} />
            </div>
          )
        },
      },
      {
        title: `${intl.get('list-edit')}`,
        dataIndex: 'verList',
        key: '6',
        width: "10%",
        render: (text, row, record) => {
          return (
            <div className="algBut">
              {/* <a href="javascript:;" onClick={ () => this.editRow(text,row,record)} className="delete">{intl.get('btn-edit')}</a> */}
              <a href="javascript:;" onClick={() => this.toDetail(text, row, record)} className="delete">{intl.get('btn-vie')}</a>
              {
                // <a href="javascript:;" onClick={ () => this.algDetails(text,row,record)}>版本({row.verList.length})</a>
                // <Divider type="vertical" />
                // <a href="javascript:;" onClick={ () => this.algDetails2(text, record)}>统计</a>
                // <Divider type="vertical" />
              }
              {
                // {<Popconfirm title="你确定删除吗？"  okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(row.algNo)}>
                //     <a href="javascript:;"  className="delete">删除</a>
                // </Popconfirm>
                //<a href="javascript:;"  className="delete" onClick={this.showModal}>删除</a>
                //     <a href="javascript:;"  className="delete" onClick={() => this.handleDelete(row.name)}>删除</a>
                //      <Modal title="删除镜像"
                // okText="确认"
                //        visible={this.state.visible}
                //        onOk={this.handleOk}
                //        confirmLoading={this.state.confirmLoading}
                //        onCancel={this.handleCancel}
                //        centered={true}
                //        className="deleteModal"
                //        width="400px"
                //      >
                //        <p>{this.state.ModalText}</p>
                //      </Modal>
                //
              }
            </div>
          )
        },
      }
    ]
  }

  handleDelete = (name) => {
    sessionStorage.setItem("deleteAlgID", name);
    this.showModal()
  }

  handleTableChange = (pagination, filters, sorter, value) => {
    if ((typeof value) == 'object') {
      value = undefined
    }
    if (!pagination) pagination = {};
    if (value !== undefined) {
      pagination.current = 1
      sessionStorage.setItem("imageNameCode", value)
      param.param.imageName = sessionStorage.getItem("imageNameCode")
    }
    // 存sessionStorage
    sessionStorage.setItem("pagination", JSON.stringify(pagination))
    sessionStorage.setItem("filters", JSON.stringify(filters))
    sessionStorage.setItem("sorter", JSON.stringify(sorter))

    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    // 10页 20页 30页切换 -参数修改]
    param.param.pageRange = pagination.pageSize
    // 通过别名查询
    //param.param.imageName = value

    console.log(pagination)
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    if (params.page) {
      param.param.pageNo = params.page
    }
    this.setState({ loading: true });
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST')('imageList', param, (result) => {
      const pagination = { ...this.state.pagination };
      pagination.total = result.data.data.pagination.totalRecords;
      this.setState({
        loading: false,
        data: result.data.data.data,
        pagination
      });
    })
  }

  fetchFirst = (params = {}) => {
    if (params.page) {
      param.param.pageNo = params.page
    }

    // 首次加载，重新赋值
    param.param.pageNo = 1
    param.param.pageRange = 10
    param.param.imageName = ""

    sessionStorage.setItem("algPageRange", 10)
    sessionStorage.setItem("algPageNo", 1)
    sessionStorage.setItem("imageName", "")

    this.setState({ loading: true });
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST')('imageList', param, (result) => {
      const pagination = { ...this.state.pagination };
      pagination.total = result.data.data.pagination.totalRecords;
      this.setState({
        loading: false,
        data: result.data.data.data,
        pagination
      });
    })
  }

  componentDidMount() {
    this.fetchFirst()
  }

  showModal = () => {
    this.setState({
      showCreDockerModal: true,
      reselectFile: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let params = this.state.params;
      params.param = {
        ...params.param,
        ...fieldsValue,
        path: params.param.path
      }
      reduxSagaInjector(dispatch, 'CRE_IMAGE')('creImage', params, (result) => {
        if (result.data.retCode == 0) {
          this.fetchFirst();
          this.setState({
            showCreDockerModal: false,
            // confirmLoading: false,
          });
        }
      })
    })
  }

  handleCancel = () => {
    this.setState({
      showCreDockerModal: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      action: urlConfig.proxyHost + '/alg/upload/docker/files',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      accept: "zip/*",
      onChange: (info) => {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response.retCode == 0) {
            let params = this.state.params;
            params.param = {
              ...params.param,
              path: info.file.response.data
            };
            this.setState({
              reselectFile: true,
              params: {
                ...params,
              },
            })
          } else {
            this.sourceError()
          }
        } else if (info.file.status === 'error') {
        }
      },
      sourceSucess: (file) => {
      },
      sourceError: () => {
      },
      closeMoal: () => {
      },
      beforeUpload: (file) => {
        if (file.name.match(/.zip$/g)) {
        } else {
          message.error(intl.get('alg-detail-create-version-only-zip'));
          return false
        }
      }
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 9 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 15 },
        sm: { span: 19 },
      },
    };
    return (
      <LocaleProvider locale={zh_CN}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item className="crumb"><span className="cur">{intl.get('nav-ima-man')}</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-container">
            <div className="search_bar clear_fix">
              <Button className="cre_image_btn" type="primary" onClick={this.showModal}>{intl.get('btn-add-image')}</Button>
              <Search
                placeholder={intl.get('list-search')}
                onSearch={(value) => this.handleTableChange(JSON.parse(sessionStorage.getItem("pagination")), JSON.parse(sessionStorage.getItem("filters")), JSON.parse(sessionStorage.getItem("sorter")), value)}
                enterButton
                style={{ width: 200, height: 34 }}
                className="search"
              />
            </div>
            <Table
              columns={this.columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              rowKey={'id'}
              className="table"
            />
          </div>
          {this.state.showCreDockerModal && <Modal
            title={intl.get('btn-add-image')}
            okText={intl.get('btn-ok')}
            visible={this.state.showCreDockerModal}
            onOk={this.handleSubmit}
            // confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            centered={true}
            className="cre-image-modal"
            width="650px">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label={intl.get('ima-ima')+'：'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: ' ' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label={intl.get('ima-ser')+'：'} {...formItemLayout}>
                {getFieldDecorator('host', {
                  rules: [{ required: true, message: '只允许中文/英文，限制长度32', whitespace: true, max: 32, pattern: '^[\u4e00-\u9fa5a-zA-Z]+$' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label={intl.get('ima-ver')+'：'} {...formItemLayout}>
                {getFieldDecorator('version', {
                  rules: [{ required: true, message: '只允许英文/_/()/*限制长度64', whitespace: true, max: 64, pattern: '^[a-zA-Z/_/()/*]+$' }],
                })(<div>
                  <Input placeholder="例: 1.0.1" style={{ width: '154px' }} />
                  <span className="tip">默认指向最新版本或手动输入版本号：例 1.0.1</span>
                </div>)}
              </FormItem>
              <FormItem label={intl.get('ima-des')+'：'} {...formItemLayout}>
                {getFieldDecorator('summary', {
                  rules: [{ required: false, message: intl.get('alg-form-max-len-2000'), max: 2000 }]
                })(<TextArea rows={5} style={{ height: "102px" }} placeholder={intl.get('alg-form-alg-des')} />)}
              </FormItem>
              <FormItem label={intl.get('ima-file')+'：'} {...formItemLayout} className="last_no_margin">
                {getFieldDecorator('path', {
                  rules: [{ required: true, message: '请选择镜像文件!' }],
                  initialValue: this.state.params.param.path
                })(<div>
                  <Upload {...props} showUploadList="false" className="upload_image_file">
                    <Button className="update_file_btn">{this.state.reselectFile ? intl.get('btn-reselect-file') : intl.get('btn-select-file')}</Button>
                    <span className="tip">仅支持DOCKERFILE</span>
                  </Upload>
                  <div className="file_path">{this.state.params.param.path || ''}</div>
                </div>)}
              </FormItem>
            </Form>
          </Modal>}
        </div>
      </LocaleProvider>
    )
  }
}

export default Form.create()(algorithmManagement)
