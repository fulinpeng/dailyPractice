/*
 * @Description: 算法版本更新
  */

 export default {
  url: '/task/detail?id={id}',
  config: {
    method: 'get'
  },
  mock: {
    "retCode": 0,
    "errMsg": "",
    "data": {
      "data": {
        "id": 6,
        "platform": "string",
        "userId": 0,
        "createTime": 1546077322,
        "status": "完成",
        "canvasDetails": "{\"nodes\":[{\"type\":\"node\",\"size\":\"220*40\",\"shape\":\"0*2\",\"color\":\"#141420\",\"label\":\"1.4.5\",\"outputParams\":\"[{\\\"origin\\\":\\\"\\\",\\\"name\\\":\\\"name44\\\",\\\"remark\\\":\\\"\\\",\\\"type\\\":\\\"file\\\",\\\"value\\\":\\\"\\\"},{\\\"origin\\\":\\\"\\\",\\\"name\\\":\\\"name74\\\",\\\"remark\\\":\\\"\\\",\\\"type\\\":\\\"file\\\",\\\"value\\\":\\\"\\\"}]\",\"inputParams\":\"[]\",\"realId\":2,\"x\":519,\"y\":197.5,\"id\":\"8e82d9e2\",\"index\":1},{\"type\":\"node\",\"size\":\"220*40\",\"shape\":\"1*1\",\"color\":\"#141420\",\"label\":\"1.1.1\",\"outputParams\":\"[{\\\"origin\\\":\\\"\\\",\\\"name\\\":\\\"name1\\\",\\\"remark\\\":\\\"\\\",\\\"type\\\":\\\"file\\\",\\\"value\\\":\\\"\\\"}]\",\"inputParams\":\"[{\\\"origin\\\":\\\"\\\",\\\"name\\\":\\\"name2\\\",\\\"remark\\\":\\\"\\\",\\\"type\\\":\\\"file\\\",\\\"value\\\":\\\"\\\"}]\",\"realId\":1,\"x\":510,\"y\":384,\"id\":\"8e98383d\",\"index\":2}],\"edges\":[{\"shape\":\"flow-polyline-round\",\"source\":\"8e82d9e2\",\"sourceAnchor\":0,\"target\":\"8e98383d\",\"targetAnchor\":0,\"id\":\"6749fbd9\",\"index\":0}]}",
        "templateVersionId": 7,
        "templateName": "测试-自动分层-脑干分割"
      },
      "errMsg": "string",
      "retCode": 0
    }
  }
}