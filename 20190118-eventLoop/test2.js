// node的执行当前添加的宏任务一次执行完，再执行当前添加的所有微任务
// 加入microTask是同步执行的，第一个then的微执行完了，第二个then就执行马上又在microTask里添加下一个微任务，直到碰到非微任务时停止

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
  console.log('promise1');
}).then(function () {
  console.log('promise2');
}).then(function () {
  setTimeout(function () {
    console.log('promise3');
  }, 0);
}).then(function () {
  setTimeout(function () {
    console.log('promise4');
  }, 0);
});

console.log('script end');
