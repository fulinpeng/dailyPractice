/*
 * @Description: saga主文件
  */
import { all, fork } from 'redux-saga/effects'
//import { fetchUser } from './user/userSaga'
//import { loginFlow } from './login/loginSaga'
//import { fetchPie } from './product/productSaga'

/**
 * @description 整合所有saga
 * @export 生成器函数
 * @example effect说明：
 * import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
 * takeEvery：在每个action到来时派生一个新的任务，允许多个请求同时进行，在某个
 *  特定时刻，可以启动一个新的任务，尽管之前还有一个或多个请求未结束；
 * takeLatest：任何时候只允许一个请求进行，且只能得到最新请求的相应；
 * call：同步调用，创建一条描述结果的信息，就像redux里使用action创建器，创建一个将被store
 *  执行的、描述action的纯文本对象；
 * fork：无阻塞调用；
 * put：用于创建dispatch Effect，发起action到store；
 * take：等待store中指定的action，创建一个命令对象，告诉middleware等待一个特定的action，将会暂停
 *  generator直到一个匹配的action被发起；
 * cancel：取消fork任务；
 * race：在多个effects之间触发一个竞赛，只拿第一个被resolve或reject的任务；
 *
 * take与takeEvery的区别：
 *  1、使用takeEvery，被调用的任务无法控制何时被调用，它们将在每次action被匹配时一
 *  遍又又一遍被调用，并且它们也无法控制何时停止监听；
 *  2、使用take，saga是主动拉取action的，看起来就像saga在执行一个普通的函数调用
 *  action = getAction()，该函数将在action被发起时resolve。
 */
export default function* root() {
  yield all([
    //fork(fetchUser),
    //fork(loginFlow)
    //fork(fetchPie)
  ])
}
