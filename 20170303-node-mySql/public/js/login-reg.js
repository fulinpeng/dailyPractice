/**
 * Created by Administrator on 2017/2/19 0019.
 */

var w = document.body.offsetWidth;
//头部导航
//var isNavShow=false;
//$(".menu-a").click(function(){
//    $("header .menu .nav").show(500);
//    $("header").height("660px");
//    $("header .menu").height("100%");
//    $(".nav-shade").css("display","block");
//    $(".menu-a").hide(500);
//    $("section").animate({"width":"80%"},500);
//    $("figure").animate({"width":"80%"},500);
//    $("footer").animate({"width":"80%"},500);
//});
//$(".nav-shade").click(function(){
//    $("header").height("0px");
//    $("header .menu").height("0%");
//    $("header .menu .nav").hide(500);
//    $(".nav-shade").css("display","none");
//    $(".menu-a").show(500);
//    $("section").animate({"width":"100%"},500);
//    $("figure").animate({"width":"100%"},500);
//    $("footer").animate({"width":"100%"},500);
//});
//
//
////平滑移动到锚点位置
//function smooth(obj){
//    $("body").animate({
//        "scrollTop": $(obj.attr("name")).offset().top + "px"
//    },1000);
//    return false;
//}
//$(".sliddown").eq(0).click(function(){console.log($(this).attr("name"));
//    smooth($(this));
//});
//登录注册
//头部导航
$(".menu-a").click(function(){
    $("header").height("667px");
    $("header .menu").height("100%");
    $("header .menu .nav").css({"display":"block"});
    $("header .menu .nav").animate({"opacity":"1"},300);
    $(".nav-shade").css("display","block");
    $(".nav-shade").animate({"opacity":"0.8"},300);
    $(".menu-a").css({"display":"none"});
})
$(".nav-shade").click(function(){
    guanbi();
})
$(".guanbi div").click(function(){
    guanbi();
})
function guanbi(){
    $("header").height("0px");
    $("header .menu").height("0%");
    $("header .menu .nav").animate({"opacity":"0"},300);
    $("header .menu .nav").css({"display":"none"});
    $(".nav-shade").animate({"opacity":"0"},300);
    $(".nav-shade").css("display","none");
    $(".menu-a").css({"display":"block"});
}


