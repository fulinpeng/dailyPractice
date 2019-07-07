// 模块在其自身的作用域里执行，而不是在全局作用域里
// 这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的
// TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块
// 类和函数声明可以直接被标记为默认导出。 标记为默认导出的类和函数的名字是可以省略的。

// 导出
// export 后面必须是申明或语句；export StringValidator; 这种写法是错误的
// export default 一个模块只能有一个
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
export const numberRegexp = /^[0-9]+$/;
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator }; // 重命名导出
export { IsAcceptable } from "./module2"; // 重新导出
