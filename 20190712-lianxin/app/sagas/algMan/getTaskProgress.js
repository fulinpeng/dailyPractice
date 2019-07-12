
/*
 * @Description: 任务调度
  */

 export default {
  url: '/task/runner/progress?id={id}',
  config: {
    method: 'get'
  },
  mock: {
    "retCode": 0,
    "errMsg": "",
    "data": [
      {
        "id": 9,
        "taskId": 6,
        "runnerLevel": 1,
        "runnerOrder": 1,
        "status": "完成",
        "error": 0
      },
      {
        "id": 10,
        "taskId": 6,
        "runnerLevel": 2,
        "runnerOrder": 1,
        "status": "完成",
        "error": 0
      }
    ]
  }
}
