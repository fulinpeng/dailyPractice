/*
 * @Description: 模板删除接口
  */

 export default {
  url: '/alg/template/delete',
  config:{
    method:'DELETE'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "列表获取失败",
    	"data": ""
  }
}