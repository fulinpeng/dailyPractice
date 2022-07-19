import _ from 'lodash';

import printMe from './print.js';

console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);
printMe();