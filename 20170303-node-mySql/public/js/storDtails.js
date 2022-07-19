/**
 * Created by Administrator on 2017/2/25.
 */
/*详情页面下拉框颜色切换*/
$("#color1").change(function(){
    var opt=$(this).val();
    if(opt=="蓝色"){
        $(".goods1").attr("src","../../images/store/bike1-2.jpg")
    }
    else if(opt=="黑色"){
        $(".goods1").attr("src","../../images/store/bike1-1.jpg")
    }
});
/*详情页面下拉框颜色切换*/
$("#color2").change(function(){
    var opt=$(this).val();
    if(opt=="蓝色"){
        $(".goods2").attr("src","../../images/store/bike2-2.jpg")

    }
    else if(opt=="黑色"){
        $(".goods2").attr("src","../../images/store/bike2-1.jpg")
    }
});
/*图2放大镜*/
function Zoom(imgbox1,hoverbox1,l,t,x,y,h_w,h_h,showbox1){
    var moveX =x-l-(h_w/2);
    //鼠标区域距离
    var moveY =y-t-(h_h/2);
    //鼠标区域距离
    if(moveX<0){moveX=0}
    if(moveY<0){moveY=0}
    if(moveX>imgbox1.width()-h_w){moveX=imgbox1.width()-h_w}
    if(moveY>imgbox1.height()-h_h){moveY=imgbox1.height()-h_h}
    //判断鼠标使其不跑出图片框
    var zoomX =showbox1.width()/imgbox1.width();
    //求图片比例
    var zoomY =showbox1.height()/imgbox1.height();
    showbox1.css({left:-(moveX*zoomX),top:-(moveY*zoomY)});
    hoverbox1.css({left:moveX,top:moveY});
    //确定位置
}
function Zoomhover(imgbox1,hoverbox1,showbox1){
    var l =imgbox1.offset().left;
    var t = imgbox1.offset().top;
    var w =hoverbox1.width();
    var h = hoverbox1.height();
    var time;
    $(".probox1 img,.hoverbox1").mouseover(function(e){
        var x=e.pageX;
        var y=e.pageY;
        $(".hoverbox1,.showbox1").show();
        hoverbox1.css("opacity","0.3");
        time =setTimeout(function(){Zoom(imgbox1,hoverbox1,l,t,x,y,w,h,showbox1)},1)
    }).mousemove(function(e){
        var x=e.pageX;
        var y=e.pageY;
        time =setTimeout(function(){Zoom(imgbox1,hoverbox1,l,t,x,y,w,h,showbox1)},1)
    }).mouseout(function(){
        showbox1.parent().hide();
        hoverbox1.hide();
    })
}
$(function(){
    Zoomhover($(".probox1 img"),$(".hoverbox1"),$(".showbox1 img"));
});
/*装备推荐展示部分随机数产生*/
$(function(){
    var rannum=Math.random()*10;//随机数
    $.ajax({
        url:'s_shangping.do',
        type:'post',
        data:{rannum:rannum},
        success:function(data){
            $('.clear').append(data);
        }
    })
});
/*配件携带数据到购物车*/
$(".btn-details-mai").click(function(){
    //获取session中的用户名
    var username=sessionStorage.getItem("username");
    if(username==null||username==undefined){
        window.location.href="/pages/login-reg/login.html"
    }else{
        var t_b_b_id=$("#bikeid").text().trim();
        var newnumber=t_b_b_id.split("：");
        var newn=newnumber[1];
        var in_bynumber=parseInt($("#bike_number").val());
        $.ajax({
            url:'storebuybike.do',
            type:'post',
            dataType:"JSON",
            data:{username:username,t_b_b_id:newn,in_bynumber:in_bynumber},
            success:function(data){
                window.location.href="/pages/personal/pr_shoppingCar.html";
            }
        })
    }
});
$('.btn-details-mai1').click(function(){console.log(1111111)
    var username=sessionStorage.getItem("username");
    if(username==null||username==undefined){
        window.location.href="/pages/login-reg/login.html"
    }else{
        var bikeid=$('#bikeid').text().trim();
        var bikenumber=bikeid.split("：");
        var bikenum=bikenumber[1];
        var in_bynumber=parseInt($("#bike_number").val());
        $.ajax({
            url:'storeburyparts.do',
            type:'post',
            dataType:'json',
            data:{username:username,bikenum:bikenum,in_bynumber:in_bynumber},
            success:function(data){
                window.location.href="/pages/personal/pr_shoppingCar.html"
            }
        })
    }
});
