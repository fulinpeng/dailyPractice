import React, { Component } from 'react';
 
const ImportComponent = (loader) => {
  return class extends Component {
      constructor() {
          super();
          this.state = {
              component: null
          }
      }
      componentDidMount() {
          loader((mod) => {
              this.setState({
                  component: mod.default
              });
          });
      }
      render() {
          const C = this.state.component;
          return C ? <C {...this.props} /> : null; // 这里的props是在组建被使用的地方传进来的，如：<Main color="red"/>
      }
  }
};
 
export default ImportComponent;
