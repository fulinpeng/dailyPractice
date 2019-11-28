
const t = require('tap')
const myThing = require('../test-demo/test2.js')

t.pass('promise!!!')

// The t.test(), t.spawn() and t.stdin() methods all return a Promise
// promise
t.test('promise', async t => {
    
    let getSomeThing = myThing.todo1(1000)
    let getTwoThings = myThing.todo2(1000)
    let makeSomeOtherPromise = myThing.todo3

    return t.test('get thing', t => {
        return getSomeThing.then(result =>
            t.test('check result', t => {
                t.equal(result.foo, 'bar', 'getSomeThing √√√√√√√√√√√√√√√√')
                t.end()
            }))
    })
    // 这是 t.test 返回的promise，不是 getSomeThing 返回的哈
    .then(t =>
        getTwoThings.then(things => t.equal(things.length, 2, 'getTwoThings √√√√√√√√√√√√√√√√'))
            .then(() => makeSomeOtherPromise(1000))
            .then(otherPromiseResult =>
                t.equal(otherPromiseResult, 7, 'it should be seven √√√√√√√√√√√√√√√√')))
})