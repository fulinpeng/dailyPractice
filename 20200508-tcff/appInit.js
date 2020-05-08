// 所有 SPA 的入口启动
import { getApp } from '@tencent/tcff-core'
import moment from 'moment'
import { useCloudPcPreset } from '@tencent/tcff-preset-cloud-pc'
import { RESOURCE_RECYCLE_STRATEGY } from '@tencent/tcff-plugin-router'
import LoadableLoading from '@common/ui/LoadableLoading'
// import createBrowserHistory from 'history/createBrowserHistory'
import {emrPlugin} from '@plugin/emrPlugin'
import {history} from './history'
//const createBrowserHistory = require("history").createBrowserHistory

// 初始化moment
moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'
moment.locale('zh-cn')

// 初始化app
export default function init() {
  const app = getApp()
    // 不要重复初始化和启动
    if(app.started){
        return app
    }

  // 引入预设插件，并进行配置
  useCloudPcPreset({
      router: {
          history: history,
          loading: LoadableLoading,
          moduleStrategy: RESOURCE_RECYCLE_STRATEGY.RESET
      },
      errorMsgFormat: (resp) => {
        return resp.msg;
      } 
  });

  // 使用该项目自己定义的全局插件
  app.use(emrPlugin);

  app.start();
  //禁用notification插件 无法满足国际化
  app.disable("notification");
  return app
}
