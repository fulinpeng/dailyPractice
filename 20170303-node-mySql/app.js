"use strict";
const myexpress=require("express");
const app=myexpress();
const mysession=require('express-session');
const mycookie=require('cookie-parser');
const ejs=require('ejs');
const fs=require("fs");
const multiparty=require('connect-multiparty');//对文件进行解析
const dbconnect=require('./router/dbModule.js');
const modulShoppingCar=require("./router/personal/modulShoppingCar.js");
const luntanModule=require("./router/club/luntanModule.js");
const julebuModule=require("./router/club/julebuModule.js");
const replayModule=require("./router/club/replayModule.js");
const storeModule=require("./router/store/store.js");
const mystore=require("./router/store/mystore.js");
const informationModules=require("./router/informationModule.js");

const AV=require("leanengine");
//身份验证 AV.initialize(APPID,APP KEY)
AV.initialize("DhocUp4zhAHfMPjRNI1u086b-gzGzoHsz","UGKN9wkW3R8rwcR284bWv01j");
//服务器配置
app.configure(function () {
    //输出日志
    app.use(myexpress.logger("dev"));
    //配置cookie
    app.use(mycookie());
    //配置session
    app.use(mysession({
        name:"lt",
        secret:"123456",
        cookie:{maxAge:100000},
        rolling:true,
        resave:true
    }));
    //处理post请求的配置
    app.use(myexpress.bodyParser({uploadDir:"./public/temp"}));
    //非get请求转换为post请求
    app.use(myexpress.methodOverride());
    //把路由监听的方法级别提高至资源前 在前两个配置之后
    app.use(app.router);
    //配置静态资源
    //app.use(myexpress.static(__dirname+"/public"));
    app.use(myexpress.static(__dirname+"/dist/public"));
    //配置网站Logo
    app.use(myexpress.favicon(__dirname+"/public/images/img-logo.png"));
    //输出错误信息
    app.use(myexpress.errorHandler());

    //ejs设置
    app.set("views",__dirname+"/view");
    //设置引擎识别的后缀名
    app.engine("html",ejs.__express);
    //启动引擎
    app.set("view engine","html");
    app.set("port","5719");
    app.listen(app.get("port"), function () {
        console.log("服务器开启")
    });
});




//周喆-------------------------------分割线-------------------------------------
const UserModule=require("./router/login-reg/UserModule.js");
//电话验证
app.post('/pages/login-reg/identifying.do',UserModule.message);
//验证码是否通过.注册
app.post('/pages/login-reg/identifying-code.do',UserModule.reg);
//检查注册姓名是否重复
app.post('/pages/login-reg/verifyname.do',UserModule.checkname);
//登录
app.post('/pages/login-reg/loginindex.do',UserModule.login);
//忘记密码检查账号是否存在
app.post('/pages/login-reg/forgetname.do',UserModule.checkname);
//更改密码提交操作
app.post('/pages/login-reg/login_updata.do',UserModule.updata);
//更改密码验证码
app.post('/pages/login-reg/login_foridenti.do',UserModule.codemessage);
//李广念-------------------------------分割线-------------------------------------
app.post('/pages/club/l_newTopic.do',luntanModule.newTopic);
app.post('/pages/club/j_hdxq.do',julebuModule.detail);
app.get('/pages/club/j_islogin.do',julebuModule.islogin);
app.post('/pages/club/submitinformation.do',julebuModule.submitinformation);
app.post('/pages/club/isRepeat.do',julebuModule.isRepeat);
app.get('/pages/club/l_tzrefesh.do',luntanModule.refssh);
app.post('/pages/club/pagenumer.do',luntanModule.page);
app.post('/pages/club/sumreply.do',luntanModule.sumreply);
app.get('/pages/club/reply.do',luntanModule.retaget);
app.post('/pages/club/r_topic.do',replayModule.huifu);
app.post('/pages/club/uid.do',replayModule.uid);
app.get('/pages/club/getreply.do',replayModule.getreply);
app.post('/pages/club/touxiang.do',replayModule.touxiang);
//张帆-------------------------------分割线---------------------------
app.post('/pages/store/storeIndex1.do',storeModule.getStoreShow1);
app.post('/pages/store/storeIndex2.do',storeModule.getStoreShow2);
app.post('/pages/store/storeIndex3.do',storeModule.getStoreShow3);
app.post('/pages/store/storeIndex4.do',storeModule.getStoreShow4);
app.get('/pages/store/getStorDetails.do',storeModule.getStorDetails);
app.post('/pages/store/s_shangping.do',storeModule.getshangping);
app.get('/pages/store/getbikeMessage1.do',storeModule.getbikeMessage1);
app.get('/pages/store/getbikeMessage2.do',storeModule.getbikeMessage2);
app.get('/pages/store/getbikeMessage3.do',storeModule.getbikeMessage3);
app.post('/pages/store/storebuybike.do',storeModule.buybike);
app.post('/pages/store/storeburyparts.do',storeModule.buryparts);



