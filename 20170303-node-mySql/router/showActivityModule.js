"use strict";
const mysql=require("mysql");
const mydbconfig=require("./dbModule.js");
//const showActivityModule={
//    showActivity:function(request,response){
//        let username =request.body.username;
//        let sql="SELECT * FROM  t_joinactive a LEFT JOIN t_user b ON a.u_id=b.u_id LEFT JOIN t_activity c ON c.act_id=a.act_id WHERE u_name=? ";
//        mydbconfig.getConnectionSql(sql,[username],function(err,data){
//            console.log(data);
//            if(err==null||err==undefined){
//                response.send(data);
//            }
//        })
//    }
//};



const showActivityModule={
    showActivity:function(request,response){
        console.log(222);
        let username =request.body.username;
        let sql="SELECT * FROM  t_joinactive a LEFT JOIN t_user b ON a.u_id=b.u_id LEFT JOIN t_activity c ON c.act_id=a.act_id WHERE u_name=? ";
        mydbconfig.getConnectionSql(sql,[username],function(err,data){
            console.log(data);
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    }
};


module .exports=showActivityModule;