
// reducer 和 action 这块是自己定义，所以想怎么写就怎么写，但是最好有规范
export const changeColor = (color) => {
    return { type: 'CHANGE_COLOR', themeColor: color }
}