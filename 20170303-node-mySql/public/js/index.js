/**
 * Created by Administrator on 2017/2/14 0014.
 */
window.onload=function(){
    var w = document.body.offsetWidth;
//登录
//    var isLoginshow=false;
//    $(".login-reg-a").parent().click(function(){
//        if(isLoginshow==false){
//            $(".login-reg").slideDown(500);
//        }else{
//            $(".login-reg").slideUp(500);
//        }
//    });

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


    //平滑移动到锚点位置
    function smooth(obj){
        $("body").animate({
            "scrollTop": $(obj.attr("name")).offset().top + "px"
        },1000);
        return false;
    }
    $(".sliddown").eq(0).click(function(){console.log($(this).attr("name"))
        smooth($(this));
    })

//滚动出现产品
    var productH=$(".product").offset().top;console.log(productH)
    var isproductshow=false;
    window.onscroll=function(){
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollY>60){
            $("header .logo").css("display","none")
        }else{
            $("header .logo").css("display","block")
        }


    }
//设置section高度
    $(".section").height($(window).height());
    console.log($(window).height())
//路线介绍
    var len=$(".luxian-ul").children("li").length;
    var num=0;
    var pre=len-1;
    var arrPlace=[];
    $(".luxian-left-top a").each(function(i,e){
        $(this).attr("index",i);
        arrPlace.push($(this).children(".title").text());
    });
    function turnImg(num){
        $(".luxian-ul li").eq(pre).removeClass("lu-active");
        $(".luxian-ul li").eq(num).addClass("lu-active");
        pre=num;
    }
    $(".luxian-left-top a").click(function(){
        $($(".luxian-left-top a").eq(pre).removeClass("twonavt-foucse"));
        $().addClass("lu-active");
        num=parseInt($(this).attr("index"));
        var s=parseInt(2100-num*2100/13);
        if(num==0){
            $(".pre").text("起点");
            $(".next  span").text(arrPlace[num+1]);
            $(".luxian-left-down .center").html("离终点还有:<span>"+s+"km</span>");
        }else if(num==13){
            $(".pre  span").text(arrPlace[num-1]);
            $(".luxian-left-down .center").html("离终点还有:<span>"+s+"km</span>");
            $(".next").text("终点");
        }else if(num>0&&num<13){
            var prenum=num-1;
            var nextnum=num+1;
            $(".pre").html("上一站-<span>"+arrPlace[prenum]+"</span>");
            $(".luxian-left-down .center").html("离终点还有:<span>"+s+"km</span>");
            $(".next").html("下一站-<span>"+arrPlace[nextnum]+"</span>");
        }
        turnImg(num);
    });
    $(".luxian-left-top a").eq(num).click();



