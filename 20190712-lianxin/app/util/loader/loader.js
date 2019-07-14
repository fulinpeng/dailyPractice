import { adaptZoom, default as zoom } from '@/util/zoom/zoom'

import config from '@/config'
import apis from './apiloader'

export default {
  /**
   * 执行初始化操作，然后执行app的初始化逻辑
   * @param    {Object}  app 页面实例配置
   * @example 参数示例
   * {
   *  config: {},
   *  apis: {}
   * }
   */
  load(app) {
    const self = this

    // 将应用配置合并到全局api
    // 针对一个项目中有多个应用的时候，每个应用有单独的配置，我觉得有必要这样做
    // 目前感觉没必要有多个配置文件，多处维护，还不如直接写在一起，等项目需要多个小应用的时候再改
    config.merge(app.config)

    // 将应用的接口配置合并到全局api
    apis.merge(app.apis)

    self.initZoom()
  },
  /**
   *  根据config，判断是否需要执行zoom逻辑
   */
  initZoom() {
    if(config.get('zoom')) {
      // 为true，启用自动缩放
      adaptZoom()
      window.addEventListener('resize', zoom)
      zoom()
    }
  }
}
