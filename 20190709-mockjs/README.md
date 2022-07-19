# mockjs
* 请求地址带参数怎么处理
    * 用正则代替
* mock 的url是正则，ajax的url是字符串，它们是相互匹配的
* 正常ajax的参数与mock的参数怎么对应上得？
    * 使用mock的时候，不管你参数是啥，它都返回那一套数据，参数都被正则吞了
        * 当然也可以拿到这个参数，需要把那套数据写成一个方法再retrun数据即可
        * 因为在mock的数据处理函数中拿到的参数也是字符串要自己处理，还不如不用，就全部正则统一替换好点吧
    * 当使用正常ajax的时候就不走mock了，当然没什么影响啊，那些参数都给了ajax了
    * `但是哈，但是`，在link_one那个项目中，ajax的参数与mock的参数是绑在一起的
        * 实际上都用的mock数据配置的地方那个url配置数据哦，然后在执行preLoader.load()方法的时候全部放到了 apiMap 里面去了，走ajax的时候，会去解析并匹配上去
    * 使用mockjs就得调用Mock.mock(...)，不使用就别调用了，这个得在项目框架的层面上封装，不然就要一个个处理
    
* 实例位置：
* 模拟请求在 dashboard 的 componentDidMount 里面

# 使用规则
* 地址: 
    * https://github.com/nuysoft/Mock/wiki/Mock.mock()
    * http://mockjs.com/examples.html
* 知道这个基本就行了: Mock.mock( rurl?, rtype?, template|function( options ) )