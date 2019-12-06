/*
 * @Description: 项目配置文件
  */

let config = {}

export default {
  /**
   *  将源配置覆盖到全局配置
   *  @param    {Object}  srcConfig 源配置，将会覆盖到全局配置
   */
  merge(srcConfig) {
    config = {
      ...baseconfig,
      ...srcConfig
    }
  },
  /**
   *  获取某个配置项的值
   *  @param    {string}  key 配置项的key
   *  @return   {*}  配置项的值
   */
  get(key) {
    return config[key]
  }
}
