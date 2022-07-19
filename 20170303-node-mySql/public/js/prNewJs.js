/**
 * Created by Administrator on 2017/2/27.
 */
window.onload=function(){console.log(1111)
    showActivity();
};

function showActivity(){
    var oAct=$("#act-p9").get(0);
    var username=sessionStorage.getItem("username");
    $.ajax({
        url: "/showActivity.do",
        type: "post",
        data: {username:username},
        datytype:'json',
        success:function(data){
            for(var j=0;j<=data.length;j++){
                var myTime=data[j].act_starapply;
                var ab=myTime.substring(0,10);
                var uuu=Math.floor((Math.random()*2)+1);
                if(uuu==1){
                    oAct.innerHTML=oAct.innerHTML+"<div class='act-p1'><div><img src='../../images/personal/pic3.jpg' class='img-p' alt=''/></div> <div class='act-pp'> <img src='../../images/img-logo.png' alt=''/> <div>狼途俱乐部</div> </div> <div class='act-ppp'> <div>主题：<a href=''>"+data[j].act_name+"</a></div> <div>时间：<a href=''>"+ab+"</a></div> </div> </div> <div></div>";
                }else{
                    oAct.innerHTML=oAct.innerHTML+"<div class='act-p1'><div><img src='../../images/personal/pic5.jpg' class='img-p' alt=''/></div> <div class='act-pp'> <img src='../../images/img-logo.png' alt=''/> <div>狼途俱乐部</div> </div> <div class='act-ppp'> <div>主题：<a href=''>"+data[j].act_name+"</a></div> <div>时间：<a href=''>"+ab+"</a></div> </div> </div> <div></div>";

                }
            }
        }
    })
}