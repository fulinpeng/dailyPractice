/**
 * Created by 79284 on 2016/12/13 0013.
 */
window.onload=function(){
    //页面加载显示日历





    //首页导航
    $(function(){
        $('.sidbar-nav>li>a').click(function(){
            if($(this).next('ul').css('display')=='none'){
                $('.sidbar-nav>li>a').each(function(i){
                    $(this).parent("li").removeClass('active');
                    $(this).next('ul').slideUp();
                });
            }
                $(this).parent("li").addClass('active');
                $(this).next('ul').slideToggle();
        });
    });
    //切换iframesrc地址
    $.each($(".childe-ul li a"),function(i,n){
        $(this).click(function (){
            var iframSrc="pages/"+$(this).attr("name")+".html";
            $("iframe").attr("src",iframSrc);
            $.each($(".childe-ul li a"),function(){
                $(this).removeClass("clicked")
            });
            $(this).addClass("clicked");
        })
    });
    $.each($(".rightTopa"),function(i,n){
        $(this).click(function (){
            var iframSrc="pages/"+$(this).attr("name")+".html";
            $("iframe").attr("src",iframSrc);
            $(this).css("text-decoration","none")
        })
    });
    //首页关闭按钮
    $(".close").each(function(i,n){
        $(this).click(function(){
            $(this).parent().remove();
            if($(".close").length==2){
                $(".close").each(function(j,m){
                    $(this).parent().css("width","48%");
                    $(".close").eq(1).parent().css({"margin-right":"0","width":"49%"});
                    $("#dom").css("margin-top","10%");
                });
            }else{
                $(".close").eq(0).parent().css("width","100%");
                $(".close").eq(0).parent().css("margin-right","0");
                $("#dom").css("margin-top","5%");
            }
            setheight();
        });
    });
    //设置iframe高度
    //function iFrameHeight(){
    //    var ifm= document.getElementById("frame_1");
    //    var subWeb = document.frames ? document.frames["frame_1"].document : ifm.contentDocument;
    //    if(ifm != null && subWeb != null){
    //        ifm.style.height = subWeb.body.scrollHeight+ "px";
    //    }
    //}
    //设置高度
    var sidbarH=$(document).height();
    var partboxH=$(".partbox").height();
    function setheight(){
        //sidbar-nav
        $(".sidbar-nav").css("min-height", sidbarH+150);
        if($(".part2 .pic").css("width")<=180){
            $(".part2 .pic").css("height", $(".part2 .pic").css("width"));
        }
        //首页partbox
        $(".part2").height(partboxH);
        $(".part").height(partboxH);
    }
    setheight();
    $(window).resize(function (){
        setheight();
    });
    //登录
};
