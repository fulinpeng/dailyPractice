export default {
  url: '/testApis/test3?name={name}',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "",
    	"data": {
        "name": "flp3",
        "age": 33
      }
  }
}
