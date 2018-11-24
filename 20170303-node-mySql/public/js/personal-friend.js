var pr_index=0;
function qwe(e){
    var et=e||window.event;
    if(et.pageX<100){
        $(".pr_main_nav_2 div").css("margin-left","100px");
        $("#pr_main_nav_logo").css("display","none");
        pr_index=1;
    }
    if(et.pageX>100){
        $(".pr_main_nav_2 div").css("margin-left","0px");
        if(pr_index==1){
            setTimeout(ert,1000);
            pr_index=0;
        }
    }
}
function ert(){
    $("#pr_main_nav_logo").css("display","block")
}
$(document).mousemove(qwe);













