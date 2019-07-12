import React from 'react';
import { Pagination } from 'antd';
import './index.scss';

function CommonPagination(props) {
    return <div className='ant-pagination-box'>
        <Pagination {...props}/>
    </div>;
}

export default CommonPagination;