
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Select, Form, Input, Table, Modal, Upload, message } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option
import urlConfig from '@/config/base.config'
import './index.scss'
import intl from 'react-intl-universal';
import reduxSagaInjector from '@/util/reduxSagaInjector'
// import {withRouter} from "react-router-dom";
import Moment from 'moment';


@connect(null)
class DockerDetailOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {},
            params: {
                "caller": "string",
                "param": {
                    "obj": this.props.id,
                    "uid": "string"
                },
                "timestamp": 0,
                "version": "string"
            }
        }
    }

    componentDidMount = () => {
        this.getImageDetail();
    }

    getImageDetail = () => {
        const { dispatch } = this.props;
        reduxSagaInjector(dispatch, 'IMAGE_DETAIL')('imageDetail', this.state.params, (result) => {
            if (result.data.data) {
                this.setState({
                    dataDetail: result.data.data
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataDetail } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 19 },
                sm: { span: 19 },
            },
        };
        return (<div className="docker-detail-one">
            <Form layout="vertical">
                <FormItem label={intl.get('ima-ima')+'：'} {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: ' ' }],
                        initialValue: dataDetail.name
                    })(
                        <div className="value">{dataDetail.name}</div>
                    )}
                </FormItem>
                <FormItem label={intl.get('ima-cre-time')+'：'} {...formItemLayout}>
                    {getFieldDecorator('created', {
                        rules: [{ required: true, message: ' ' }]
                    })(
                        <div className="value">{Moment(dataDetail.created*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                    )}
                </FormItem>
                <FormItem label={intl.get('ima-ser')+'：'} {...formItemLayout}>
                    {getFieldDecorator('host', {
                        rules: [{ required: true, message: '只允许中文/英文，限制长度32', whitespace: true, max: 32, pattern: '^[\u4e00-\u9fa5a-zA-Z]+$' }],
                        initialValue: dataDetail.host
                    })(
                        <div className="value">{dataDetail.host}</div>
                    )}
                </FormItem>
                <FormItem label={intl.get('ima-ver')+'：'} {...formItemLayout}>
                    {getFieldDecorator('version', {
                        rules: [{ required: true, message: '只允许英文/_/()/*限制长度64', whitespace: true, max: 64, pattern: '^[a-zA-Z/_/()/*]+$' }],
                        initialValue: dataDetail.version
                    })(<div>
                        <div className="value">{dataDetail.version}</div>
                    </div>)}
                </FormItem>
                <FormItem label={intl.get('ima-des')+'：'} {...formItemLayout}>
                    {getFieldDecorator('summary', {
                        rules: [{ required: false, message: intl.get('alg-form-max-len-2000'), max: 2000 }],
                        initialValue: dataDetail.summary
                    })(
                        <div className="value">{dataDetail.summary}</div>
                    )}
                </FormItem>
                <FormItem label={intl.get('ima-file')+'：'} {...formItemLayout}>
                    {getFieldDecorator('dockerFileContent', {
                        rules: [{ required: false, message: intl.get('alg-form-max-len-2000'), max: 2000 }],
                        initialValue: dataDetail.dockerFileContent
                    })(
                        <div className="value">{dataDetail.dockerFileContent}</div>
                    )}
                </FormItem>
            </Form>
        </div>
        )
    }
}

export default Form.create()(DockerDetailOne);
