
import createStore from './createStore';
import connect from './connect';
import Provider from './provider';

export {
    connect,
    createStore,
    Provider
}

// export 必须输出一个对象，输出一个变量为简单值类型会报错的
// 最多只能有一个 export default
// 由于import是静态执行，所以不能使用表达式和变量
// 因为export default命令其实只是输出一个叫做default的变量，它后面不能跟变量声明语句
