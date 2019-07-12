/*
 * @Description: 模板编辑命令字列表
  */

export default {
  url: '/alg/version/fuzzy/tree',
  config:{
    method:'post'
  },
  mock: {
    	"retCode|0-1": 0,
    	"errMsg": "列表获取失败",
    	"data": [{
          title: '算法中文名',
          key: '0-0',
          children: [{
            title: '算法中文名/English name/1.0.1',
            key: '0-0-0',
            children: [
              { title: '命令字列表命令字列表', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0--00-0-1-0', key: '0-0-1-0'},
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          }, {
            title: '0-0-2',
            key: '0-0-2',
          }],
        }, {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        }, {
          title: '0-2',
          key: '0-2',
    }]
  }
}
