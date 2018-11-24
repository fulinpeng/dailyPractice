"use strict";
const dbconnect=require("../dbModule.js");
var jbModule={
    detail:function(request,response){
        let hdname=request.body.hdname;
        let arr=[];
        arr.push('%'+hdname+'%');
        let sql='SELECT * FROM t_activity where act_name like ?';
        dbconnect.getConnectionSql(sql,arr,function(err,data){
            console.log("错误信息"+err);
            response.send(data);
        })
    },
    islogin:function(request,response){
        if(request.session.loginUser!=null&&request.session.loginUser!=undefined){
            response.send("1");
        }else{
            response.send("0");
        }
    },
    submitinformation:function(request,response){
        let uid=request.body.uid;
        let actid=request.body.actid;
        let date=new Date();
        let arr=[uid,actid,date];
        let sql="INSERT INTO t_joinactive (ja_id,u_id,act_id,ja_state,ja_date) VALUES (null, ?, ?, 1, ?)";
            dbconnect.getConnectionSql(sql,arr,function(err,data){
                console.log("错误信息"+err)
            });
    },
    isRepeat:function(request,response){
        let uid=request.body.uid;
        let actid=request.body.actid;
        let arr=[uid,actid];
        let sql='SELECT * FROM ltbike.t_joinactive where u_id=? and act_id=?';
        dbconnect.getConnectionSql(sql,arr,function(err,data){
            console.log("错误信息"+err);
            if(data.length>0){
                response.send("1");
            }else{
                response.send("0");
            }
        })
    }
};
module.exports=jbModule;