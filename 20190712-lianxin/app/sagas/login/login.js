/*
 * @Description: 登录
  */

export default {
  url: '/alg/auth/login',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "创建失败",
    	"data": {}
  }
}
