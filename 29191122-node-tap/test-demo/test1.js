var a = 0;

module.exports = {
    add: (x, y) => {
        if (typeof x !== 'number' || typeof y !== 'number') throw `cannot add ${x} and ${y}`
        return  x + y
    },
    times: (x, y) => {
        if (typeof x !== 'number' || typeof y !== 'number') throw 'can only times numbers'
        return  x * y
    },
    setA: (x) => {
        a = x;
    },
    getA: () => a,
}