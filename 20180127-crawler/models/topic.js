/**
 * Created by flp on 2018/1/27.
 */
const mongoose=require('mongoose');

const TopicSchema=new mongoose.Schema({
    title:String,
    url:String,
    createTime:Number,
    details:[String],
    pics:[String],
});

const TopicModel=mongoose.model('topic', TopicSchema);

module.exports=TopicModel;
