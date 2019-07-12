/*
 * @Description: 登录
  */

export default {
  url: '/alg/auth/change/password',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "修改失败，请重试！",
    	"data": {}
  }
}
