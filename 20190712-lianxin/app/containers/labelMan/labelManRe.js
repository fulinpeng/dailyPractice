/*
 * @Description: 算法管理列表
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Carousel, Switch ,LocaleProvider, Breadcrumb, Menu,message} from 'antd'
import _ from 'lodash'
// import './index.scss'
import { Table, Divider, Tag, Popconfirm, Modal } from 'antd'
import { Input, Form } from 'antd'
import { push } from 'react-router-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import CreateLabelBtn from './creLabelBtn'
import LabelBtnEdit from './labelBtnEdit'
const Search = Input.Search
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import 'moment/locale/zh-cn'

const param ={
  "caller": "browser",
  "intfName": "",
  "param": {
    "labelName": "",
    "labelPinYin": "",
    "pageNo": 0,
    "pageRange": 10
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

const algLabelStatusUpdateParam ={
  "caller": "browser",
  "intfName": "",
  "param": {
    "labelId": 0,
    "status": ""
  },
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}

const mapStateToProps = ({ algList }) => {
  if(!algList) return {}
  // 数据已经拿到
  // console.log(algList)
  // return {
  //   userList: userList.userList
  // }
}

@connect(mapStateToProps)

class algorithmManagement extends Component {

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
         console.log(current, pageSize);
      },
    },
    loading: false,
    ModalText: '所选标签将会被永久删除',
    visible: false,
    confirmLoading: false
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
    const id = sessionStorage.getItem("deleteAlgID")
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 0);
    // const dataSource = [...this.state.data];
    // this.setState({ data: dataSource.filter(item => item.id != id) })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  handleOnChange = (checked) => {
    console.log(`${checked}`)
    // if (`${checked}`==false) {}
    algLabelStatusUpdateParam.param.status=`${checked}`=="false"?1:0
    algLabelStatusUpdateParam.param.labelId=sessionStorage.getItem("SaveId");
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST')('algLabelStatusUptade', algLabelStatusUpdateParam, (result) => {
      console.log(result)
    })
  }
  handleSaveId = (id) => {
      console.log(id)
      sessionStorage.setItem("SaveId",id)
  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '标签名称',
        dataIndex: 'labelName',
        key: '0',
        width:"22%"
      },
      {
        title: '标签拼音',
        dataIndex: 'labelPinYin',
        key: '1',
        width:"26%"
      },
      {
      title: '状态',
      dataIndex: 'status',
      key: '2',
      width:"45%",
      render: (text, row, index) => {
        const status = row.status==0 ? true:false
        return (
          <div onClick={() =>this.handleSaveId(row.id)}>
              <Switch defaultChecked={status}  className="switch" onChange={this.handleOnChange}/>
          </div>
            )
          },
        // render: (text, row, index) => {
        //   console.log(row)
        //   return (
        //     <div>
        //       <div>{row.algName}/{row.alias}/{row.algType}</div>
        //       <div className="argDic">{row.algNo}{this.fmtDate(row.createTime)}</div>
        //       <div className="argDic">{row.description}</div>
        //     </div>
        //   )
        // },
    },
    {
      title: '操作',
      dataIndex: 'verList',
      key: '3',
      width:"10%",
      render: (text, row, record) => {
        return(
              <div className="algBut">
                <a href="javascript:;" onClick={ () => this.algDetails(text,row,record)} className="details"><LabelBtnEdit/></a>
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
                <a href="javascript:;"  className="delete" onClick={() => this.handleDelete(row.id,row.status)}>删除</a>
                 <Modal title="删除标签"
                   visible={this.state.visible}
                   onOk={this.handleOk}
                   okText="确认"
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

  handleDelete = (id,status) => {
    sessionStorage.setItem("deleteAlgID", id);
    this.fetchDelete()
    // if(status==0) {
    //   message.warning('无法删除此标签，因为其已被引用')
    // }else {
    //   this.showModal()
    // }
    //const dataSource = [...this.state.data];
    //this.setState({ data: dataSource.filter(item => item.algNo !== algNo) });
  }

  algDetails  = (text,row,record) => {
    console.log(row)
    sessionStorage.setItem("labelName", row.labelName)
    sessionStorage.setItem("labelId", row.id)
    // console.log("获取参数成功！")
    // console.log(record)
    // const {dispatch} = this.props
    // // 存储algNo作为唯一标识
    // window.localStorage.setItem("algNo",row.algNo)
    // dispatch(push('/algDetailsTab'))
    // const {dispatch} = this.props
    // dispatch(push('/labelModalEdit'))
  }

  handleTableChange = (pagination, filters, sorter, value) => {
    console.log(value)
    if( (typeof value) =='object') {
      value=undefined
    }
    if (!pagination) pagination = {};
    if (value !== undefined) {
      pagination.current=1
      sessionStorage.setItem("labelNameCode",value)
      param.param.labelName = sessionStorage.getItem("labelNameCode")
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
    // 通过别名查询
    // 10页 20页 30页切换 -参数修改]
    param.param.pageRange = pagination.pageSize

    console.log(pagination)
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
    reduxSagaInjector(dispatch, 'ALG_LIST')('labelList', param, (result) => {
      console.log(result)
      const pagination = { ...this.state.pagination }
      pagination.total = result.data.data.pagination.totalRecords
      this.setState({
         loading: false,
         data: result.data.data.data,
         pagination
       });
    })
  }

  fetchDelete = (params = {}) => {

    if (params.page) {
      param.param.pageNo=params.page
    }
    //param.param.uid = sessionStorage.getItem("uid")
    //this.setState({ loading: true });
    const {dispatch} = this.props
    //JSON.stringify(param)
    // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', {list: 3}, 'algList')
    reduxSagaInjector(dispatch, 'ALG_LIST')('labelList', param, (result) => {
      for (let i = 0; i<result.data.data.data.length; i++) {
        if (sessionStorage.getItem("deleteAlgID")==result.data.data.data[i].id) {
          if(result.data.data.data[i].status==0){
             message.warning('无法删除此标签，因为其已被引用')
          }else {
            this.showModal()
          }
        }
      }
    })
  }

  fetchFirst = (params = {}) => {

    if (params.page) {
      param.param.pageNo=params.page
    }

    // 首次加载，重新赋值
    param.param.pageNo=1
    param.param.pageRange=10
    param.param.labelName=""

    sessionStorage.setItem("algPageRange", 10)
    sessionStorage.setItem("algPageNo",1)
    sessionStorage.setItem("labelName","")

    //param.param.uid = sessionStorage.getItem("uid")
    this.setState({ loading: true });
    const {dispatch} = this.props
    //JSON.stringify(param)
    // reduxSagaInjector(dispatch, 'ALG_LIST')('algList', {list: 3}, 'algList')
    reduxSagaInjector(dispatch, 'ALG_LIST')('labelList', param, (result) => {
      console.log(result)
      const pagination = { ...this.state.pagination }
      pagination.total = result.data.data.pagination.totalRecords
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
  render() {
    return (
      <LocaleProvider  locale={zh_CN}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item className="crumb"><span>字典管理</span><span className="sub cur"><span className="icon">/</span>标签管理</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-container">
            <div>
            <CreateLabelBtn/>
            <Search
               placeholder="按条件搜索..."
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
              rowKey={'id'}
              className="table"
            />
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default algorithmManagement
