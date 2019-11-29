
import React, { Component } from "react";
import "./index.scss";

import { Button } from 'antd';
import Test1 from "_root/webApp/components/test1";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: 'flp',
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        name: 'gagaga'
      })
    }, 1000)
  }

  changeAge() {
    console.log('click')
    this.setState({
      age: 22
    })
  }

  render() {
    return (
      <div className="home">
        <h1>hello! {this.state.name}</h1>
        <Button type="primary" onClick={this.changeAge.bind(this)}>Button</Button>
        <Test1 age={this.state.age}/>
      </div>
    );
  }
}

export default Home;
