// import $ from '../node_modules';
let a = '1'
var c = 3;
const d = 1;
console.log(a, c)

d = 3;
console.log(d);

function* b() {

}

console.log(b());

let s = Symbol();
typeof s;

const promise = new Promise(function (resolve, reject) {
    if (window.name) {
        resolve();
    } else {
        reject();
    }
});

promise.then();

console.log(var1);
console.log(var2);

/* eslint-disable */
alert(foo); // Eslint块注释，取消规则，这里将不报错
/* eslint-enable */

alert("foo") /* eslint-disable-line quotes, semi */

$.find();

function fn(a, b) {
    console.log(b);
}


if (fn()) {

}

