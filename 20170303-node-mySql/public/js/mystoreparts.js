/**
 * Created by Administrator on 2017/2/23 0023.
 */
var currentpage=1;
var count=0;
window.onload=function(){
    getallparts();
};
function getallparts(){
    $.ajax({
        type:"post",
        url:"getallparts.do",
        data:{cpage:currentpage},
        async:true,
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
                    pi.html("<div class='sp-sixtop'></div><div class='sp-sixmid'>&nbsp;<img class='img-responsive' src="+newstr+" alt=''/><p class='sv-pup'>"+n.a_name+"</p> <p class='sv-pup'>￥:"+n.a_price+"RMB</p><div class='sv-btngroup'> <a href="+"getStorDetails.do?name="+n.pc_name+"&&src="+n.pc_src+"><button class='ltbtn'>查看详情</button></a> </div> </div> <div class='sp-sixbottom'></div>");
                });
        }
    });
}
getcount();
function getcount(){
    $.ajax({
        type:"post",
        async:false,
        url:"getallcount.do",
        success:function(data){
            count=data;
        }
    });
}
function prepage(){
    if(currentpage>1){
        currentpage--;
        getallparts();
        gotop();
    }
}
function gotop(){
    $("body").animate({scrollTop:"400px"});
}
function nextpage(){
    getcount();
    if(currentpage<=count-1){
        currentpage++;
        getallparts();
        gotop();
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
//$(".ltbtn").click(function(){
//    console.log("11111111111");
//    var img=$(this).parent("button").parent("div").parent("div").children("img")
//    console.log(img.attr("src"))
//});