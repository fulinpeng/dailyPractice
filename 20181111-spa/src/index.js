import {sync} from './components/sync/index'
console.log('index');
sync();

import(/* webpackChunkName: "async-test" */ './components/async').then(_ => {
    _.default.init();
}); // 异步的包