//张兴锐-------------------------------分割线-----------------------------------
app.post('/pages/store/getallparts.do',mystore.partslist);
app.post('/pages/store/getallcount.do',mystore.getCount);
app.post('/pages/store/getallbicyclecount.do',mystore.getallbicyclecount);
app.post('/pages/store/getallbicycle.do',mystore.getallbicycle);
app.post('/pages/store/getallmadeparts.do',mystore.getallmadeparts);
app.post('/pages/store/madethebicycle.do',mystore.madethebicycle);
app.post('/pages/store/getpartsid.do',mystore.getpartsid);
app.post('/pages/personal/getuseraddress.do',mystore.getuseraddress);
app.post('/pages/personal/getalllist.do',mystore.getalllist);
app.post('/pages/personal/getbicycleinfo.do',mystore.getbicycleinfo);
app.post('/pages/personal/getpartsinfo.do',mystore.getpartsinfo);
app.post('/pages/personal/inserintoindent.do',mystore.inserintoindent);



app.post("/pages/personal/loadData_Pr_shoppingCar_bike.do",modulShoppingCar.loadData_Pr_shoppingCar_bike);
app.post("/pages/personal/loadData_Pr_shoppingCar_pei.do",modulShoppingCar.loadData_Pr_shoppingCar_pei);
app.post("/pages/personal/deleteShopCar.do",modulShoppingCar.deleteShopCar)
app.post("/indentdetails1.do",informationModules.indentdetails1);
app.post("/indentdetails2.do",informationModules.indentdetails2);
app.post("/indentdetails3.do",informationModules.indentdetails3);

//景帅2-------------------------------分割线-------------------------------------
//const informationModules=require("./router/informationModule.js");
app.post("/showInformation.do",informationModules.pr_information);
app.post("/amendInformation.do",informationModules.amendInformation);
app.post("/commitHead.do",multiparty(),function(request,response){
    let username ="zhangsan";
    let tempPath =request.files.myfile.path;                                      //临时路径
    let fileName =request.files.myfile.originalFilename;
    if(fs.existsSync("./dist/public/images/"+username)==false){                      //判断有没有该文件夹
        fs.mkdirSync("./dist/public/images/"+username);//创建一个文件夹
    }
    let targetPath="./dist/public/images/"+username+"/"+fileName;
    fs.rename(tempPath,targetPath,function(err,data){
        if(err==null){
            response.send({url:"../../images/"+username+"/"+fileName});
        }else{
            throw err;//把错误抛出来
        }
    })
});
app.post("/confirmcommitHead.do",informationModules.confirmcommitHead);
app.post("/address.do",informationModules.address);
app.post("/getUserId.do",informationModules.getUserId);
app.post("/selectAddress.do",informationModules.selectAddress);
app.post("/updateAddress.do",informationModules.updateAddress);
app.post("/deleteAddress.do",informationModules.deleteAddress);
app.post("/bindTel.do",function(request,response){
    let u_tel=request.query.u_tel;
    let u_yanzheng=request.query.u_yanzheng;
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:"13183810335",
        name:"狼途官网",
        op:"注册验证，验证码'+u_yanzheng+'",
        ttl:10
    }).then(function(data){
        //response.send("ok");
        console.log("成功");
    },function(err){
        //response.send("fail");
        console.log("失败");
    })
});
app.post( "/getUserIdFd.do",informationModules.getUserId);
app.post("/showFriend.do",informationModules.showFriend);
app.post("/showdetailFreind.do",informationModules.showdetailFreind);
app.post("/showInd.do",informationModules.showInd);
app.post("/getUserIndId.do",informationModules.getUserId);
app.post("/waitPay.do",informationModules.waitPay);
app.post("/hadPay.do",informationModules.hadPay);
app.post("/finishedPay.do",informationModules.finishedPay);
app.post("/selectAllCoutInd.do",informationModules.selectAllCoutInd);
//app.post("/showIndAddress.do",informationModules.showIndAddress);

const showActivityModule=require("./router/showActivityModule.js");
app.post("/showActivity.do",showActivityModule.showActivity);