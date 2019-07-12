/*
 * @Description: 算法版本更新
  */

export default {
  url: '/task/list?pageNo={pageNo}&pageRange={pageRange}&status={status}',
  config: {
    method: 'get'
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
