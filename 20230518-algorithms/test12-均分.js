// 有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）

function fun(total, n) {
    // 先对整个数组进行排序
    total.sort((a, b) => a - b);

    // 求和
    var sum = 0;
    for (var i = 0; i < total.length; i++) {
        sum += total[i];
    }

    var avg = Math.ceil(sum / n);

    // 结果数组
    var result = [];

    for (var i = 0; i < n; i++) {
        result[i] = [total.pop()];
        result[i].sum = result[i][0];

        // 组成一个分数组
        while (result[i].sum < avg && total.length > 0) {
            for (var j = 0; j < total.length; j++) {
                if (result[i].sum + total[j] >= avg) {
                    result[i].push(total[j]);
                    result[i].sum += total[j];
                    break;
                }
            }

            if (j == total.length) {
                result[i].push(total.pop());
                result[i].sum += result[i][result[i].length - 1];
            } else {
                // 从数组中移除此元素
                total.splice(j, 1);
            }
        }
        // 每分完一组，需要调整 sum
        sum -= result[i].sum;
        avg = Math.ceil(sum / (n - 1 - i));
    }
    return result;
}

var arr = [11, 42, 23, 4, 5, 6, 4, 5, 6, 11, 23, 42, 56, 78, 90];
console.log(fun(arr, 3));
