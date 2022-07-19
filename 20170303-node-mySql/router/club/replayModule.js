'use strict';
const dbconnect=require('../dbModule.js');
var reModule={
  huifu:function(request,response){
      let tzid=request.body.tzid;
      let u_id=request.body.u_id;
      let content=request.body.content;
      let date=new Date();
      let sql='INSERT INTO t_reply (re_id, t_s_s_id, u_id,re_context,re_time) VALUES (null, ?, ?, ?,?)';
      let arr=[tzid,u_id,content,date];
      dbconnect.getConnectionSql(sql,arr,function(err,data){
          console.log("错误信息"+err);
      })
  },
   uid:function(request,response){
       let username=request.body.username;
       let sql='SELECT * FROM t_user where u_name=?';
       dbconnect.getConnectionSql(sql,[username],function(err,data){
           console.log("错误信息"+err);
           response.send(data);
       })
   },
    getreply:function(request,response){
        let tzid=request.query.tzid;
        let sql='SELECT *,(SELECT pc_src FROM t_picture where pc_id=b.t_p_pc_id) psrc FROM t_reply a left join t_user b on a.u_id=b.u_id where t_s_s_id=?;';
        dbconnect.getConnectionSql(sql,[tzid],function(err,data){
            console.log("错误信息"+err);
            var replylist=data;
            response.render('huifu',{replylist:replylist})
        })
    },
    touxiang:function(request,response){
        let usernmae=request.body.usernaem;
        let sql='SELECT pc_src FROM t_user a left join t_picture b on a.t_p_pc_id=b.pc_id  where u_name=?';
        dbconnect.getConnectionSql(sql,[usernmae],function(err,data){
            response.send(data)
        })
    }
};
module.exports=reModule;