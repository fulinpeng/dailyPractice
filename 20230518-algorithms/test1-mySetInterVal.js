// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal

function InterVal(fn, a, b) {
    this.a = a;
    this.b = b;
    this.n = 0;
    this.timer = [];
    this.cb = fn;
    this.getTime = function () {
        return this.a + this.n * this.b;
    };
    this.start = function () {
        let self = this;
        let timer = setTimeout(function () {
            self.timer.shift();
            self.cb();
            self.start();
        }, this.getTime());
        this.timer.push(timer);
        self.n += 1;
    };
}
InterVal.prototype.clear = function () {
    console.log("🚀 ~ file: ImportExcel.vue:177 ~ this.timer:", this.timer);
    while (this.timer.length) {
        let timer = this.timer.shift();
        clearTimeout(timer);
    }
    this.n = 0;
    this.cb = null;
};
let startTime = Date.now();
let interval = new InterVal(
    () => {
        let curTime = Date.now();
        console.log("fn time::", curTime - startTime);
        startTime = curTime;
    },
    1000,
    1000,
);
interval.start();
