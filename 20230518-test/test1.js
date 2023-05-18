// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal 


class MySetInter {
    n: number;
    timer: any;
    excute: boolean;
    constructor() {
        this.n = 0;
        this.timer = null;
        this.excute = true;
    }
    mySetInterVal(fn, a, b) {
        if (this.excute) {
            const create = (n) => a + n * b;
            const time = create(this.n);
            const _this = this;
            this.timer = setTimeout(() => {
                fn(time);
                ++_this.n;
                _this.timer = _this.mySetInterVal(fn, a, b);
            }, time);
        }
    }

    myClear() {
        this.excute = false;
        clearTimeout(this.timer);
        this.timer = null;
    }
}
let mySetInter = new MySetInter();
mySetInter.mySetInterVal((time) => console.log(' excute：', time), 500, 10);


function mySetInterVal(fn, a, b) {
  let timeCount = 0;
  let timer
  const loop = () => {
    timer = setTimeout(() => {
      fn()
      timeCount++
      loop()
    }, a + timeCount * b)
  }
  loop()
  return () => {
    clearTimeout(timer)
  }
}
//测试
const myClear =mySetInterVal(()=>{console.log('test')},1000,500);
// 清除定时器
myClear()
