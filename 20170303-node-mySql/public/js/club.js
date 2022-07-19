$(function(){
    $(".clu_text2").click(function(){ //改变社区热点内容与样式
        $(".clu_textactive").removeClass("clu_textactive");
        $(this).addClass("clu_textactive")
    });
    $("#dqhd").click(function(){
        mytaget("activepage.html")
    });//跳转至当前活动页面
    $("#wqhd").click(function(){
        mytaget("activepage.html")
    });//跳转至往期活动页面
    $(".clu_reply").click(function(){
        mytaget("reply.html")
    });//跳转至回复页面
    $("#sqrd").click(function(){
        mytaget("forum.html")
    });//跳转至论坛页面
    $("#jchd").click(function(){
        mytaget("activepage.html")
    });//跳转至活动页面
    $(".clu_ap1img").click(function(){
        mytaget("activeconent.html")
    });//跳转至活动详情页面
    $(".clu_aph").click(function(){
        mytaget("activeconent.html")
    });//跳转至活动详情页面

});

/***
 * 跳转页面
 * @param url 链接
 */
    function mytaget(url){
        loca=window.location;
        loca.href=url;
    }