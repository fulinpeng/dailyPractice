
import React, { Component } from "react";
import "./index.scss";

import CommonTable from "_root/webApp/components/commonTable";
import setting from "./setting";

import reduxSagaInjector from '_root/util/reduxSagaInjector'

class AntTable extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    settingConf: {
      ...setting,
      dataSource: [],
    }
  }

  componentDidMount () {
    reduxSagaInjector('testApisTest1')('testApisTest1', null, (res) => {
      console.log(res.data.data)
      this.setState({
        settingConf: {
          ...this.state.settingConf,
          dataSource: res.data.data,
        }
      });
    })
  }

  render() {
    const { settingConf } = this.state;
    return (
      <div className="home">
        <h1>AntTable!</h1>
        <CommonTable tableData={settingConf} />
      </div>
    );
  }
}

export default AntTable;
