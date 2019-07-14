/*
 * @Description: 算法管理列表
  */

 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import {
   Button, Carousel, Switch, LocaleProvider, Breadcrumb,
   Menu, Divider, Tag, Popconfirm, Modal, Input, Form, message, Select
 } from 'antd'
 const Search = Input.Search
 const { TextArea } = Input
 import _ from 'lodash'
 import './index.scss'
 import { push } from 'react-router-redux'
 import reduxSagaInjector from '@/util/reduxSagaInjector'
 const zh_CN = require('antd/lib/locale-provider/zh_CN')
 import 'moment/locale/zh-cn'
 import CommonTable from '../../components/common/commonTable/index'
 import CommonPagination from '../../components/common/commonPagination/index'
 import CreateModal from './creModal'
 import intl from 'react-intl-universal';
 const FormItem = Form.Item
 message.config({
   top: 200
 })
 const mapStateToProps = ({ algList }) => {
   if (!algList) return {}
   // 数据已经拿到
   // console.log(algList)
   // return {
   //   userList: userList.userList
   // }
 }

@connect(null)
 class TemplateManList extends Component {

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
           "templateNameOrTemplateKey": "",
         },
         "sign": "",
         "timestamp": Date.parse(new Date()),
         "version": "2.5.1"
       },
       paramCreate:{
        "caller": "browser",
        "intfName": "",
        "param": {
          "canvasDetails": "",
          "description": "",
          "templateName": "",
          "templateType": "",
          "uid": "unknown",
          "userName": "admin"
        },
        "sign": "",
        "timestamp": Date.parse(new Date()),
        "version": "2.5.1"
      },
      paramDelete:{
        "id": 0
      },
      deleteID:0,
       pagination: {
         total: 0,
         current: 1,
         // pageSizeOptions: ['10', '20', "30"]
       },
       ModalText: intl.get('tem-list-modal-del-des'),
       visible: false,
       confirmLoading: false,
       visibleCreate: false,
     };
     this.columns = [
       {
         title: `${intl.get('tem-tem')}`,
         key: '0',
         dataIndex: 'templateName',
         // width: "14%",
         render: (text) => <span className="col-sql">{text}</span>
       },
       {
        title: `${intl.get('tem-num')}`,
         key: '1',
         dataIndex: 'templateKey',
         // width: "14%",
         render: (text) => <span className="col-sql">{text}</span>
       },
       {
        title: `${intl.get('tem-num')}`,
         key: '2',
         dataIndex: 'templateType',
         // width: "14%",
         render: (text) => <span className="col-sql">{text}</span>
       },
       {
        title: `${intl.get('tem-cre-user')}`,
         key: '3',
         dataIndex: 'userName',
         // width: "12%",
         render: (text) => <span className="col-sql">{text}</span>
       },
       {
        title: `${intl.get('tem-cre-date')}`,
         key: '4',
         dataIndex: 'created',
         // width: "30%",
         render: (text) => <span className="col-sql">{this.fmtDate(text)}</span>
       },
       {
        title: `${intl.get('list-edit')}`,
         key: '5',
         dataIndex: 'verList',
         // width: "8%",
         render: (text, row, record) => {
           return (
             <div className="algBut">
               <a href="javascript:;" onClick={() => this.algDetails(text, row, record)} className="details">{intl.get('btn-vie')}</a>
               <a href="javascript:;" className="delete" onClick={() => this.handleDelete(row)}>{intl.get('btn-del')}</a>
               <Modal
                 title={intl.get('tem-list-modal-del-tit')}
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
 
   componentDidMount() {
     this.getDataList()
   }
 
   fmtDate = (timeStamp) => {
    let date = new Date()
    date.setTime(timeStamp * 1000)
    let y = date.getFullYear() 
    let m = date.getMonth() + 1  
    m = m < 10 ? ('0' + m) : m  
    let d = date.getDate()    
    d = d < 10 ? ('0' + d) : d    
    let h = date.getHours()  
    h = h < 10 ? ('0' + h) : h  
    let minute = date.getMinutes()  
    let second = date.getSeconds() 
    minute = minute < 10 ? ('0' + minute) : minute    
    second = second < 10 ? ('0' + second) : second   
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second 
   }
 
   showModal = () => {
     this.setState({
       visible: true,
     });
   }
 
   handleOk = () => {
     // 这里发送删除的异步请求
     // AJAX
     const { dispatch } = this.props;
     // 赋值eleteID
     this.state.paramDelete.id = this.state.deleteID;
     reduxSagaInjector(dispatch, 'ALG_LIST')('templateDelete', this.state.paramDelete, (result) => {
       if(result.data.retCode === 0) {
          // 删除成功,关闭弹窗
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }, 0);
          // 重新请求数据
          this.getDataList();
       } else {
         message.error('删除失败');
       }
     })
     //const dataSource = [...this.state.data]
     //this.setState({ data: dataSource.filter(item => item.algNo !== algNo) })
   }
 
   handleCancel = () => {
     console.log('Clicked cancel button');
     this.setState({
       visible: false,
     });
   }
 
   handleDelete = (row) => {
     this.setState({
       deleteID:row.id
     })
     this.showModal()
   }
 
   algDetails = (text, row, record) => {
     const { dispatch } = this.props
 
     // 存储algNo作为唯一标识-暂时没有用
     // sessionStorage.setItem("algNo", row.algNo)
     // sessionStorage.setItem("algId", row.id)
 
     // 暂时跳转至模板编辑页面
     this.props.history.push(`/TemplateEdit/${row.templateKey}/${row.id}/${row.templateName}`)
     // dispatch(push('/TemplateEdit'))
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
     reduxSagaInjector(dispatch, 'ALG_LIST')('getTemplateList', this.state.param, (result) => {
       // templateType 类型转换
       for (let i = 0; i < result.data.data.data.length; i++) {
        switch (result.data.data.data[i].templateType) {
          case "0":
            result.data.data.data[i].templateType=intl.get('tem-form-add-temp-sys')
            break;
          case "1":
            result.data.data.data[i].templateType=intl.get('tem-form-add-temp-org')
            break;
          case "2":
            result.data.data.data[i].templateType=intl.get('tem-form-add-temp-per')
            break;
          default:
            result.data.data.data[i].templateType=intl.get('tem-form-add-temp-sys')
        }
      }

       let res = result.data.data.data;
       this.setState({
         loading: false,
         data: res,
         pagination: {
           ...this.state.pagination,
           total: result.data.data.pagination.totalRecords
         }
       });
     })
   }
 
   onSearch = (val) => {
     this.setState({
       param: {
         param: {
           ...this.state.param.param,
           templateNameOrTemplateKey: val,
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
 
   handleCancellCreate = () => {
     this.setState({ visibleCreate: false });
   }
   handleCreate = () => {
     const form = this.formRef.props.form;
     form.validateFields((err, values) => {
       if (err) {
         return;
       }
      console.log('Received values of form: ', values)
      form.resetFields();
      
      // 系统默认模板类型
      if (values.templateType===intl.get('tem-form-add-temp-sys')) {
        values.templateType = "0"
      }

      this.state.paramCreate.param.templateName = values.templateName
      this.state.paramCreate.param.templateType = values.templateType
      this.state.paramCreate.param.description = values.description
      this.state.paramCreate.param.uid = sessionStorage.getItem("uid")
 
      console.log(this.state.paramCreate)
      const { dispatch } = this.props
    
       reduxSagaInjector(dispatch, 'ALG_CREATE')('templateAdd', this.state.paramCreate, (result) => {
         console.log(result)
         if (result.data.retCode === 0) {
           message.success(intl.get('tem-form-add-success'))
           // 创建成功，重新请求数据
           this.getDataList()
           // 关闭弹窗
           this.handleCancellCreate()
         } else {
           message.error(result.data.errMsg)
         }
       })
     });
   }
 
   saveFormRef = (formRef) => {
     this.formRef = formRef;
   }
   render() {
     return (
       <LocaleProvider locale={zh_CN}>
         <div>
           <Breadcrumb>
             <Breadcrumb.Item className="crumb"><span className="cur">{intl.get('nav-tem-man')}</span></Breadcrumb.Item>
           </Breadcrumb>
           <div className="main-container">
             <div className="tool_bar clear_fix">
               <div className="creAlg">
                 <Button type="primary" onClick={this.showModalCreate}>{intl.get('tem-list-add-tem')}</Button>
                  <CreateModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visibleCreate}
                    onCancel={this.handleCancellCreate}
                    onCreate={this.handleCreate}
                  />
               </div>
               <Search
                 placeholder={intl.get('list-search')}
                 onSearch={(value) => this.onSearch(value)}
                 enterButton
                 style={{ width: 200, height: 34 }}
                 className="search"
               />
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
 export default TemplateManList
 