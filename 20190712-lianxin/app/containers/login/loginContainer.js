/*
 * @Description: 登录页面
  */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;
import { push } from 'react-router-redux'
import './index.scss'
import reduxSagaInjector from '@/util/reduxSagaInjector'
const param = {
  "caller": "browser",
  "intfName": "",
  "param": {
    "email": "",
    "password": ""
  },
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        param.param.email = values.email
        param.param.password = values.password
        // dispatch(push('/app'))
        const {dispatch} = this.props
        reduxSagaInjector(dispatch, 'LOGIN')('login', param, (result) => {
            if (result.data.retCode === 0) {
              // 存uid
              sessionStorage.setItem("uid", values.email)
              dispatch(push('/app'))
            } else {
              message.success(result.data.errMsg);
            }
        })
      }
    });
  }
  Jump = () => {
      const {dispatch} = this.props
      dispatch(push('/auth/changePass'))
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
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
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
              <p className="login-form-forgot"  onClick={this.Jump}>修改密码</p>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
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
