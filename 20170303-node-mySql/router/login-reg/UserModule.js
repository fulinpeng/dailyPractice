/**
 * Created by gxa on 2017/2/23.
 */
"use strict";
const AV=require("leanengine");
const db=require("../dbModule.js");
var UserModule= {
    //短信
    message:function(req,res){
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:req.body.tel,
            name:"狼途车行",
            op:"注册验证",
            ttl:3
        }).then(function(){
            res.send("1");
            console.log("发送成功")
        },function(){
            res.send("2");
            console.log("发送失败")
        });
    },
    //修改密码短信
    codemessage:function(req,res){
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:req.body.tel,
            name:"狼途车行",
            op:"修改密码",
            ttl:3
        }).then(function(){
            res.send("3");
            console.log("发送成功")
        },function(){
            res.send("4");
            console.log("发送失败")
        });
    },
    //注册
    reg: function (req, res) {
        let usertel = req.body.tel;
        let useridcode = req.body.iden;
        let username = req.body.username;
        let pwd = req.body.pwd;
        let date = new Date();
        let sql = "insert into t_user values(null,null,null,null,?,null,?,?,null,1,null,?,null,null)";
        let dataArray = [username, pwd, usertel, date];
        let fn = function (err, data) {
            if(err == null){
                res.send("1")
            }
            console.log(err);


        };
        AV.Cloud.verifySmsCode(useridcode, usertel).then(function () {
            db.getConnectionSql(sql, dataArray,fn);
            //验证成功
        }, function (err) {
            //验证失败
        });
    },
    //
    checkname:function(req,res){
        let username = req.body.username;
        let sql ="select * from t_user where u_name=?";
        let dataArray=[username];
        let fn=function(err,data){
            res.send(data)
        };
        db.getConnectionSql(sql, dataArray,fn);
    },
    login:function(req,res) {
        let username = req.body.username;
        let userpwd = req.body.userpwd;
        let sql = "select * from t_user where u_name=? and u_password=?";
        let dataArray = [username,userpwd];
        let fn = function (err, data) {
            res.send(data);
        };
        db.getConnectionSql(sql,dataArray,fn);
    },
    updata:function(req,res){
        let usertel = req.body.tel;
        let useridcode = req.body.iden;
        let username = req.body.username;
        let pwd = req.body.pwd;
        let sql = "UPDATE t_user SET u_password=? WHERE u_name=? AND u_tel=?";
        let dataArray = [pwd,username,usertel];
        let fn = function (err, data) {
            if(err==null){
                res.send("1")
            }
        };
        AV.Cloud.verifySmsCode(useridcode, usertel).then(function () {
            db.getConnectionSql(sql, dataArray,fn);
            //验证成功
        }, function (err) {
            //验证失败
        });
    }



};
module.exports=UserModule;