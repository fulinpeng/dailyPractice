const Mock = require('mockjs');
const str = 'abcdefghijklmnoporstuvwxyz';

export default {
  url: '/testApis/test1',
  config:{
    method:'post'
  },
  mock: Mock.mock({
    	"retCode|0-1": 0,
    	"data|1-10": [
        {
          "key|+1": Mock.mock('@increment'),
          "name": Mock.mock(`@string(${str}, 3, 10)`),
          "age": 42,
          "address": Mock.mock(`@string(${str}, 3, 10)`),
        }
      ]
  })
}
