import React, { Component } from "react";
class Test1 extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    age: 30,
  }
  

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
    // 原来书哟禁止在 shouldComponentUpdate 和 componentWillUpdate 中调用 setState
    // 会造成循环调用，直至耗光浏览器内存后崩溃
    // 测试发现这个问题没有了
    this.setState({
      age: ++this.state.age,
    })
  }

  render() {
    return (
      <div>
        age: {this.state.age}
      </div>
    );
  }
}

export default Test1;
