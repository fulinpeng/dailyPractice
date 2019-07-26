/**
 * @AddAndEditPeople: 编辑和新增人员模块
 * @isEdit: 标识编辑还是新增
 **/
import React, { Component } from "react";
import "./index.scss";
import Input from "_components/input";
import Button from "_components/button";
import Textarea from "_components/textarea";
import TestCommonChunk from "_components/testCommonChunk";
class AddAndEditPeople extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data:{
      head: require("../../images/user-0.png"),
      name: "Name",
      tel: "Phone",
      adress: "Adress",
      country: "Country",
      tags: [],
      desc: "hello！！！"
    }
  }

  // 所有input框change事件公用该方法
  changeInput = (key, e) => {
    let data = this.state.data;
    this.setState({
      data: {
        ...data,
        [key]: e.target.value
      }
    });
  }
  
  // 提交按钮事件
  submitHandle = (data) => {
    if (this.props.isEdit) {
      console.log('请求编辑接口');
      this.props.callBackForOk(data);
    } else {
      console.log('请求新增接口');
      this.props.callBackForOk(data);
    }
  }

  // 从父组件带过来数据，或者重新请求
  fetchData = () => {
    this.setState({
      data: {...this.props.data}
    });
  }

  componentDidMount(){
    if (this.props.isEdit) this.fetchData();
  }

  render() {
    const {
      className,
      callBackForCancel
    } = this.props;
    const {data} =this.state;
    return (
      <section className={`add-and-edit-people ${className || ""}`}>
        <div className="user-pic">
          <img src={data.head || require("../../images/user-0.png")} />
        </div>
        <TestCommonChunk/>
        <div className="edit-user-info">
          <div className="input-box">
            <Input
              defaultValue="Name"
              value={data.name}
              onChange={this.changeInput.bind(this, "name")}
            />
          </div>
          <div className="input-box">
            <Input
              icon="phone"
              value={data.tel}
              defaultValue="Phone"
              onChange={this.changeInput.bind(this, "tel")}
            />
            <Input
              icon="adress"
              value={data.adress}
              defaultValue="Adress"
              className="middle"
              onChange={this.changeInput.bind(this, "adress")}
            />
            <Input
              icon="country"
              value={data.country}
              defaultValue="Country"
              onChange={this.changeInput.bind(this, "country")}
            />
          </div>
          <div className="input-box">
            <Textarea
              value={data.desc}
              onChange={this.changeInput.bind(this, "desc")}
            />
          </div>
          <div className="button-box">
            <Button onClick={this.submitHandle.bind(this, data)} />
            <Button
              className="cancel"
              text="取消"
              onClick={callBackForCancel}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default AddAndEditPeople;
