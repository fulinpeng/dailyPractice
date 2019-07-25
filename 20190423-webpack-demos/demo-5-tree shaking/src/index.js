
import { cube } from './math.js';
import style from './styles.css';

console.log('style', style);

function component() {
    var element = document.createElement('pre');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');
    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./math.js', function () {
        console.log('\n @@@@@@@@@@@@@@@@@@@@@@@@@ Accepting the updated printMe module!');

        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}