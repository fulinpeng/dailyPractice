import React, { Component } from 'react'
import { Card, Form, Input, Table, LocaleProvider, Button, Modal } from 'antd'
import { withPropsAPI } from 'gg-editor'
const { Item } = Form
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import 'moment/locale/zh-cn'
import './index.scss'
import { withRouter } from 'react-router-dom'
import { Z_BLOCK } from 'zlib';
import intl from 'react-intl-universal';

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 12 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

@connect(null)
class NodeDetail extends Component {
  state = {
    data: [],
    loading: false,
    showLog: false,
    showLogModal: false,
    logText: intl.get('task-runner-no-log'),
    nodeData: this.props.propsAPI.getSelected()[0],
    isGeneral:true
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (err) {
        return;
      }

      const item = getSelected()[0];

      if (!item) {
        return;
      }

      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    });
  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: intl.get('tem-detail-alg-ver-param-name'),
        dataIndex: 'name',
        key: '0',
        width: "22%",
        render: (name) => {
          if (name == "") {
            name = "--"
          }
          return (<span className="col-sql" title={name || ''}>{name}</span>)
        }
      },
      {
        title: intl.get('tem-detail-alg-ver-param-type'),
        dataIndex: 'classType',
        key: '1',
        width: "22%",
        render: (classType) => {
          if (classType == "") {
            classType = "--"
          }
          return (<span className="col-sql" title={classType || ''}>{classType}</span>)
        }
      },
      {
        title: intl.get('tem-detail-alg-ver-param-formate'),
        dataIndex: 'type',
        key: '2',
        width: "22%",
        render: (type) => {
          if (type == "") {
            type = "--"
          }
          return (<span className="col-sql" title={type || ''}>{type}</span>)
        }
      },
      {
        title: intl.get('tem-detail-alg-ver-param-default'),
        dataIndex: 'value',
        key: '3',
        width: "18%",
        render: (value) => {
          if (value == "") {
            value = "--"
          }
          return (<span className="col-sql" title={value || ''}>{value}</span>)
        }
      },
      {
        title: intl.get('tem-detail-alg-ver-param-remark'),
        dataIndex: 'remark',
        key: '4',
        width: "15%",
        render: (remark) => {
          if (remark == "" || !remark) {
            remark = "--"
          }
          return (<span className="col-sql" title={remark || ''}>{remark}</span>)
        }
      }
    ]
  }

  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;
    const item = getSelected()[0]
    if (!item) {
      return null;
    }
    if (item.model.algType!="GENERAL") {
      this.state.isGeneral=false
    }else {
      this.state.isGeneral=true
    }

    const { label } = item.getModel()

    const outputParams = JSON.parse(item.model.outputParams)
    const inputParams = JSON.parse(item.model.inputParams)
    for (let i = 0; i < outputParams.length; i++) {
      outputParams[i].classType = 'output'
    }
    for (let i = 0; i < inputParams.length; i++) {
      inputParams[i].classType = 'input'
    }
    const data = inputParams.concat(outputParams)

    return (
      <LocaleProvider locale={zh_CN}>
        <div className="node-tetail">
          <div className="item-panel-head">
            <span className="item-panel-head-name">{intl.get('tem-detail-alg-ver-param')}</span>
          </div>
          <div className="node-details-title" style={{height:'100%'}}>
            <div style={{display:this.state.isGeneral?"block":"none"}}>{label?label:item.model.algName+"/"+item.model.alias+"/"+item.model.algVer}</div>
            <Form onSubmit={this.handleSubmit} style={{display:this.state.isGeneral?"none":"block"}}>
               <Item
                label={label?(item.model.algType=="INPUT"?"输入参数名称":"输出参数名称"):item.model.algName+"/"+item.model.alias}
                style={{marginBottom:0,marginRight:10}}
              >
                {
                  getFieldDecorator(`${label?"label":"algVer"}`, {
                    initialValue: label?label:item.model.algVer,
                  })(<Input onBlur={this.handleSubmit} style={{fontSize:16,fontFamily:"PingFangSC-Regular"}}/>)
                }
              </Item>
            </Form>
          </div>
          <Table
            columns={this.columns}
            dataSource={data}
            loading={this.state.loading}
            className="node-details-table"
            rowKey={'id'}
            style={{display:this.state.isGeneral?"block":"none"}}
          />
        </div>
      </LocaleProvider>
    )
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
