
/**
 * 背包问题的解决过程
    在解决问题之前，为描述方便，首先定义一些变量：Vi表示第 i 个物品的价值，Wi表示第 i 个物品的体积，定义V(i,j)：当前背包容量 j，前 i 个物品最佳组合对应的价值，同时背包问题抽象化（X1，X2，…，Xn，其中 Xi 取0或1，表示第 i 个物品选或不选）。

    1、建立模型，即求max(V1X1+V2X2+…+VnXn)；
    2、寻找约束条件，W1X1+W2X2+…+WnXn<capacity；
    3、寻找递推关系式，面对当前商品有两种可能性：

    包的容量比该商品体积小，装不下，此时的价值与前i-1个的价值是一样的，即V(i,j)=V(i-1,j)；
    还有足够的容量可以装该商品，但装了也不一定达到当前最优价值，所以在装与不装之间选择最优的一个，即V(i,j)=max｛V(i-1,j)，V(i-1,j-w(i))+v(i)｝。
    其中V(i-1,j)表示不装，V(i-1,j-w(i))+v(i) 表示装了第i个商品，背包容量减少w(i)，但价值增加了v(i)；

    由此可以得出递推关系式：
    j<w(i)      V(i,j)=V(i-1,j)
    j>=w(i)     V(i,j)=max｛V(i-1,j)，V(i-1,j-w(i))+v(i)｝
 *
 * */
function setTable() {
    let w = [0, 2, 3, 4, 5]; //体积 2、3、4、5
    let v = [0, 3, 4, 5, 6]; //价值 3、4、5、6
    let bagV = 8; //大小
    let dp = [] // talbe
    for (let i = 0; i <= 4; i++) {
        dp.push(new Array(bagV + 1));
        for (let j = 0; j <= bagV; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0
                continue;
            }
            console.log("🚀 ~ file: index.vue:100 ~ setTable ~ dp:", dp);
            if (j < w[i]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
            }
        }
    }
    return dp;
}
