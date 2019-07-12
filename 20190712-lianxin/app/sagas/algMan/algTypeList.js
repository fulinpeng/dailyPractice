/*
 * @Description: 算法类型类别
  */

export default {
  url: '/alg/product/alg/type/list',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "创建失败",
    	"data": [
      {
       "id":0,
       "nameEn": "bodyclassify",
       "nameCn": "全身分层"
      }
    ]
  }
}
