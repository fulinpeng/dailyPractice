import React, { Component } from 'react'
import { Card, Form, Input, Table, LocaleProvider, Button, Modal, message } from 'antd'
import { withPropsAPI } from 'gg-editor'
const { Item } = Form
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const zh_CN = require('antd/lib/locale-provider/zh_CN')
import 'moment/locale/zh-cn'
import './index.scss'
import Moment from 'moment'
import CommonTable from '../../../components/common/commonTable/index'
import intl from 'react-intl-universal';

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};


@connect(null)
class TaskNodeDetail extends Component {
  state = {
    data: [],
    loading: false,
    showLog: false,
    showLogModal: false,
    logText: intl.get('task-runner-no-log'),
    nodeData: this.props.propsAPI.getSelected()[0],
    runnerDetail: {},
    visibleDownloadModal: false,
    paramValueSllidDown: true,
    downloadModalConfirmLoading: false,
    selectedPramRows: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
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
        title: 'id',
        dataIndex: 'id',
        key: '0',
        width: "22%",
        render: (text) => {
          return (<span className="col-sql">{text || ''}</span>)
        }
      },
      {
        title: '参数类型',
        dataIndex: 'paramKey',
        key: '1',
        width: "22%",
        render: (text) => {
          return (<span className="col-sql">{text || ''}</span>)
        }
      },
      {
        title: '参数格式',
        dataIndex: 'paramType',
        key: '2',
        width: "22%",
        render: (text) => {
          return (<span className="col-sql">{text || ''}</span>)
        }
      },
      {
        title: '参数值',
        dataIndex: 'paramValue',
        key: '3',
        width: "18%",
        render: (text) => {
          return (<span className="col-sql">{text || ''}</span>)
        }
      },
      {
        title: 'runnerId',
        dataIndex: 'runnerId',
        key: '4',
        width: "15%",
        render: (text) => {
          return (<span className="col-sql">{text || ''}</span>)
        }
      }
    ]
    this.paramsColumns = [
      {
        title: 'paramKey',
        dataIndex: 'paramKey',
        key: '0',
        render: (text) => {
          return (<span className="col-sql">{text || '--'}</span>)
        }
      },
      {
        title: 'paramValue',
        dataIndex: 'paramValue',
        key: '1',
        render: (text) => {
          return (<span className="col-sql">{text || '--'}</span>)
        }
      },
      {
        title: '',
        dataIndex: 'space',
        key: '2',
        render: () => ''
      },
    ]
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedPramRows: selectedRows
        });
      }
    };
  }

  fetchTaskRunLog = (params = {}) => {
    const { dispatch } = this.props;
    reduxSagaInjector(dispatch, '')('getTaskRunLog', params, (resultData) => {
      let logContent = resultData.data.data.logContent;
      let textarea = document.createElement('textarea');
      this.setState({
        logText: logContent
      });
    })
  }

  showLog = () => {
    this.setState({
      showLogModal: true
    });
    this.fetchTaskRunLog({ runnerId: this.state.nodeData.model.runnerId });
  }

  logModalHandleOk = () => {
    this.download(`log.txt`, this.state.logText || intl.get('task-runner-no-log-or-empty'));
  }

  logModalHandleCancel = () => {
    this.setState({
      showLogModal: false,
    });
  }
  
  downloadModalHandleOk = () => {
    this.setState({
      downloadModalConfirmLoading: true,
      selectedPramRows: [],
    });
    const { dispatch } = this.props;
    let idStr = [];
    if (this.state.selectedPramRows.length) {
      idStr = this.state.selectedPramRows.map(v => v.id);
    } else {
      message.error(intl.get('task-runner-select-param'));
    }
    let param = {
      paramId: idStr.join(',')
    }
    reduxSagaInjector(dispatch, '')('getTaskParamDownload', param, (res) => {
      let url = res.data.data;
      if (url) {
        window.open(url);
        this.setState({
          downloadModalConfirmLoading: false,
          visibleDownloadModal: false,
        });
      } else {
        this.setState({
          downloadModalConfirmLoading: false,
        });
      }
    })
  }

  downloadModalHandleCancel = () => {
    this.setState({
      visibleDownloadModal: false,
      downloadModalConfirmLoading: false,
    });
  }

  showDownloadModal = () => {
    this.setState({
      visibleDownloadModal: true
    });
  }

  download = (filename, text) => {
    text = text.replace(/\n/g, '\r\n');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  initTableData = () => {
    const { propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    const { dispatch } = this.props;
    reduxSagaInjector(dispatch, '')('getTaskRunnerDetail', {
      runnerId: this.state.nodeData.model.runnerId
    }, (resultData) => {
      let runnerDetail = resultData.data.data || {};
      this.setState({
        runnerDetail
      });
    })
  }

  componentDidMount() {
    this.initTableData();
  }

  render() {
    const { propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    if (!item) return null;
    const { label } = item.getModel();
    const { runnerDetail } = this.state;
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="node-tetail">
          {/* <div className="item-panel-head">
            <span className="item-panel-head-name">RUNNER详情</span>
          </div> */}
          {/* <div className="node-details-title">
            {label}
          </div>
          <Table
            columns={this.columns}
            dataSource={runnerDetail.runnerParams || []}
            loading={this.state.loading}
            className="node-details-table"
            rowKey={'id'}
          />
          <div className="btn_part">
            <Button type="primary" onClick={this.showLog}>查看日志</Button>
          </div> */}
          <div className="item-panel-part runner_detail">
            <div className="part-tit">{intl.get('task-runner-detail')}</div>
            <div className="part-des">
              <div className="param"><span>{intl.get('task-runner-id')}:</span><span>{runnerDetail.id}</span></div>
              <div className="param"><span>{intl.get('task-runner-detail-name')}:</span><span>{`${item.model.algName}/${item.model.alias}/${item.model.algVer}`}</span></div>
              <div className="param"><span>{intl.get('task-runner-status')}:</span><span>{runnerDetail.status}</span></div>
              <div className="param"><span>{intl.get('task-runner-is-normal')}:</span><span  className={runnerDetail.error == 1 ? 'error' : ''}>{runnerDetail.error == 1 ? '异常' : '正常'}</span></div>
            </div>
          </div>
          <div className="item-panel-part detail">
            <div className="part-tit">{intl.get('task-runner-detail-tit')}</div>
            <div className="part-des">
              <ul style={{fontWeight:'bold'}}>
                <li>
                  <div className="item" style={{width:'12%'}}>{intl.get('task-runner-detail-num')}</div>
                  <div className="item" style={{width:'50%'}}>{intl.get('task-runner-detail-name')}</div>
                  {/* <div className="item" style={{width:'15%'}}>{intl.get('task-runner-detail-status')}</div> */}
                  <div className="item" style={{width:'38%'}}>{intl.get('task-runner-detail-time')}</div>
                </li>
              </ul>
              <ul>
                {runnerDetail.runnerEvents &&
                  runnerDetail.runnerEvents.length ?
                  runnerDetail.runnerEvents.map((v, i) => {
                    // if (this.state.runnerEventsSllidDown && i > 2) return null;
                    return (<li key={i}>
                      <div className="item" style={{width:'12%'}}>{i + 1}</div>
                      <div className="item" style={{width:'50%'}} title={v.eventDesc}>{v.eventDesc}</div>
                      {/* <div className="item" style={{width:'15%'}}>完成</div> */}
                      <div className="item" style={{width:'38%'}} title={!v.createTime && v.createTime != '0' ? '--' : `${Moment(v.createTime*1000).format('YYYY-MM-DD HH:mm:ss')}`}>{!v.createTime && v.createTime != '0' ? '--' : `${Moment(v.createTime*1000).format('MM-DD HH:mm:ss')}`}</div>
                    </li>);
                  }) :
                    <li>{intl.get('task-runner-no-detail')}</li>
                  }
              </ul>
              {/* <div className="sllidDown">
                <span>{this.state.runnerEventsSllidDown && '...'}</span>
                <span onClick={() => this.setState({ runnerEventsSllidDown: !this.state.runnerEventsSllidDown })}>
                  {this.state.runnerEventsSllidDown ? '展开' : '收起'}
                </span>
              </div> */}
            </div>
          </div>
          <div className="item-panel-part params_detail">
            <div className="part-tit">{intl.get('task-runner-params')}</div>
            <div className="part-des">
              <ul>
                {runnerDetail.runnerParams &&
                  runnerDetail.runnerParams.length &&
                  runnerDetail.runnerParams.map((v, i) => {
                    // if (this.state.paramValueSllidDown && i > 2) return null;
                    return <li key={i} title={v.paramKey + ':' + (v.paramValue || '--')}>{v.paramKey}:{v.paramValue || '--'}</li>
                  })}
              </ul>
              {/* <div className="sllidDown">
                <span>{this.state.paramValueSllidDown && '...'}</span>
                <span onClick={() => this.setState({ paramValueSllidDown: !this.state.paramValueSllidDown })}>
                  {this.state.paramValueSllidDown ? '展开' : '收起'}
                </span>
              </div> */}
            </div>
          </div>
          <div className="item-panel-part log_btns">
            <Button type="primary" onClick={this.showLog}>{intl.get('btn-view-log')}</Button>
            <Button type="primary" onClick={this.logModalHandleOk}>{intl.get('btn-download-log')}</Button>
            <Button type="primary" onClick={this.showDownloadModal}>{intl.get('btn-download-params')}</Button>
          </div>
          {this.state.showLogModal && <Modal
            className="node-detail-modal"
            title={intl.get('btn-view-log')}
            visible={this.state.showLogModal}
            onOk={this.logModalHandleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.logModalHandleCancel}
            okText={intl.get('btn-download')}
            cancelText={intl.get('btn-back')}
            width={1200}
          >
            <pre className="log_text">
              {this.state.logText || intl.get('task-runner-no-log-or-empty')}
            </pre>
          </Modal>}
          {this.state.visibleDownloadModal && <Modal
            className="node-detail-modal"
            title={intl.get('btn-download-params')}
            visible={this.state.visibleDownloadModal}
            onOk={this.downloadModalHandleOk}
            onCancel={this.downloadModalHandleCancel}
            okText={intl.get('btn-download')}
            cancelText={intl.get('btn-back')}
            confirmLoading={this.state.downloadModalConfirmLoading}
            width={800}
          >
          <div>
            <CommonTable
              rowSelection={this.rowSelection}
              columns={this.paramsColumns}
              dataSource={runnerDetail.runnerParams}
            />
            {/* <ul>
              {runnerDetail.runnerParams &&
                runnerDetail.runnerParams.length &&
                runnerDetail.runnerParams.map((v, i) => {
                  return <li key={i} title={v.paramKey + ':' + v.paramValue}>{v.paramKey}:{v.paramValue}</li>
                })}
            </ul> */}
          </div>
          </Modal>}
        </div>
      </LocaleProvider>
    )
  }
}

export default withPropsAPI(TaskNodeDetail);
