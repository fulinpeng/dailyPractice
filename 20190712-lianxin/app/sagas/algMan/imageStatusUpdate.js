/*
 * @Description: 查询算法列表及明细
  */

export default {
  url: '/alg/image/status/update',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "添加算法失败",
    	"data": {}
  }
}
