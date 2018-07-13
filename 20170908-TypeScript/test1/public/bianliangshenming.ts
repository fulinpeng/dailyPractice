// let
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    // console.log(i);
  }, 100 * i);
}

// 数组解构
let input = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2

// 对象解构
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;
// 需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块
({ a, b } = { a: "baz", b: 101 });

// 数组 展开
let first1 = [1, 2];
let second1 = [3, 4];
let bothPlus = [0, ...first1, ...second1, 5];

// 对象 展开
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

// 仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
class C {
  p = 12;
  m() {}
}
let cc = new C();
let clone = { ...cc };
clone.p; // ok
//   clone.m(); // error!
