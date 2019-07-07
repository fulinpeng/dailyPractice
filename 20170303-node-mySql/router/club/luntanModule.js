'use strict';
const dbconnect=require('../dbModule.js');
var ltModule={
    newTopic:function(request,response){

        let tzlb=request.body.tzlb;
        let uid=request.body.u_id;
        let tzname=request.body.tzname;
        let tzcontent=request.body.tzcontent;
        let tzdate=request.body.tzdate;
        let time=new Date();
        let tznumber=time.getFullYear()+time.getYear()+time.getHours()+time.getSeconds().toString()+time.getMilliseconds().toString();
        console.log(tznumber)
        if(tzlb=="技术交流"){
            tzlb=1;
        }else if(tzlb=="我要吐槽"){
            tzlb=2;
        }else if(tzlb=="美丽回忆"){
            tzlb=3;
        }
        let sql="insert into t_share (s_tzid,sc_id,u_id,s_name,s_context,s_state,s_time)" +
            " values(?,?,?,?,?,1,?)";
        let arr=[tznumber,tzlb,uid,tzname,tzcontent,time];
        dbconnect.getConnectionSql(sql,arr,function(err,data){
            console.log("错误信息"+err);
        })

    },
    refssh:function(request,response){
        let tzlb=request.query.tzlb;
        let page=request.query.page;
        if(tzlb=="技术交流"){
            tzlb=1;
        }else if(tzlb=="我要吐槽"){
            tzlb=2;
        }else if(tzlb=="美丽回忆"){
            tzlb=3;
        }
        let arr=[tzlb];
        let sql="SELECT * FROM t_share a left join t_user b on a.u_id=b.u_id where sc_id=? order by s_id desc";
        console.log([tzlb]);
        if(page!=undefined){
            page=(page-1)*10;
            sql+=' limit ?,10';
            arr.push(page);
            console.log("111111111"+page);
        }
        dbconnect.getConnectionSql(sql,arr,function(err,data){
            console.log('错误信息：'+err);
            console.log(data)
            let ltdata=data;
            response.render('luntan',{ltdata:ltdata})
        })
    },
    page:function(request,response){
        let tzlb=request.body.text;
        if(tzlb=="技术交流"){
            tzlb=1;
        }else if(tzlb=="我要吐槽"){
            tzlb=2;
        }else if(tzlb=="美丽回忆"){
            tzlb=3;
        }
        let sql="SELECT count(*) as number FROM t_share where sc_id=?";
        dbconnect.getConnectionSql(sql,[tzlb],function(err,data){
            response.send(data);
        })
    },
    retaget:function(request,response){
        let shtitle=request.query.shtitle;
        let sql="SELECT *,(select u_name from t_user where u_id=a.u_id) name FROM t_share a  where s_name=?";
        dbconnect.getConnectionSql(sql,[shtitle],function(err,data){
            let topiclist=data[0];
            response.render('rezhuti',{topiclist:topiclist})
        })
    },
    sumreply:function(request,response){
        let tzname=request.body.tzname;
        let sql='SELECT count(*) sum FROM ltbike.t_reply a left join t_share b on a.t_s_s_id=b.s_id where s_name=?';
        dbconnect.getConnectionSql(sql,[tzname],function(err,data){
            console.log("错误信息"+err);
            response.send(data)
        })
    }
};
module.exports=ltModule;