//全屏滚动
    var isWheelFinish=false;
    var wheelFinishTimer;
    $('.index-banner').on('mousewheel', function(event) {
        var event=window.event || event;
        if(event.deltaY>0&&isWheelFinish==false){
            turnColor($(".points li a").eq(1));
            $("body").animate({
                "scrollTop": $('.club').offset().top + "px"
            },500);
            isWheelFinish=true;
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.club').offset().top){
                    isWheelFinish=false;
                }
            },30);
        }else if(event.deltaY<0){
            //$(this).animate({"transform":"rotateX(-45deg)"},200)
            //.animate({"transform":"rotateX(45deg)"},200);
            return;
        };
    });
    $('.club').on('mousewheel', function(event) {
        var event=window.event || event;
        if(event.deltaY>0&&isWheelFinish==false){
            turnColor($(".points li a").eq(2));
            $("body").animate({
                "scrollTop": $('.luxian').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.luxian').offset().top){
                    isWheelFinish=false;
                }
            },30);
        }else if(event.deltaY<0&&isWheelFinish==false){
            turnColor($(".points li a").eq(0));
            $("body").animate({
                "scrollTop": $('.index-banner').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.index-banner').offset().top){
                    isWheelFinish=false;
                }
            },30);
        };
    });
    $('.luxian').on('mousewheel', function(event) {
        var event=window.event || event;
        if(event.deltaY>0&&isWheelFinish==false){
            turnColor($(".points li a").eq(3));
            $("body").animate({
                "scrollTop": $('.huodong').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.huodong').offset().top){
                    isWheelFinish=false;
                }
            },30);
        }else if(event.deltaY<0&&isWheelFinish==false){
            turnColor($(".points li a").eq(1));
            $("body").animate({
                "scrollTop": $('.club').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.club').offset().top){
                    isWheelFinish=false;
                }
            },30);
        };
    });
    $('.huodong').on('mousewheel', function(event){
        var event=window.event || event;
        if(event.deltaY>0&&isWheelFinish==false){
            turnColor($(".points li a").eq(4));
            $("body").animate({
                "scrollTop": $('.footer').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.footer').offset().top){
                    isWheelFinish=false;
                }
            },30);
        }else if(event.deltaY<0&&isWheelFinish==false){
            turnColor($(".points li a").eq(2));
            $("body").animate({
                "scrollTop": $('.luxian').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.luxian').offset().top){
                    isWheelFinish=false;
                }
            },30);
        };
    });
    $('.footer').on('mousewheel', function(event) {
        var event=window.event || event;
        if(event.deltaY>0){
            return;
        }else if(event.deltaY<0&&isWheelFinish==false){
            turnColor($(".points li a").eq(3));
            $("body").animate({
                "scrollTop": $('.huodong').offset().top + "px"
            },500);
            isWheelFinish=true;
            clearInterval(wheelFinishTimer);
            wheelFinishTimer=setInterval(function(){
                if($("body").scrollTop()==$('.huodong').offset().top){
                    isWheelFinish=false;
                }
            },30);
        };
    });

//滚动到相应位置原点变颜色
//    if(scrollY>=$($(".points li a").eq(0).attr("name")).offset().top&&scrollY<$($(".points li a").eq(1).attr("name")).offset().top){
//        turnColor($(".points li a").eq(0));
//    }else if(scrollY>=$($(".points li a").eq(1).attr("name")).offset().top&&scrollY<$($(".points li a").eq(2).attr("name")).offset().top){
//        turnColor($(".points li a").eq(1))
//    }else if(scrollY>=$($(".points li a").eq(2).attr("name")).offset().top&&scrollY<$($(".points li a").eq(3).attr("name")).offset().top){
//        turnColor($(".points li a").eq(2))
//    }else if(scrollY>=$($(".points li a").eq(3).attr("name")).offset().top&&scrollY<$($(".points li a").eq(4).attr("name")).offset().top){
//        turnColor($(".points li a").eq(3))
//    }else if(scrollY>=$($(".points li a").eq(4).attr("name")).offset().top&&scrollY<$($(".points li a").eq(5).attr("name")).offset().top){
//        turnColor($(".points li a").eq(4))
//    }else if(scrollY>=$($(".points li a").eq(5).attr("name")).offset().top){
//        turnColor($(".points li a").eq(5))
//    }


//平滑移动到锚点位置
var preNava=$(".points li a").eq(0);
function smooth(obj){
    console.log("进来了", $("body").get(0).scrollTop, $(obj.attr("name")).offset().top);
    $("body").get(0).scrollTop = $(obj.attr("name")).offset().top;
    // $("body").animate({
    //     "scrollTop": $(obj.attr("name")).offset().top + "px"
    // },1000);
    // console.log('scrollTop', $("body").scrollTop)
    return false;
}
function turnColor(obj){
    preNava.attr("class","");
    obj.attr("class","active");
    preNava=obj;
}
$.each($(".points li a"),function(i,n){
    if(i!=$(".points li a").length){
        $(this).click(function(){
            turnColor($(this));
            smooth($(this));
        })
    }
});

};