
import {isArray} from 'lodash-es';
import './sync.css';
const sync = function () {
    console.log('sync');
    const app = document.getElementById('app');
    
    console.log('app', app)
    app.innerHTML = `<h1 class="test">Hello world!</h1>`;
}

const isArr = (args) => {
    console.log('is Array!');
    console.log(isArray(args));
}

export {
    sync,
    isArr,
}