//发送短信
var sure1=false;
var sure2=false;
var identify=true;
var ms;
var identifyms=0;
var time1;
function addidentifyms(){
    if(identifyms<60){
        identifyms++;
        ms=60-identifyms;
        $("#reg_identibutton").text("还有"+ms+"秒可以点击");
        $("#reg_identibutton").css({"background-color":"grey",
                                    "border":"1px solid grey"
                                        });
        identify=false;
    }else{
        clearInterval(time1);
        identifyms=0;
        identify=true;
        $("#reg_identibutton").text("发送验证码");
        $("#reg_identibutton").css({"background-color":"#f26031",
                                    "border":"1px solid #f26031"
                                                });

    }
}
function identifying(){
    if(identify==true){
        var id_tell=$("#reg_tel").val().trim();
        $.ajax({
            url:"identifying.do",
            type:"post",
            data:{tel:id_tell},
            dataType:"json",
            success:function(data){
                if(data==1){
                    time1=setInterval(addidentifyms,1000);
                }
            }

        })
    }

}
//验证短信，注册
function identify_code(){
    if(sure1==true&&sure2==true){
        var id_username=$("#reg_username").val().trim();
        var id_userpwd=$("#reg_userpwd").val().trim();
        var id_tell=$("#reg_tel").val().trim();
        var id_code=$("#reg_code").val().trim();
        $.ajax({
            url:"identifying-code.do",
            type:"post",
            data:{username:id_username,pwd:id_userpwd,tel:id_tell,iden:id_code},
            dataType:"json",
            success:function(data){
                console.log(data)
               if(data==1){
                   window.location.href="../../index.html";
                   sessionStorage.setItem("username",id_username);
                   sessionStorage.setItem("password",id_userpwd);
               }

            }
        })
    }else{
        return false;
    }

}
//检查是否重复
function Verifyname(){
    var username=$("#reg_username").val().trim();
    if(username.length==0){
        $("#reg_desname").text("请输入用户名")
    }else{
        var reg=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        var flag=reg.test(username);
        if(flag==true){
            $.ajax({
                url:"verifyname.do",
                type:"post",
                data:{username:username},
                dataType:"json",
                success:function(data){
                    if(data.length==0){
                        $("#reg_desname").text("可以使用的用户名");
                        sure1=true;
                    }else{
                        $("#reg_desname").text("用户名已占用");
                        $("#reg_username").focus();
                    }
                }
            })
        }else{
            $("#reg_desname").text("请输入正确格式用户名")
        }
    }
}
//验证密码是否符合规则并且两次输入一致
function checkpwd(){
    var reg=/^[A-Za-z0-9_-]+$/;
    var pwd=$("#reg_userpwd").val().trim();
    var pwd1=$("#reg_userpwdsure").val().trim();
        var flag1=reg.test(pwd);
        var flag2=reg.test(pwd1);
        if(flag1==false||flag2==false){
            $("#reg_despwd").text("请输入正确的密码格式")
        }else if(pwd!=pwd1){
            $("#reg_despwd").text("两次密码不一致")
        }else if(pwd==pwd1){
            $("#reg_despwd").text("");
            sure2=true
        }




}
//登录
function loginindex(){
    var id_username=$("#login_username").val().trim();
    var id_userpwd=$("#login_pwd").val().trim();
    sessionStorage.setItem("username",id_username);
    sessionStorage.setItem("password",id_userpwd);
    if(id_username==""||id_userpwd==""){
        $("#logindes").text("请输入完整信息")
    }else{
        $.ajax({
            url:"loginindex.do",
            type:"post",
            data:{username:id_username,userpwd:id_userpwd},
            dataType:"json",
            success:function(data){
                if(data.length==0){
                    $("#logindes").text("用户名和密码不匹配")
                }else{
                    window.location.href="../../index.html"
                }
            }
        })

    }
}
var sure3=false;
var sure4=false;
//忘记密码
//1.修改密码查询用户名是否存在
$("#login_forname").blur(function(){
    login_forname()
});
function login_forname(){
    var username=$("#login_forname").val().trim();
    if(username.length==0){
        $("#login_checkforname").text("请输入用户名")
    }else{
        var reg=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        var flag=reg.test(username);
        if(flag==true){
            $.ajax({
                url:"forgetname.do",
                type:"post",
                data:{username:username},
                dataType:"json",
                success:function(data){
                    console.log(data.length);
                    if(data.length==1){
                        $("#login_checkforname").text("");
                        sure3=true;
                    }else{
                        $("#login_checkforname").text("不存在的用户名");
                        $("#login_forname").focus();
                    }
                }
            })
        }else{
            $("#login_checkforname").text("请输入正确格式用户名")
        }
    }
}
//2,发送验证码
var foridentify=true;
var forgms;
var foridentifyms=0;
var time2;
function foraddidentifyms(){
    if(foridentifyms<60){
        foridentifyms++;
        forgms=60-foridentifyms;
        foridentify=false;
        $("#login_foridenti").text(forgms+"秒可以点击");
        $("#login_foridenti").css({"background-color":"grey",
                                    "border":"1px solid grey"
                                                    })
    }else{
        foridentifyms=0;
        foridentify=true;
        $("#login_foridenti").text("发送验证码");
        $("#login_foridenti").css({"background-color":"#f26031",
                                "border":"1px solid #f26031"
                                        });

    }
}
$("#login_foridenti").click(function(){
    login_foridenti()
});
function login_foridenti() {
    if(foridentify==true){
        var identel = $("#login_fortel").val().trim();
        var username = $("#login_forname").val().trim();
        if (identel.length==0||username.length==0) {
            return false;
        }else{
            $.ajax({
                url:"login_foridenti.do",
                type:"post",
                data:{username:username,tel:identel},
                dataType:"json",
                success:function(data){
                    if(data==3){
                        time2=setInterval(foraddidentifyms,1000);


                    }

                }
            })}
    }

    }
//验证密码
function checkpwd1(){
    var reg=/^[A-Za-z0-9_-]+$/;
    var pwd=$("#login_forpwd").val().trim();
    var pwd1=$("#login_forpwdsure").val().trim();
    var flag1=reg.test(pwd);
    var flag2=reg.test(pwd1);
    if(flag1==false&&flag2==false){
        $("#login_checkforpwd").text("请输入正确的密码格式")
    }else if(pwd!=pwd1){
        $("#login_checkforpwd").text("两次密码不一致")
    }else if(pwd==pwd1){
        $("#login_checkforpwd").text("");
        sure4=true;
    }
}
//提交更改密码
function login_updata(){
    if(sure3==true&&sure4==true){
        var username=$("#login_forname").val().trim();
        var userpwd=$("#login_forpwd").val().trim();
        var tell=$("#login_fortel").val().trim();
        var icode=$("#login_identi").val().trim();
        $.ajax({
            url:"login_updata.do",
            type:"post",
            data:{username:username,pwd:userpwd,tel:tell,iden:icode},
            dataType:"json",
            success:function(data){
                if(data==1){
                    layer.open({
                        title:'警告',
                        content:'更改成功',
                        btn: ['确定'],
                        yes:function(index, layero){
                            layer.close(index);
                            $('#myModal').modal('hide');
                            window.location.href="../../index.html";
                        }
                    });

                }

            }
        })
    }else{
        return false;
    }
}
//注销
function forgetindex(){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    window.location.href="../../index.html";
}
$(function(){
    var islogin=sessionStorage.getItem('username');
    if(islogin!=undefined){
        $('#hlogin').html('<a href="javascript:void(0);" onclick="forgetindex()">注销</a><span></span>')
    }else{
        $('#hlogin').html('<a href="../../pages/login-reg/login.html">登录</a><span></span>')
    }
})