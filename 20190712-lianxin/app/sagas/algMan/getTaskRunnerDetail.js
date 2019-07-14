/*
 * @Description: 算法版本更新
  */

 export default {
  url: '/task/runner/detail?runnerId={runnerId}',
  config: {
    method: 'get'
  },
  mock: {
    "retCode": 0,
    "errMsg": "",
    "data": {
      "data": {
        "creatTime": "2019-01-02T05:55:33.023Z",
        "id": 0,
        "runnerEvents": [
          {
            "errEventDesc": "string",
            "error": "string",
            "event": 0,
            "eventDesc": "string",
            "id": 0,
            "runnerId": 0
          }
        ],
        "runnerParams": [
          {
            "id": 0,
            "paramKey": "string",
            "paramType": "string",
            "paramValue": "string",
            "runnerId": 0
          }
        ],
        "status": "string",
        "taskId": 0
      },
      "errMsg": "string",
      "retCode": 0
    }
  }
}