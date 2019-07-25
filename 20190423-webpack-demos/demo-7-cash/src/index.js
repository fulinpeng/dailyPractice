
import _ from 'lodash';
import element from './element.js';
import print from './print.js';
import console from './console.js';
console('index.js');
print();

element.innerHTML = _.join(['Hello', 'webpack'], ' ');

document.body.appendChild(element);