
import React, { Component } from 'react'
import './util'
import style from './header.less'
console.log('style-header:', style);

export default class Header extends Component {
    render() {
        return <div data-test="red" className={`${style.header} ${style.disabled} border bold`}>
            Header
            <div className="tip">
                tip
                <div className="tip_content">tip_content</div>
            </div>
        </div>
    }
}