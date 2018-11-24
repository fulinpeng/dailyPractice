var pr_index=0;
function qwe(e){
    var et=e||window.event;
    if(et.pageX<100){
        $(".pr_main_nav_2 div").css("margin-left","100px");
        //$(".pr_main_nav_2").css("background","rgba(242,96,49,0.5)");
        //$(".pr_main_nav_2").css("background","rgba(255,255,255,0.5)");
        $("#pr_main_nav_logo").css("display","none");
        pr_index=1;
    }
    if(et.pageX>100){
        //$(".pr_main_nav_2").css("background","rgba(255,255,255,1)");
        $(".pr_main_nav_2 div").css("margin-left","0px");
        if(pr_index==1){
            setTimeout(ert,940);
            pr_index=0;
        }
    }
    //if($(".pr_main_nav_2").css("left")<=5){
    //    $(".pr_main_nav_2").css("background","rgba(242,96,49,0.5)");
    //}
    //if(et.pageX<=670){
    //    $("#pr_main_nav_log").css("background","yellow");
    //}
    //if(et.pageX>670){
    //    $("#pr_main_nav_log").css("background","rgba(255,0,0,0.8)");
    //}
}
function ert(){
    $("#pr_main_nav_logo").css("display","block")
}
//function wer(){
//    if( $(document).scrollTop()>250 ){
//        $(".pr_main_nav_2 div").css("margin-left","100px");
//        $(".pr_main_nav_2").css("background","rgba(242,96,49,0.5)");
//    }
//    if( $(document).scrollTop()<=250&&$(document).scrollTop()>0){
//        $(".pr_main_nav_2 div").css("margin-left","0px");
//        $(".pr_main_nav_2").css("background","#F26031");
//        $("#pr_main_nav_log").css("left","0");
//    }
//}
//setInterval(wer,30);
$(document).mousemove(qwe);

$(function(){
    LanjieCenter();
});
function LanjieCenter(){
    var pr_username=sessionStorage.getItem("username");
    console.log(pr_username);
    if(pr_username==undefined){
        window.location.href="../login-reg/login.html";
    }
}




