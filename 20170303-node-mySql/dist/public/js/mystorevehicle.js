/**
 * Created by Administrator on 2017/2/23 0023.
 */
"use strict";
var vcurrentpage=1;
var vcount;
window.onload=function(){
    getallbicycle();
};
function vgotop(){
    $("body").animate({scrollTop:"400px"});
}
getallbicyclecount();
function getallbicycle(){
    $.ajax({
        type:"post",
        url:"getallbicycle.do",
        async:true,
        data:{currentpage:vcurrentpage},
        success:function(data){
            $(".sp-p1").html("");
            $(".sp-p2").html("");
            $(".sp-p3").html("");
            $(".sp-p4").html("");
            $(".sp-p5").html("");
            $(".sp-p6").html("");
            $(".sp-p7").html("");
            $.each(data,function(i,n){
                var newclass=".sp-p"+parseInt(i+1);
                var pi="p"+parseInt(i+1);
                pi=$(newclass);
                pi.html("");
                var newstr=n.pc_src+"/"+n.pc_name;
                pi.html("<div class='sp-sixtop'></div><div class='sp-sixmid'>&nbsp;<img class='img-responsive' src="+newstr+" alt=''/><p class='sv-pup'>"+n.b_name+"</p> <p class='sv-pup'>￥:"+n.b_price+"RMB</p><div class='sv-btngroup'> <a href="+"getbikeMessage2.do?name="+n.pc_name+"&&src="+n.pc_src+"><button class='ltbtn'>查看详情</button></a> </div> </div> <div class='sp-sixbottom'></div>");
            });
        }
    });
}
function getallbicyclecount(){
    $.ajax({
        type:"post",
        async:true,
        url:"getallbicyclecount.do",
        success:function(data){
            vcount=data;
        }
    })
}
function vprepage(){
    if(vcurrentpage>1){
        vcurrentpage--;
        getallbicycle();
        vgotop();
    }
}
function vnextpage(){
    if(vcurrentpage<vcount){
        vcurrentpage++;
        getallbicycle();
        vgotop();
    }
}




window.onscroll=function(){
    var top=$(document).scrollTop();
    if(top>192){
        $(".left").css("margin-left","0%");
        $(".right").css("margin-left","0%");
    }
    if(top>600){
        $(".mleft").css("margin-left","0%");
        $(".mright").css("margin-left","0%");
        $(".mmiddle").css("margin-left","0%");
        $(".mleft").css("margin-top","0%");
        $(".mright").css("margin-top","0%");
        $(".mmiddle").css("margin-top","0%");
    }
    if(top>1092){
        $(".leftth").css("margin-left","0%");
        $(".rightth").css("margin-left","0%");
    }
};