/*
 * @Description: 修改密码
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;
import { push } from 'react-router-redux'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const param =
{
  "caller": "browser",
  "intfName": "",
  "param": {
    "code": "",
    "email": "",
    "newPassword": "",
    "password": ""
  },
  "sign": "string",
  "sign": "",
  "timestamp": Date.parse(new Date()),
  "version": "2.5.1"
}
const mapStateToProps = ({ product }) => {
 // 这个操作不能少，不然会报错。
  if(!product) return {}
}

@connect(null)

class Login extends React.Component {

  return = () => {
    const {dispatch} = this.props
    dispatch(push('/auth/login'))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        param.param.email = values.email
        param.param.password = values.password
        param.param.newPassword = values.newPassword
        // dispatch(push('/app'))
        const {dispatch} = this.props
        reduxSagaInjector(dispatch, 'CHANGE_PASS')('changePass', param, (result) => {
            if (result.data.retCode === 0) {
              message.success("密码修改成功，请重新登录！")
              setTimeout(()=>{dispatch(push('/auth/login'))},1000);
            } else {
              message.error(result.data.errMsg)
            }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div  className="login-body">
        <div className="login-region">
          <Form onSubmit={this.handleSubmit} className="login-form">
             <div className="region-title">
               <span className="title-CN">连心医疗</span>
               <span className="title-EN">Linkingmed</span>
             </div>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入原密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="原密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入新密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
              )}
            </FormItem>
            {/*<FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码？</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a href="">还没有账号？立即注册!</a>
            </FormItem>*/}
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  修改
              </Button>
              <Button type="primary" className="login-form-button"  onClick={this.return}>
                  返回
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginContainer = Form.create()(Login);
export default LoginContainer
