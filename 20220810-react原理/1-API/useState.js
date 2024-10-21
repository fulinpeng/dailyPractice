let hooksArr = [];
let globalIndex = -1;
function useState(initValue) {
    globalIndex++;
    const curIndex = globalIndex;
    let value = initValue;
    function setState(newVal) {
        let subscribs = hooksArr[curIndex];
        if (typeof newVal === "function") {
            value = newVal(value);
        } else {
            value = newVal;
        }
        subscribs.forEach((updateFn) => {
            updateFn(value);
        });
    }
    function subscrib(updateFn) {
        if (hooksArr[curIndex]) {
            hooksArr[curIndex].push(updateFn);
        } else {
            hooksArr.push([updateFn]);
        }
    }
    return [value, setState, subscrib];
}

const [count1, setCount1, subscribCount1] = useState(1);

const [count2, setCount2, subscribCount2] = useState(2);

console.log("count1 初始值：", count1);
console.log("count2 初始值：", count2);

subscribCount1((newVal) => {
    console.log("count1", newVal);
});
setCount1(2);

subscribCount2((newVal) => {
    console.log("count2", newVal);
});
setCount2((value) => value + 2);
setCount2((value) => value + 2);
