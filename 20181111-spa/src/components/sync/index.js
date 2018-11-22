
// import {isArray} from 'lodash-es';
import './sync.css';

import help from '../common/help.js';
console.log('async引用：', help.version);

const sync = function () {
    console.log('sync');
    const app = document.getElementById('app');
    fetch('/api/test')
        .then(res => res.json())
        .then(data => {
            console.log('fetch的结果：', data.message)
        })
    console.log('app', app)
    app.innerHTML = `<h1 class="test">Hello world!</h1>`;
}

const isArr = (args) => {
    console.log('is Array!');
    // console.log(isArray(args));
}

export {
    sync,
    isArr,
}