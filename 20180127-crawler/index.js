/**
 * Created by flp on 2018/1/27.
 */

require('./services/mongo');
const Topic=require('./models/topic');
const crawler=require('./services/crawler');

(async ()=> {
    for (let i=0; i<10; i+=25) {
        let results = await crawler.fetchSingleDoubanList(i);
        for (let j=0; i<results.length; j++) {
            let r=results[j];
            let foundTopic=await Topic.findOne({url:r.url}).then(r=>r);
            if (!foundTopic) await Topic.create(r).then(r=>r);
            if (true) { // 随便设置点什么条件，用个jieba分词来查找，
                await crawler.fetchSingleDoubanTopic(r.url);
            }
            // await Topic.fetchSingleDoubanTopic(results[j]);
        }
    }
})()
    .then(r => {
        console.log('done');
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    });