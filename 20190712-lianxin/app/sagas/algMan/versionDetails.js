/*
 * @Description: 算法版本更新
  */

export default {
  url: '/alg/version/details',
  config: {
    method: 'post'
  },
  mock: {
    "retCode|0-1": 0,
    "errMsg": "",
    "data": {
      "id": 4,
      "uid": "unkown",
      "algNo": "LMKCPGEB",
      "algVer": "1.0.1",
      "algName": "算法test",
      "alias": "ALG_NAME",
      "sourcePath": "F:\\linkone-group-alg\\ALG_NAME\\source_ALG_NAME_20181206025832_linkone-2.0.5.3.zip",
      "acwId": 1,
      "acwName": "AAA",
      "execType": "python",
      "execFile": "aa.py",
      "shellPath": "",
      "modelPath": "",
      "confPath": "F:\\linkone-group-alg\\ALG_NAME\\conf_ALG_NAME_1.0.1.yaml",
      "inputParams": "[{\"origin\":\"\",\"name\":\"\",\"type\":\"\",\"value\":\"\"}]",
      "outputParams": "[{\"origin\":\"\",\"name\":\"\",\"type\":\"\",\"value\":\"\"}]",
      "cpuLimit": 1024,
      "gpuLimit": 1024,
      "memoryLimit": 1024,
      "verStatus": 0,
      "createTime": 1544079993000
    }
  }
}
