/*
 * @Description: 镜像列表
  */

export default {
  url: '/alg/image/list',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "失败 ",
        "data": [
          {
            "id": 1,
            "uid": "fc85da4fbaf711e8b71bb8975adbc6b5",
            "host": "hub.linkingmed.com",
            "name": "mri_analysis",
            "version": "latest",
            "summary": "",
            "dockerFileContent": "",
            "status": 0,
            "createTime": 1537258156000
          }
      ]
  }
}
