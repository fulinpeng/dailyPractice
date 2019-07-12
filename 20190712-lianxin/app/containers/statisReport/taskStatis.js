/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel, Switch ,LocaleProvider, Breadcrumb,
Menu,Table, Divider, Tag, Popconfirm, Modal,Input, Form, message} from 'antd'
const Search = Input.Search
import _ from 'lodash'
import './index.scss'
import { push } from 'react-router-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import 'moment/locale/zh-cn'
import CreateModal from './creModal'
import intl from 'react-intl-universal';

message.config({
  top: 200
})

const paramCreate ={
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

const param ={
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



@connect(null)
class TaskStatis extends Component {

  fmtDate = (obj) => {
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)
  }

  state = {
    data: [],
    pagination: {
      showSizeChanger:true,
      pageSizeOptions:['10', '20',"30"],
      onShowSizeChange:function(current, pageSize){
         console.log(current, pageSize)
      },
    },
    loading: false,
    ModalText: intl.get('alg-modal-del-des'),
    visible: false,
    confirmLoading: false,
    visibleCreate: false,
  };

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

  checkStatus = (row) => {
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALG_STATUS')('algStatus', {
      enable: row.enable == 1 ? 0 : 1,
      id: row.id
    }, (result) => {
      if (result.data && result.data.retCode == 0) {
        this.fetch({
          page : 1
        });
      }
    })
  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: `${intl.get('alg-zh-name')}`,
        dataIndex: 'algName',
        key: '0',
        width:"14%",
        render: (alias) => <span className="col-sql">{alias}</span>
      },
      {
        title: `${intl.get('alg-en-name')}`,
        dataIndex: 'alias',
        key: '1',
        width:"14%",
        render: (alias) => <span className="col-sql">{alias}</span>
      },
      {
        title: `${intl.get('alg-alg-tym')}`,
        dataIndex: 'algType',
        key: '2',
        width:"14%",
        render: (algType) => <span className="col-sql">{algType}</span>
      },
      {
        title: `${intl.get('alg-user')}`,
        dataIndex: 'uid',
        key: '3',
        width:"12%",
        render: (uid) => <span className="col-sql">{uid}</span>
      },
      {
        title: `${intl.get('alg-des')}`,
        dataIndex: 'description',
        key: '4',
        width:"30%",
        render: (description) => <span className="col-sql" title={description || ''}>{description || '--'}</span>
      },
      {
        title: `${intl.get('list-status')}`,
        dataIndex: 'enable',
        key: '5',
        width:"6%",
        render: (text, row, index) => {
          return (
              <Switch defaultChecked={text == 1 ? false : true} onChange={this.checkStatus.bind(this, row)} className="switch"/>
            )
          },
      },
    {
      title: `${intl.get('list-edit')}`,
      dataIndex: 'verList',
      key: '6',
      width:"8%",
      render: (text, row, record) => {
        return(
              <div className="algBut">
                <a href="javascript:;" onClick={ () => this.algDetails(text,row,record)} className="details">{intl.get('btn-vie')}</a>
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
                }
                <a href="javascript:;"  className="delete" onClick={() => this.handleDelete(row.algNo)}>{intl.get('btn-del')}</a>
                <Modal title={intl.get('alg-modal-del-tit')}
                  okText={intl.get('btn-ok')}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={this.handleCancel}
                  centered={true}
                  className="deleteModal"
                  width="400px"
                >
                   <p>{this.state.ModalText}</p>
                 </Modal>
                </div>
        )
      },
    }]
  }

  handleDelete = (algNo) => {
    sessionStorage.setItem("deleteAlgID", algNo)
    this.showModal()
    // const dataSource = [...this.state.data];
    // this.setState({ data: dataSource.filter(item => item.algNo !== algNo) });
  }

  algDetails  = (text,row,record) => {
    const {dispatch} = this.props
    // 存储algNo作为唯一标识
    sessionStorage.setItem("algNo", row.algNo)
    sessionStorage.setItem("algId", row.id)
    this.props.history.push(`/algDetailsTab/${row.id}`)
  }

  handleTableChange = (pagination, filters, sorter, value) => {
    if( (typeof value) =='object') {
      value=undefined
    }
    if (!pagination) pagination = {};
    if (value !== undefined) {
      pagination.current=1
      sessionStorage.setItem("aliasOrAlgName",value)
      param.param.aliasOrAlgName = sessionStorage.getItem("aliasOrAlgName")
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
    //console.log(pagination)

    sessionStorage.setItem("algPageRange", pagination.pageSize)
    sessionStorage.setItem("algPageNo", pagination.current)

    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    if (params.page) {
      param.param.pageNo=params.page
    }
    //param.param.uid = sessionStorage.getItem("uid")
    this.setState({ loading: true });
    const {dispatch} = this.props
    //JSON.stringify(param)
    // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', {list: 3}, 'algList')
    reduxSagaInjector(dispatch, 'ALG_LIST')('algList', param, (result) => {
      const pagination = { ...this.state.pagination }
      console.log(pagination)
      pagination.total = result.data.data.count;
      if (params.page) {
        pagination.current=params.page
      }
      this.setState({
        loading: false,
        data: result.data.data.algList,
        pagination
      }, () => {
        console.log('##################-pagination', this.state.pagination);
      });
    })
  }

  fetchFirst = (params = {}) => {

    // 手动种一个uid
    if (!sessionStorage.getItem("uid")) {
        sessionStorage.setItem("uid", "unkown")
    }

    if (params.page) {
      param.param.pageNo=params.page
    }
    //param.param.uid = sessionStorage.getItem("uid")
    this.setState({ loading: true });
    const {dispatch} = this.props

    // 首次加载，重新赋值
    param.param.pageNo=1
    param.param.pageRange=10
    param.param.aliasOrAlgName=""

    sessionStorage.setItem("algPageRange", 10)
    sessionStorage.setItem("algPageNo",1)
    sessionStorage.setItem("aliasOrAlgName","")

    reduxSagaInjector(dispatch, 'ALG_LIST')('algList', param, (result) => {
      const pagination = { ...this.state.pagination }
      console.log(pagination)
      pagination.total = result.data.data.count;
      this.setState({
         loading: false,
         data: result.data.data.algList,
         pagination
       });
    })
  }

  componentDidMount() {
    this.fetchFirst()
  }

  showModalCreate = () => {
    this.setState({ visibleCreate: true });
  }

  handleCancellCreate = () => {
    this.setState({ visibleCreate: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();

      paramCreate.param.algName = values.algName,
      paramCreate.param.algType = values.algType,
      paramCreate.param.alias = values.alias,
      paramCreate.param.appId = values.appId,
      paramCreate.param.description = values.description,
      //param.param.priority = values.priority
      paramCreate.param.uid = sessionStorage.getItem("uid")

      console.log(param)
      const {dispatch} = this.props

      reduxSagaInjector(dispatch, 'ALG_CREATE')('algCreate', paramCreate, (result) => {
        if (result.data.retCode === 0) {
            message.success("算法创建成功！")
            // 创建成功，重新请求数据
            this.fetch()
            // 关闭弹窗
            this.handleCancellCreate()
        } else {
          message.error(result.data.errMsg);
        }
      })
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <LocaleProvider  locale={zh_CN}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item className="crumb"><span className="cur">{intl.get('nav-alg-man')}</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-container">
            <div>
            <div className="creAlg">
              <Button type="primary" onClick={this.showModalCreate}>{intl.get('alg-list-add-alg')}</Button>
              {this.state.visibleCreate &&<CreateModal
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visibleCreate}
                onCancel={this.handleCancellCreate}
                onCreate={this.handleCreate}
              />}
            </div>
            <Search
               placeholder={intl.get('list-search')}
               onSearch={(value) => this.handleTableChange(JSON.parse(sessionStorage.getItem("pagination")), JSON.parse(sessionStorage.getItem("filters")),  JSON.parse(sessionStorage.getItem("sorter")),value)}
               enterButton
               style={{ width: 200,height:34 }}
               className="search"
             />
            </div>
            <Table
              columns={this.columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              className="table"
              rowKey={(a) => a.id}
            />
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default TaskStatis
