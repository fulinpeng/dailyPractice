/**
 * Created by Administrator on 2017/2/24 0024.
 */
var layer;
layui.use(['layer'], function(){
    layer=layui.layer;
    layer.config({
        extend: 'myskin/style.css' //加载您的扩展样式
        ,skin:"layui-ext-yourskin"
    });
});

window.onload=function(){
    getmadeparts();
};
function getmadeparts(){
    gettyre("胎",function(data){
        var smdiv=$(".sm-pic").children(".sm-imgl").children(".img-responsive");
        $.each(smdiv,function(i,n){
            $.each(data,function(j,m){
                if(j==i){
                    var newstr=m.pc_src+"/"+m.pc_name;
                    n.src=newstr;
                }
            })
        });
    });
    gettyre("车架",function(data){
        var smdiv=$(".sm-pict").children(".sm-imgl").children(".img-responsive");
        $.each(smdiv,function(i,n){
            $.each(data,function(j,m){
                if(j==i){
                    var newstr=m.pc_src+"/"+m.pc_name;
                    n.src=newstr;
                }
            })
        });
    });
    gettyre("前叉",function(data){
        var smdiv=$(".sm-picth").children(".sm-imgl").children(".img-responsive");
        $.each(smdiv,function(i,n){
            $.each(data,function(j,m){
                if(j==i){
                    var newstr=m.pc_src+"/"+m.pc_name;
                    n.src=newstr;
                }
            })
        });
    });
    gettyre("轮组",function(data){
        var smdiv=$(".sm-picf").children(".sm-imgl").children(".img-responsive");
        $.each(smdiv,function(i,n){
            $.each(data,function(j,m){
                if(j==i){
                    var newstr=m.pc_src+"/"+m.pc_name;
                    n.src=newstr;
                    console.log(newstr)
                }
            })
        });
    });
}
function gettyre(str,fn){
    $.ajax({
        type:"post",
        async:false,
        url:"getallmadeparts.do",
        data:{str:str},
        success:function(data){
            fn(data)
        }
    });
}
var part1=0;
var part2=0;
var part2=0;
var part4=0;
function submitdiy(){
    var lts=$(".sm-s1").children("img").attr("src");
    //var ltc=$(".sm-c1").text();
    var cjs=$(".sm-s2").children("img").attr("src");
    //var cjc=$(".sm-c2").text();
    var qcs=$(".sm-s3").children("img").attr("src");
    //var qcc=$(".sm-c3").text();
    var lzs=$(".sm-s4").children("img").attr("src");
    //var lzc=$(".sm-c4").text();
    var userid=sessionStorage.getItem("username");
    if(lts==undefined||cjs==undefined||
        qcs==undefined||lzs==undefined){
        layer.alert("请选择核心配件");
    }
    if(lts!=undefined&&cjs!=undefined&&
        qcs!=undefined&&lzs!=undefined){
        if(userid==null||userid==undefined){
            window.location.href="../login-reg/login.html";
        }else{
            $.ajax({
                type:"post",
                url:"getpartsid.do",
                async:false,
                data:{lts:lts,cjs:cjs,qcs:qcs,lzs:lzs},
                success:function(data){
                    part1=data[0].a_id;
                    part2=data[1].a_id;
                    part3=data[2].a_id;
                    part4=data[3].a_id;
                    inserttable(userid);
                }
            });
        }
    }

}
function inserttable(a){
    $.ajax({
        type:"post",
        async:false,
        url:"madethebicycle.do",
        data:{userid:a,part1:part1,part2:part2,part3:part3,part4:part4},
        success:function(){
            window.location.href="../../pages/personal/pr_shoppingCar.html";
        }
    });
}





$(".sm-bl").click(function(){
    $(this).siblings().css("border","1px solid rgba(67, 68, 73, 0.24)");
    $(this).css("border","1px solid #434449");
});
$(".sm-white").click(function(){
    $(this).siblings().css("border","1px solid rgba(67, 68, 73, 0.24)");
    $(this).css("border","1px solid #434449");
    //var newclass= $(this).attr("data-color");
    //var newstr=$(this).text();
    //$(newclass).text(newstr)
});
$(".sm-imgl").click(function(){
    $(this).siblings().css("border","1px solid transparent");
    $(this).css("border","1px solid #434449");
    var newclass= $(this).attr("data-img");
    var newsrc=$(this).children("img").attr("src");
    $(newclass).html("<img class='img-responsive' src="+newsrc+">");
});
$(".sm-bgdiv").mouseover(function(){
    $(this).children(".sm-artic").css("opacity","1");
});
$(".sm-bgdiv").mouseleave(function(){
    $(this).children(".sm-artic").css("opacity","0");
});
setInterval(smchangeheight,100);
function smchangeheight(){
    var newh=$(".sm-bgdiv").css("height");
    $(".sm-whitediv").css("height",newh);
}