/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, Carousel, Switch, LocaleProvider, Breadcrumb,
  Menu, Divider, Tag, Popconfirm, Modal, Input, Form, message
} from 'antd'
import Moment from 'moment'
const Search = Input.Search
import _ from 'lodash'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import 'moment/locale/zh-cn'
import { withRouter } from "react-router-dom";
import CommonTable from '../../components/common/commonTable/index'
import CommonPagination from '../../components/common/commonPagination/index'
import Config from '@/config/base.config'
import intl from 'react-intl-universal';

message.config({
  top: 200
})

const paramCreate = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "algName": "",
    "algType": "",
    "alias": "",
    "appId": "",
    "description": "",
    "inputType": "file",
    "outputType": "file",
    "priority": 0,
    "uid": ""
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

@connect(null)
class TaskManList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      param: {
        "caller": "browser",
        "intfName": "",
        "param": {
          "pageNo": 1,
          "pageRange": 10,
          "status": "",
        },
        "sign": "",
        "timestamp": Date.parse(new Date()),
        "version": "2.5.1"
      },
      pagination: {
        current: 1,
        total: 0,
        // pageSizeOptions: ['10', '20', "30"]
      },
      ModalText: '是否确认删除该算法？',
      visible: false,
      confirmLoading: false,
      visibleCreate: false,
    };
    this.columns = [
      // {
      //   title: '任务ID',
      //   key:'1',
      //   dataIndex: 'taskName',
      //   // width: "14%",
      //   render: (text) => <span className="col-sql">{text || '--'}</span>
      // },
      {
        title: intl.get('task-list-inv'),
        key:'2',
        dataIndex: 'platform',
        // width: "14%",
        render: (text) => <span className="col-sql">{text || '--'}</span>
      },
      {
        title: intl.get('task-cre-user'),
        key:'3',
        dataIndex: 'userId',
        // width: "12%",
        render: (text) => <span className="col-sql">{text || '自动提交'}</span>
      },
      {
        title: intl.get('task-cre-date'),
        key:'4',
        dataIndex: 'createTime',
        // width: "14%",
        render: (text) => <span className="col-sql">{!text && text != '0' ? '--' : `${Moment(text*1000).format('YYYY-MM-DD HH:mm:ss')}`}</span>
      },
      {
        // 0:准备，10:执行中, 100:结束, -1:异常，80:取消，50:暂停
        title: intl.get('list-status'),
        key:'5',
        dataIndex: 'status',
        // width: "30%",
        render: (text, record) => <div className={`col-sql status ${this.handleStatusClass(text)}`}>{this.handleStatus(text)}</div>
      },
      {
        // 0:准备，10:执行中, 100:结束, -1:异常，80:取消，50:暂停
        title: intl.get('task-is-normal'),
        key:'6',
        dataIndex: 'error',
        // width: "30%",
        render: (text, record) => <div className={`col-sql ${text == 1 ? 'error' : ''}`}>{text == 1 ? '异常' : '正常'}</div>
      },
      {
        title: intl.get('list-status'),
        key:'7',
        dataIndex: 'verList',
        // width: "8%",
        render: (text, row, record) => {
          return (
            <div className="algBut">
              <a href="javascript:;" onClick={() => this.algDetails(text, row, record)} className="details">{intl.get('btn-vie')}</a>
              {/* <a href="javascript:;" className="delete" onClick={() => this.handleDelete(row.algNo)}>删除</a> */}
              {/* <Modal title="删除算法"
                okText="确认"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                centered={true}
                className="deleteModal"
                width="400px"
              >
                <p>{this.state.ModalText}</p>
              </Modal> */}
            </div>
          )
        },
      }
    ]
  }
  handleStatusClass = (text) => {
    let res = '';
    // 0:准备，10:执行中, 100:结束, -1:异常，80:取消，50:暂停
    switch (text) {
      case '0': res = 'ceate';
        break;
      case '10': res = 'ongoing';
        break;
      case '100': res = 'finish';
        break;
      case '-1': res = 'abnormal';
        break;
      case '50': res = 'stop';
        break;
      case '80': res = 'cancel';
        break;
      default: res = '';
    }
    return res;
  }
  handleStatus = (text) => {
    let res = '--';
    // 0:准备，10:执行中, 100:结束, -1:异常
    switch (text) {
      case '0': res = '准备';
        break;
      case '10': res = '执行中';
        break;
      case '100': res = '结束';
        break;
      case '-1': res = '异常';
        break;
      case '50': res = '暂停';
        break;
      case '80': res = '取消';
        break;
      default: res = '--';
    }
    return res;
  }

  componentDidMount() {
    this.getDataList();
    
    clearInterval(this.timer);
    this.timer = setInterval(this.getDataList, Config.timer || 30000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  fmtDate = (obj) => {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const algNo = sessionStorage.getItem("deleteAlgID");
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 0);
    const dataSource = [...this.state.data]
    this.setState({ data: dataSource.filter(item => item.algNo !== algNo) })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  handleDelete = (algNo) => {
    sessionStorage.setItem("deleteAlgID", algNo)
    this.showModal()
  }

  algDetails = (text, row, record) => {
    this.props.history.push(`/taskDetail/${row.id || ''}`);
  }

  getDataList = () => {
    // 手动种一个uid
    // if (!sessionStorage.getItem("uid")) {
    //     sessionStorage.setItem("uid", "unkown")
    // }

    // if (params.page) {
    //   param.param.pageNo=params.page
    // }
    const { dispatch } = this.props
    this.setState({
      loading: true
    });
    console.log('---------------------------this.state.param-----------------', this.state.param);
    reduxSagaInjector(dispatch, 'ALG_LIST')('getTaskList', this.state.param.param, (result) => {
      let res = result.data.data;
      this.setState({
        loading: false,
        data: res.data,
        pagination: {
          ...this.state.pagination,
          total: res.pagination.totalRecords
        }
      });
    })
  }

  onSearch = (val) => {
    this.setState({
      param: {
        param: {
          ...this.state.param.param,
          taskName: val,
          pageNo: 1,
        }
      },
      pagination: {
        ...this.state.pagination,
        current: 1
      }
    }, () => {
      this.getDataList();
    });
  }

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      param: {
        param: {
          ...this.state.param.param,
          pageNo: 1,
          pageRange: pageSize
        }
      },
      pagination: {
        ...this.state.pagination,
        current: 1
      }
    }, () => {
      this.getDataList();
    });
  }

  handlePagination = (pageNum) => {
    this.setState({
      param: {
        param: {
          ...this.state.param.param,
          pageNo: pageNum
        }
      },
      pagination: {
        ...this.state.pagination,
        current: pageNum
      }
    }, () => {
      this.getDataList();
    });
  };

  showModalCreate = () => {
    this.setState({ visibleCreate: true });
  }


  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item className="crumb"><span className="cur">{intl.get('nav-tas-sch')}</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-container task_man">
            <div className="tool_bar clear_fix">
              {/* <div className="creAlg">
                 <Button type="primary" onClick={this.showModalCreate}>添加模板</Button>
               </div> */}
              {/* <Search
                placeholder="按条件搜索..."
                onSearch={(value) => this.onSearch(value)}
                enterButton
                style={{ width: 200, height: 34 }}
                className="search"
              /> */}
            </div>
            <CommonTable
              columns={this.columns}
              dataSource={this.state.data}
              pagination={false}
              loading={this.state.loading}
              rowKey={'id'}
            />
            <CommonPagination
              onChange={this.handlePagination.bind(this)}
              onShowSizeChange={this.onShowSizeChange.bind(this)}
              current={this.state.pagination.current} //当前是哪一页
              pageSize={this.state.param.param.pageRange}//页面条数
              total={this.state.pagination.total} // 一共多少条
              showSizeChanger={true}
            />
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default withRouter(TaskManList);
