"use strict";
const mysql=require("mysql"); //加载数据库模块
//数据库连接函数
const dbconnect= {
    //数据库连接配置对象
    myconfigure:{
        host: "localhost",//数据库ip地址
        user: "root",
        password: '123456',
        port: '3308',//端口号
        database: 'ltbike'//数据库名字
    },
    getConnectionSql: function (sql,arr,fn) {
        const pool=mysql.createPool(this.myconfigure);
        pool.getConnection(function(err,connection){
            if(err){
                console.log('@@@@@@@false');
            }else{
                console.log('@@@@@@@true');
                connection.query(sql,arr,fn);
                pool.end();
            }
        })
    }
};
module.exports=dbconnect;
