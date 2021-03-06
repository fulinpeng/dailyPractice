
let Conf = window.link_one_config || {};
export default {
  // 是否使用mock模式，在mock模式下向服务器的请求被mockjs拦截
  mock: Conf.mock || false, // search.indexOf('mock') !== -1,
  // 是否使用proxy模式，在proxy模式下会使用proxy的url来替换原来的url
  proxy: Conf.proxy || false, // search.indexOf('proxy') !== -1,
  // 模拟websocket时，消息的推送间隔(毫秒)
  mockInterval: Conf.mockInterval || 3500,
  // 轮询请求时的时间间隔(毫秒)
  fetchInterval: Conf.fetchInterval || 3000,
  defaultLangType: Conf.defaultLangType || 'en_US', // 默认语言： zh_CN 、 en_US
  // 主要用于前后台联调，代理服务器域名，当proxy为true时，所有ajax请求都会发送到这个域名

  proxyHost: Conf.proxyHost || 'http://192.168.3.63:8888',
  // 主要用于前后台联调，websocket代理服务器域名，当proxy为true时，所有websocket都会连接到这个域名
  websocketProxyHost: Conf.websocketProxyHost || 'ws://offline.com',
  // 线上服务器域名，当访问URL时不加mock或proxy时，所有ajax请求都会发送到这个域名
  host: Conf.host || 'http://192.168.3.63:8888',
  // websocket线上服务器域名，当访问URL时不加mock或proxy时，所有websocket都会连接到这个域名
  websocketHost: Conf.websocketHost || 'ws://online.com',
  // 地图路径
  mapHost: Conf.mapHost || 'http://192.168.1.16:10088/mapdata/cq',
  // 是否使用zoom模式，在zoom模式下页面会根据窗口的宽高使用transform调整
  zoom: Conf.zoom || false,
  // 固定的页面宽
  pageWidth: Conf.pageWidth || 1920,
  // 固定的页面高
  pageHeight: Conf.pageHeight || 1080
}
