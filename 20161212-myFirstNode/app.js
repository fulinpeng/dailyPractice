"use strict";
const myexpress=require("express");
const app=myexpress();
const myejs=require("ejs");
const mycookie=require("cookie-parser");
const mysession=require("express-session");
const multiparty=require("connect-multiparty");
const fs=require("fs");
const AV=require("leanengine");
//进行用户的短信账号认证
AV.initialize("0HblAu3wQnaRl96cq19rFgUl-gzGzoHsz","3CzadXllDlAYINHbwqT2asRt");
const userModuls=require("./routes/userModuls.js");
//配置服务器
    app.configure(function(){
        //post请求
        app.use(myexpress.bodyParser({uploadDir:"./public/temp"}));
        //非get请求转换为post请求  put delete请求
        app.use(myexpress.methodOverride());
        //配置session
        app.use(mycookie());
        app.use(mysession({
            name:"skygarden",//网站名
            secret:"123456",//密码  当用浏览器来读取cookie时用的到
            cookie:{maxAge:900000},//cookie失效时间，一般15分钟
            rolling:true,
            resave:true//让cookie计时从最后一次response开始
        }));

        //设置ejs模板资源路径
        app.set("views",__dirname+"/views");
        //设置后缀名
        app.engine("html",myejs.__express);
        //启动ejs
        app.set("view engine","html");

        //提高get请求的级别大于静态资源请求
        app.use(app.router);
        app.use(myexpress.static(__dirname+"/public"));
        app.use(myexpress.favicon(__dirname+"/public/images/2.jpg"));
    });


app.set("port","3688");
app.listen(app.get("port"),function(){
    console.log("服务器启动")
}
);





app.post("/login.do",userModuls.login);
app.get("/reg.do",userModuls.reg);
//app.get("/",userModuls.isLogin);
//////////////////404
// app.use(function(request,response){
//     response.status(404).redirect("/404.html")
// });
//判断是否登录
app.get("/pages/*",function(request,response,next){
    console.log("sdgkjhsdfdfksdjfdgddj");
    if(request.url=="/login.html"){
        next();
    }else{
        if(request.session.userLogin){
            next();//如果请求的地址是登录则通过，进行下一个请求
        }else{
            response.redirect("/login.html");//否则跳转到登陆页面
        }
    }
});
//手机短信注册
app.get("/sendMess.do",function(request,response){
    let phoneNum=request.query.phoneNum;
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:phoneNum,
        name: '百杰118部',
        op: '短信验证',
        ttl: 10
    }).then(function(data){
        response.send(data);
        //console.log(data);
    }, function(err){
        response.send(err);
        //console.log(err);
    })
});
//注册验证
app.get("/yanzheng.do",function(request,response){
    let yanzhengNum=request.query.yanzhengNum;
    let phoneNum=request.query.phoneNum;
    AV.Cloud.verifySmsCode(yanzhengNum,phoneNum).then(function(data){
        response.send(data);
        //console.log(data);
    }, function(err){
        response.send(err);
        //console.log(err);
    });
});
//部门管理
app.post("/pages/DataManagement/load_deparment.do",userModuls.load_deparment);
app.post("/pages/DataManagement/getMaxpageNum.do",userModuls.getMaxPageNum);
app.post("/pages/DataManagement/revise_deparment.do",userModuls.revise_deparment);
app.post("/pages/DataManagement/add_deparment.do",userModuls.add_deparment);
app.post("/pages/DataManagement/delete_deparment.do",userModuls.delete_deparment);
app.post("/pages/DataManagement/getStaff.do",userModuls.getStaff);
app.get("/pages/add_notice.do",userModuls.add_notice);
app.post("/pages/load_noticeList.do",userModuls.load_noticeList);
app.post("/pages/getMaxPageNum_notice.do",userModuls.getMaxPageNum_notice);
app.get("/pages/showNoticeDetail.do",userModuls.showNoticeDetail);
app.post("/pages/delete_notice.do",userModuls.delete_notice);
app.post("/pages/DataManagement/load_staff.do",userModuls.load_staff);
app.post("/pages/DataManagement/update_staff.do",userModuls.update_staff);
app.post("/pages/fabuPic.do",userModuls.fabuPic);
app.post("/pages/getPic.do",userModuls.getPic);
app.post("/pages/getMaxPageNum_pic.do",userModuls.getMaxPageNum_pic);
app.post("/pages/delete_pic.do",userModuls.delete_pic);
app.post("/pages/delete_pics.do",userModuls.delete_pics);
app.post("/pages/upPic.do",multiparty(),userModuls.upPic);
app.get("/jsonp.do",function(request,response){console.log(1111111111111111)
    console.log(request.query.callBack)
    let callBack=request.query.callBack;
    let arr=[1,2,3,4,5,6,7];
    response.send(arr)
})