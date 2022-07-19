
import React, { Component } from 'react'
import Header from './header'
import './util'

// import './common/common.css'
// css没发用cssModules
import common from './common/common.css'
console.log('style-common:', common);

// import style from './main.less'
// console.log('style-main:', style);
import './main.less'

export default class App extends Component {
    render() {
        return <div
            // className={style.main}
            className={`${common.common} main test3`}
        >
            <Header></Header>
            Hello world!
        </div>
    }
}