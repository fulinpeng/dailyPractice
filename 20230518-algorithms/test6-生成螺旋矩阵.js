/**
 * 生成螺旋矩阵
 * [0, 1, 2]
 * [7, 8, 3]
 * [6, 5, 4]
 */
var generateMatrix = function (n) {
    let res = [];
    for (let i = 0; i < n; i++) {
        res.push([]);
    }
    // x:1 步长为1，为方向向右
    // y:1 步长为1，为方向向下
    // x:-1 步长为1，为方向向左
    // y:-1 步长为1，为方向向上
    // x:0, 步长为0，x方向不变，在y上移动
    // y:0, 步长为0，y方向不变，在x上移动
    let y = [1, 0, -1, 0];
    let x = [0, 1, 0, -1];
    let d = 0; // 方便取方向
    let num = 0;
    let posX = 0; // 位置
    let posY = 0; // 位置
    for (let i = 0; i < n * n; i++) {
        // 填充
        res[posX][posY] = num;
        // i和j在下面逻辑上没有任何关系
        // 前面有值，或者保持方向上前进一步超出了，就改变方向，注意 0,0 位置本来就是0会被判空
        if (
            (res[posX + x[d]] && res[posX + x[d]][posY + y[d]]) ||
            (posX + x[d] === 0 && posY + y[d] === 0) ||
            (y[d] === 0 && (posX + x[d] === n || posX + x[d] === -1)) ||
            (x[d] === 0 && (posY + y[d] === n || posY + y[d] === -1))
        ) {
            d = (d + 1) % 4;
        }
        // 位置前进一步
        posX += x[d];
        posY += y[d];
        num++;
    }
    return res;
};
generateMatrix(3);
