
import React, { Component } from "react";
import "./index.scss";

import { Form, Checkbox, Input, Row, Col, Button } from 'antd';

class AntForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const test = {
      'required': (args) => {
        let {label, valueType, value} = args;
        if (!valueType || !value) {
          return `${label}不能为空！`;
        }
      },
      'max': (args) => {
        let {label, valueType, value, limit} = args;
        if (valueType && value - limit > 0) {
          return `${label}不能超过${limit}！`;
        }
      },
      'min': (args) => {
        let {label, valueType, value, limit} = args;
        if (valueType && value - limit < 0) {
          return `${label}不能小于${limit}！`;
        }
      },
      'zimu': (args) => {
        let {label, valueType, value} = args;
        if (valueType && !/^[a-zA-Z]+$/.test(value)) {
          return `${label}只能为字母！`;
        }
      },
      'number': (args) => {
        let {label, valueType, value} = args;
        if (valueType && !/[+-]?((\d+\.)?\d+)/.test(value)) {
          return `${label}只能为数字！`
        }
      },
      'maxLen': (args) => {
        let {label, valueType, value, limit} = args;
        if (valueType && value.length - limit > 0) {
          return `${label}不能超过${limit}个字符！`
        }
      },
    };
    const validatorCreactor = (label, validates) => (rule, value, callback) => {
      for (let validate of validates) {
        let {type, limit} = validate;
        let valueType = value == '' ? false : true;

        let res = test[type]({label, valueType, value, limit});
        if (res) {
          return callback(res);
        }
      }
      callback();
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="antForm">
        <h1>AntForm!</h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      validator: validatorCreactor('Captcha', [
                        // {type: 'required'},
                        // {type: 'number'},
                        // {type: 'max', limit: 99},
                        // {type: 'min', limit: 0},
                        {type: 'zimu'},
                        {type: 'maxLen', limit: 9},
                      ]),
                    }
                  ],
                })(<Input autoComplete="off"/>)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

const WrappedAntFormForm = Form.create()(AntForm);

export default WrappedAntFormForm;
