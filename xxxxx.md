

// https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md

// Webpack优化SplitChunks分包【上】
// Webpack优化SplitChunks分包【下】
// 手写Recolil
// 手写Redux+Vuex【上】
// 手写Redux+Vuex【下】
// Webpack核心原理【上】
// Webpack核心原理【下】


// 技术只是给你一个视角，什么该干，什么不该干。盈利是来自你的头寸管理，来自你的胸怀。

// 趋势不是你们看到的走出来的图形，什么高点低点不断抬高，什么几根均线追踪。趋势是你头寸浮盈不断增加和减少才能事后才能确认的。所以说了顺势而为你们也不懂，说也白说。学习东西要思考，别满脑子浆糊。总以为复盘靠几根均线，几个指标，看着历史数据盘算着，如果怎么就发大财，痴人也。所以说了顺势而为你们也不懂，说也白说。市场能确定的就是当下的价格，其他的全扯谈。

// 交易就是暴利，无需辩论。关键是转变你们的思想，别再错误的道路上，越走越远。看许多人很多年过去了，资金永远那么一点，生活永远那么凄凉。

// 脚踏实地选择正确的因，一定收获的是正确的果。不要让你的家人担心，不要白度光阴，人生很短，珍惜光阴。

// 说了这么多是希望大家不要随便对待交易，交易是很严谨，又充满不确定性的。

// 这里很多人不是富二代吧，不是官二代。都是拿着微薄的钱来到市场想通过交易来实现财务自由。要记住从开始就要有明确目标，你是为交易而交易，还是为赚钱而交易。如果为赚钱那就拿出你的勇气，拿出的自信。

// 赚钱目标要明确，你是来积累本金的，记住。

// 钱少不可怕，可怕你心不坚定。

// 1.小钱慢慢来多找明确的机会，一星期有那么一两次，可能一星期有一次。

// 把你的钱当作最后一笔一样看待，去寻找那些明确的机会。

// 慢慢积累。

// 2.当你翻倍了之后可以取出一半。开另外一个账户操作，去寻找几个月会有一两波的大行情，耐心点。找到了方向对了，以开仓均价加码，往死里加。

// 去复盘看看如果你抓住这机会，第一桶金就到手了。找启动点很简单，说个最简单最简单的吧、技术性的。

// 金融投机千说万说，无非可控的风险，博取不可控的利润，如此而已。抓住时机大干快上，没时机赚点小钱。保持对市场的敏感，就这么简单。

// 奋斗ing
// 小众指标优选（2）：止损利器SAR
// 开始今天的内容。 止损，这个词，是被投资专家们提到最多的词，但也是股民最难做到的。它的全称是停止亏损，是一种以最小的亏损为代价的买入卖出操作，目的是防止亏损的扩大。之所以普通股…

// 选择语言


/*
未来半年，执行规划：准备面试即可
react、Ts、webpack、node、vue（硬核）
redux、receol、jiotai（硬核）
ssr
算法
性能
开源项目
solidity
redis、gulphSQL、
react-native、
vr、3d、cocos、

执行之前仔细推敲哪些是应该细致投入的，把控好时间重效率理解透彻避免重复看没看懂

可能想做的太多，别人要的又是千差万别，但是自己只能选其中几样，硬核必须够硬

给自己定位要明确
*/


/*
pwa
pwa已经落寞了，把整站缓存到本地搞成一个小应用，可以离线，启动超快，用的webworker

pwa被抛弃了，但是留下了webworker
谷歌有个框架workbox
通过 workbox + webpack 插件将网站所有路由的页面全部缓存起来，变成了离线的

amp
增强html的，解决html性能差，增加了标签相当于高性能组件

读indexDb是异步，读storage是同步的，storage最常见
cookie基本存不了啥，cookie每个请求都携带，浪费，可用cdn解决此问题
但是webSQL落寞了，存的多50mb，但是性能差，读写有时候

QPS = pv / t; 访问人数集中在某个时间
用 wrk 压测一个机器的QPS，是否顶得住产品的预估QPS

serverless 带集群自动负载、监控、日志、等不用自己弄了、成本低、但是限制多
loadflare是serverless的最佳实践，对包支持不好

微前端
有webpack联邦模块了，不需要qiankun
*/




今天我面试了一家交易所 1面基础的面试题给大家
从输入URL到页面展示经历些什么?
new Object 和 Object.create区别什么?
js 数据精度丢失怎么解决？
typeof 和 insatnceof区别？
webpack热更新原理？
如何用css无缝滚动？
这里有个问题 5s-6s中间有个缝隙怎么办？
react 错误捕获怎么办？
node.js性能怎么把控？
node.js 如何避免内存泄露？
node.js 如何监控 fetch错误？
trpc解决了啥，你实践过么？
​1.Vue2和Vue3区别是什么？
2.Vue3是否借鉴了React?
3.React的hooks常用的有哪些？你觉得有哪些坑？
4.当你想推动一项技术落地团队成员不想用你怎么办？
5.SPA最核心的性能指标有哪些 怎么改进？
6.你觉得同构解决了最核心的指标是哪些？
7.你如何统计性能指标参数？这些参数你是怎么清晰的？
8.算法题 不难 时间复杂度O(n) 空间复杂度O(1) 限时 5-10分钟
/*
找出数组中的平衡点
给定一个整数数组，找出数组的一个平衡点，使得平衡点左侧所有数字之和等于右侧所有数字之和。如果存在多个平衡点，返回最左边的那个。如果不存在平衡点，返回-1。
Given an array of integers, find a balance point in the array where the sum of the numbers to the left of the point is equal to the sum of the numbers to the right of the point. If there are multiple balance points, return the leftmost one. If no balance point exists, return -1.
示例：
  输入：[1, 7, 3, 6, 2, 9]
输出：3（索引3处的6是平衡点，因为1+7+3 = 2+9）
*/

function findBalancePoint(arr){
    //计算数组所有和
    let totalSum = arr.reduce((sum,num)=>sum+num,0);
    let leftSum = 0;
    
    for(let i=0;i<arr.length;i++){
        let rightSum = totalSum - leftSum - arr[i];
        if(leftSum === rightSum){
            return i;
        }
        leftSum += arr[i];
    }
    return -1;
}
​
​现货和合约有啥区别？
永续合约是啥？
K线性能怎么解决？
​
​