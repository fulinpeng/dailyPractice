/*
 * @Description: 查询算法列表及明细
  */

export default {
  url: '/alg/list',
  config:{
    method:'post'
  },
  mock: {
    	"retCode": 0,
    	"errMsg": "",
    	"data": {
    		"count": 100,
    		"algList|6-8": [
          {
      			"appId": "0001",
      			"algNo": "3AB13A",
      			"algName": "eye_segmenteye_segmenteye_segmenteye_segmenteye_segmenteye_segment",
      			"algType": "segment",
      			"alias": "eye_segment",
      			"description": "表格学习表单那样另做一个HOC表格学习表单那样另做一个HOC表格学习表单那样另做一个HOC表格学习表单那样另做一个HOC表格学习表单那样另做一个HOC",
      			"inputType": "file",
      			"outputType": "file",
      			"priority": 0,
      			"createTime": 20180569,
      			"verList|0-20": [
              {
                "id": 29,
        				"algNo": "6MZIWP",
        				"algVer": "1.0.1",
        				"execType": "python",
        				"execFile": "predict.py",
        				"argsTemplate": "-d ${input} -g ${output} -w ${model}",
        				"inputParams": "[{\"origin\":\"http\",\"name\":\"input\",\"type\":\"dir\",\"value\":\"string\"},{\"origin\":\"http\",\"name\":\"output\",\"type\":\"dir\",\"value\":\"string\"}]",
        				"outputParams": "[{\"origin\":\"http\",\"name\":\"output\",\"type\":\"dir\",\"value\":\"string\"}]",
        				"dockerImage": "hub.linkingmed.com/mri_analysis:latest",
        				"cpuLimit": 1,
        				"gpuLimit": 1,
        				"memoryLimit": 0,
        				"shellPath": "E:\\app\\yaml\\6MZIWP\\1.0.1\\6MZIWP_1.0.1.ftl",
        				"modelPath": "E:\\app\\yaml\\string\\model_string_1.0.1_model.zip",
        				"confPath": "E:\\app\\yaml\\string\\conf_string_1.0.1.yaml",
        				"sourcePath": "E:\\app\\yaml\\string\\source_string_1.0.1_prog.zip",
        				"status": 0,
        				"createTime": 1532512289000,
        				"lastUpdateTime": 1534814049000
              }
      			]
      		}
        ]
    	}
  }
}
