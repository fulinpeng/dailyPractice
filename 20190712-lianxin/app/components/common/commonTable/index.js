import React from 'react';
import { Table } from 'antd';
import './index.scss';

function CommonTable(props) {
    return <Table {...props} className={`common_table ${props.className || ''}`} />;
}

export default CommonTable;