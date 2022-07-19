/**
 * Created by Administrator on 2017/1/3 0003.
 */
"use strict";
const mysql=require("mysql");
const dbconfig={
    myconfig:{
        host:'localhost',
        user:'root',
        password:'root',
        port:'3306',
        database:'db118'
    },
    getConnectionSql:function(sql,arr,fn){
        let getConnection=mysql.createConnection(this.myconfig);
        getConnection.connect();
        getConnection.query(sql,arr,fn);
        getConnection.end();
    }
};
module.exports=dbconfig;