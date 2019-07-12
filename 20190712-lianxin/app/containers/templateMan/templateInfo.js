/*
* @Description:模版信息
*/
import React, { Component } from 'react'
import GGEditor, { Flow, RegisterNode } from 'gg-editor'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { Button, Carousel, Switch ,LocaleProvider,Breadcrumb, Menu,Input,message,Collapse,Form} from 'antd'
import './index.scss'
const Panel = Collapse.Panel
const FormItem = Form.Item
import { withRouter } from 'react-router-dom'
// import { compose } from 'C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/3.2/node_modules/@types/redux-logger/node_modules/redux';
import { relative } from 'path';
import intl from 'react-intl-universal';

const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "pageNo": 1,
    "pageRange": 10,
    "templateNameOrTemplateKey": ""
  },
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const mapStateToProps = (resultData) => {
  console.log(resultData)
  if(!resultData) return {}
  if (resultData.resultData) {
    return {
      resultData: resultData.resultData.data.data[0]
    }
  }
}

@connect(mapStateToProps)
class FlowPage extends Component {

  state = {
    collapsed: true,
    templateName:this.props.match.params.templateName
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

  fetch = (params = {}) => {
    param.param.templateNameOrTemplateKey = this.props.match.params.templateKey
    const {dispatch} = this.props
    reduxSagaInjector(dispatch, 'ALG_LIST')('getTemplateList', param, 'resultData')
  }

  componentDidMount() {
    this.fetch()

    setTimeout(() => {
      this.input.focus();
    })
  }

  clickEdit = () => {

    // 自动获取文本框焦点
    setTimeout(() => {
      this.input.focus();
    })

    this.setState({
      collapsed: !this.state.collapsed,
    })

    const { form } = this.props;
    var _this = this
    form.validateFieldsAndScroll((err, values) => {
      console.log(values.templateName)
      _this.setState({
        templateName: values.templateName,
      })
      sessionStorage.setItem("templateName",values.templateName)
    });

  }
  render() {
    const { visible, onCancel, onCreate, form } = this.props
    const { getFieldDecorator } = form
    let {resultData} = this.props
    if(_.isEmpty(resultData)) return null
    // console.log(resultData.templateType)
    // templateType 类型转换
    switch (resultData.templateType) {
      case "0":
        resultData.templateType=intl.get('tem-form-add-temp-sys')
        break;
      case "1":
        resultData.templateType=intl.get('tem-form-add-temp-org')
        break;
      case "2":
        resultData.templateType=intl.get('tem-form-add-temp-per')
        break;
      default:
        resultData.templateType=intl.get('tem-form-add-temp-sys')
    }
    return (
    <Collapse defaultActiveKey={['1']} className="template-info">
        <Panel header={intl.get('tem-detail-template-info')} key="1">
        <Form layout="inline" >
          <FormItem label={intl.get('tem-tem')}
            style={{display:this.state.collapsed?'block':'none'}}>
            {getFieldDecorator('algName', {
              rules: [{ required: false, message: ''}],
              initialValue: this.state.templateName
            },
          )(
              <div className="value"  onClick={() => this.clickEdit()}>{this.state.templateName}</div>
            )}
          </FormItem>
          <FormItem label={intl.get('tem-tem')} style={{marginTop:10,marginRight:0,marginBottom:-15,display:this.state.collapsed?'none':'block'}}>
            {getFieldDecorator('templateName', {
              rules: [{ required: true, message: intl.get('tem-form-fill-tem-name')}],
              initialValue: this.state.templateName
            })(
              <Input 
                style={{width:210,position:relative,top:-10}} 
                onBlur={() => this.clickEdit()} 
                ref={node => this.input = node}
              />
            )}
          </FormItem>
          <FormItem label={intl.get('tem-num')}>
            {getFieldDecorator('algName', {
              rules: [{ required: false, message: ''}],
              initialValue: resultData.templateKey
            },
          )(
              <div className="value">{resultData.templateKey}</div>
            )}
          </FormItem>
          <FormItem label={intl.get('tem-type')}>
            {getFieldDecorator('algName', {
              rules: [{ required: false, message: ''}],
              initialValue: resultData.templateType
            },
          )(
              <div className="value">{resultData.templateType}</div>
            )}
          </FormItem>
          <FormItem label={intl.get('tem-cre-user')}>
            {getFieldDecorator('algName', {
              rules: [{ required: false, message: ''}],
              initialValue: resultData.userName
            },
          )(
              <div className="value">{resultData.userName}</div>
            )}
          </FormItem>
          <FormItem label={intl.get('tem-cre-date')}>
            {getFieldDecorator('algName', {
              rules: [{ required: false, message: ''}],
              initialValue: resultData.created
            },
          )(
              <div className="value">{this.fmtDate(resultData.created)}</div>
            )}
          </FormItem>
          </Form>
        </Panel>
    </Collapse>
    )
  }
}

const FlowPageWapper = Form.create()(FlowPage)
export default  withRouter(FlowPageWapper)
