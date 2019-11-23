
const t = require('tap')
const myThing = require('../test-demo/test1.js')

t.pass('hello tap!!!')

// 生命周期
t.beforeEach((done, t) => {
    console.log('@@@@Lifecycle-befterEach');
    done()
})
t.afterEach((done, t) => {
    console.log('@@@@aLifecycle-fterEach');
    done()
})

// 实例
t.test('add() can add two numbers', t => {
    t.equal(myThing.add(1, 2), 3, '1 added to 2 is 3')
    t.equal(myThing.add(2, -1), 1, '2 added to -1 is 1')
    t.throws(() => myThing.add('dog', 'cat'), 'cannot add dogs and cats')
    t.end()
})

t.test('times() can multiply two numbers', async t => {
    t.equal(myThing.times(2, 2), 4, '2 times 2 is 4')
    t.equal(myThing.times(-1, 3), -3, '-1 times 3 is -3')
    t.throws(() => myThing.times('best', 'worst'), 'can only times numbers')
})

// 过滤：可以只运行某一个分支
// npm run test-one
t.test('changeA', async t => {
    // t.setTimeout(100)
    t.todo(myThing.setA(2), { todo: true, skip: false, timeout: 100 })
    t.equal(myThing.getA(2), 2, 'a变量设置为2，取出来也为2')
})

// 过滤：only
// t.only('only run this test', function (t) {
//     // all tests in here will be run
//     t.runOnly = true // 必须加这个
//     t.pass('this is fine')

//     t.test('first child', function (t) {
//         t.pass('got here')
//         t.end()
//     })

//     t.test('second child', function (t) {
//         t.pass('got here, too')
//         t.end()
//     })

//     t.end()
// })

