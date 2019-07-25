import _ from 'lodash';
export default function printMe() {
    let str = _.join(['Updating ', 'print.js'], '...');
    console.log(str)
}
