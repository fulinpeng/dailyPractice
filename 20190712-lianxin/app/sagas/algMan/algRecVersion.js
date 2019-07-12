/*
 * @Description: 算法推荐版本
  */

export default {
  url: '/alg/recommond/version',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "测试文本",
    	"data": [
          "1.0.0",
          "0.1.0",
          "0.0.1"
        ]
    }
}
