
import React, { Component } from "react";
import "./index.scss";

import { Table } from 'antd';

class CommonTable extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    const {dataSource, columns} = this.props.tableData;
    return (
      <div className="table-wrap">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default CommonTable;
