/*
 * @Description: 查询算法列表及明细
  */

export default {
  url: '/alg/label/select/pagination',
  config:{
    method:'post'
  },
  mock: {
    	"retCode": 0,
    	"errMsg": "",
    	"data": {
        "data": [
            {
              "id": 21,
              "labelName": "asdad",
              "labelPinYin": "asdads",
              "status": 0,
              "createTime": 1541560109000
            }
        ]
    	}
  }
}
