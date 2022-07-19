
module.exports = {
    todo1: (t) => {
        return new Promise(function (resolve, rejected) {
            setTimeout(() => {
                resolve({foo: 'bar'})
            }, t);
        })
    },
    todo2: (t) => {
        return new Promise(function (resolve, rejected) {
            setTimeout(() => {
                resolve([1, 2])
            }, t);
        })
    },
    todo3: (t) => {
        return new Promise(function (resolve, rejected) {
            setTimeout(() => {
                resolve(7)
            }, t);
        })
    },
}