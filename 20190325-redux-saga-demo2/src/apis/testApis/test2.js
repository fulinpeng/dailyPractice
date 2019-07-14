export default {
  url: '/testApis/test2',
  config:{
    method:'get'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "",
    	"data": {
        "name": "flp",
        "age": 22
      }
  }
}
