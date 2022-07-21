
$(function(){

    var sheng = areaData.sheng;
    var $sheng = $('#sheng');
    var $shi = $('#shi');
    var $xian = $('#xian');
    var shiIndex = 0;
    for ( var i=0;i<sheng.length;i++ )
    {
        var $option = $('<option value='+ (i+1) +'>'+ sheng[i] +'</option>');
        $sheng.append( $option );
    }
    $sheng.change(function(){
        shiIndex = this.selectedIndex - 1;
        if ( shiIndex < 0 )
        {

        }
        else
        {
            var shi = areaData.shi['a_'+shiIndex];
            $shi.html('<option value="0">市</option>');
            $xian.html('<option value="0">县</option>');
            for (var i=0;i<shi.length;i++ )
            {
                var $option = $('<option value='+ (i+1) +'>'+ shi[i] +'</option>');
                $shi.append( $option );
            }
        }
    });
    $shi.change(function(){
        var index = this.selectedIndex - 1;
        if ( index < 0 )
        {

        }
        else
        {
            var xian = areaData.xian['a_'+shiIndex+'_'+index];
            $xian.html('<option value="0">县</option>');
            for (var i=0;i<xian.length;i++ )
            {
                var $option = $('<option value='+ (i+1) +'>'+ xian[i] +'</option>');
                $xian.append( $option );
            }
        }
    });
});
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
            setTimeout(ert,940);
            pr_index=0;
        }
    }
}
function ert(){
    $("#pr_main_nav_logo").css("display","block")
}
$(document).mousemove(qwe);




var pr_id2;
var pr_id3;
var headPicUrl;
var user_Id=0;
var btnstay="addData";
$(function(){
    getUserId();
    //showActivity();
    selectAddress();
    showInformation();
});
//$("#btn").click(function(){
//    amendInformation()
//});
$(".chageim-p div button").click(function(){
    bindTel();
});
$("#file").change(function(){
    commitHead();
});
//$("#choice+div+button").click(function(){
//    confirmcommitHead();
//});
//$("#ad1>button").click(function(){
//    if(btnstay=="addData"){
//        address();
//    }else{
//        updateAddress2();
//        btnstay="addData";
//    }
//});

function showInformation(){
    var pr_username=sessionStorage.getItem("username");
    $.ajax({
        url: "/showInformation.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:true,
        success:function(data){
            if(data[0].u_sex==1){
                $(".headp").html("<div><div id='head-pt1'><div><a href='changehead.html'><img src="+data[0].pc_src+" alt=''/></a></div> <div><a href='changehead.html'>修改头像</a></div></div> <div id='head-pt2'><div>用户ID：<span>"+data[0].u_uid+"</span></div><div>昵称：<span class='nickname'>"+data[0].u_nickname+"</span></div> <div>性别：<span>男</span></div><div>手机号：<span>"+data[0].u_tel+"</span></div></div></div><div id='head-pt3'>独白：<span>"+data[0].u_share+"</span></div>");
            }
            if(data[0].u_sex==0){
                $(".headp").html("<div><div id='head-pt1'><div><a href='changehead.html'><img src="+data[0].pc_src+" alt=''/></a></div> <div><a href='changehead.html'>修改头像</a></div></div> <div id='head-pt2'><div>用户ID：<span>"+data[0].u_uid+"</span></div><div>昵称：<span class='nickname'>"+data[0].u_nickname+"</span></div> <div>性别：<span>女</span></div><div>手机号：<span>"+data[0].u_tel+"</span></div></div></div><div id='head-pt3'>独白：<span>"+data[0].u_share+"</span></div>");
            }
        }
    })
}
function amendInformation(){
    var pr_username=sessionStorage.getItem("username");
    var dubai=$("#txt").val();
    var nickname=$(".chageim-p_contral_in2").val();
    if(nickname==""){
        nickname=$("#head-pt2 div:nth-child(2) span").text();
    }
    if(dubai==""){
        dubai=$("#head-pt3 span").text();
    }
    var val1=$("#inputs").is(":checked");
    var val2=$("#input").is(":checked");
    var val;
    if(val1==true){
        val=1;
    }
    if(val2==true){
        val=0;
    }
    $.ajax({
        url: "/amendInformation.do",
        type:"post",
        data:{nickname:nickname,dubai:dubai,val:val,pr_username:pr_username},
        datatype:"json",
        async:true,
        success:function(data){
            showInformation();
        }
    })
}
function bindTel(){
    var u_yanzheng=parseInt(Math.random()*8999+1000);
    var u_tel=$(".chageim-p_contral_in4").text();
    $.ajax({
        url: "/bindTel.do",
        type:"post",
        data:{u_yanzheng:u_yanzheng,u_tel:u_tel},
        datatype:"json",
        success:function(data){
           console.log(3333333);
        }
    });
}
function commitHead(){
        $.ajax({
            url:"/commitHead.do",
            type:"post",
            data:new FormData($("#form1")[0]),
            dataType:"json",
            async:false,
            contentType:false,
            processData:false,          /*序列化data，默认为false，true不会序列化data*/
            success:function(data){
                console.log(data);
                headPicUrl=data.url;
                $("#head-ch>div:nth-child(1)").html("<img src='"+data.url+"'>");
                $("#head-ch div:nth-child(2)").html("<img src='"+data.url+"'>");
            }
        })
}
function confirmcommitHead(){
    var pr_username=sessionStorage.getItem("username");
    $.ajax({
        url: "/confirmcommitHead.do",
        type:"post",
        data:{headPicUrl:headPicUrl,pr_username:pr_username},
        datatype:"json",
        success:function(data){
            showInformation();
        }
    });
}
function address(){
    var shoujian_name=$("#ad1 div:nth-child(2) input").val();
    var shoujian_detailAddress=$("#ad2").val();
    var shoujian_tel=$("#ad1 div:nth-child(5) input").val();
    var sheng=$("#sheng option:selected").text();
    var shi= $("#shi option:selected").text();
    var xian=$("#xian option:selected").text();
    var prAddress=sheng+shi+xian+shoujian_detailAddress;
    if(sheng=="北京市"||sheng=="天津市"||sheng=="上海市"||sheng=="重庆市"){
        prAddress=sheng+xian+shoujian_detailAddress;
    }
    if(shoujian_name!=""&&shoujian_detailAddress!=""&&shoujian_tel!=""&&sheng!=""&&shi!=""&&xian!=""){
        $.ajax({
            url: "/address.do",
            type:"post",
            data:{shoujian_name:shoujian_name,shoujian_tel:shoujian_tel,prAddress:prAddress,user_Id:user_Id},
            datatype:"json",
            async:true,
            success:function(data){
                selectAddress();
            }
        })
    }else{
        if(shoujian_name==""){
            $("#ad1 div:nth-child(2) input+span").css("display","inline-block");
        }else{
            $("#ad1 div:nth-child(2) input+span").css("display","none");
        }
        if(shoujian_detailAddress==""){
            $("#span99").css("display","inline-block");
        }else{
            $("#span99").css("display","none");
        }
        if(shoujian_tel==""){
            $("#span100").css("display","inline-block");
        }else{
            $("#span100").css("display","none");
        }
        if(prAddress=="省市县"){
            $(".small_arti span").css("display","inline-block");
        }else{
            $(".small_arti span").css("display","none");
        }
    }
}
function getUserId(){
    var pr_username=sessionStorage.getItem("username");
    $.ajax({
        url: "/getUserId.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:false,
        success:function(data){
            user_Id=data[0].u_id;
        }
    })
}
function selectAddress(){
    var aMytb=document.getElementsByClassName("mytb");
    $.ajax({
        url: "/selectAddress.do",
        type:"post",
        data:{user_Id:user_Id},
        datatype:"json",
        async:true,
        success:function(data){
            aMytb[0].innerHTML="<tr><th>收货人</th><th>收货地址</th><th>手机号码</th><th>操作</th></tr>";
            for(var i=0;i<data.length;i++){
                aMytb[0].innerHTML=aMytb[0].innerHTML+"<tr><td class='shouhuorenIn'>"+data[i].pr_personal+"</td><td class='shouhuoAddress'>"+data[i].pr_address+"</td> <td class='shouhuoTel'>"+data[i].pr_tel+"</td><td><span class='change-1' onclick='updateAddress(this)' attr="+data[i].pr_id+">修改</span> <span class='delate-1' onclick='deleteAddress(this)' attr="+data[i].pr_id+">删除</span></td> </tr>";
            }
        }
    })
}
function updateAddress(obj){
    window.scrollTo(0,0);
    var table_user=$(obj).parent().parent().find(".shouhuorenIn").text();
    var table_address=$(obj).parent().parent().find(".shouhuoAddress").text();
    var table_tel=$(obj).parent().parent().find(".shouhuoTel").text();
    $("#ad1 div:nth-child(2) input").val(table_user);
    $("#ad2").val(table_address);
    $("#ad1 div:nth-child(5) input").val(table_tel);
    btnstay="updateData";
    pr_id2=parseInt($(obj).attr("attr"));
}
function updateAddress2(){
    var shoujian_name=$("#ad1 div:nth-child(2) input").val();
    var shoujian_detailAddress=$("#ad2").val();
    var shoujian_tel=$("#ad1 div:nth-child(5) input").val();
    var sheng=$("#sheng option:selected").text();
    var shi= $("#shi option:selected").text();
    var xian=$("#xian option:selected").text();
    var prAddress=sheng+shi+xian+shoujian_detailAddress;
    if(sheng=="北京市"||sheng=="天津市"||sheng=="上海市"||sheng=="重庆市"){
        prAddress=sheng+xian+shoujian_detailAddress;
    }
    if(shoujian_name!=""&&shoujian_detailAddress!=""&&shoujian_tel!=""&&sheng!=""&&shi!=""&&xian!=""){
        $.ajax({
            url: "/updateAddress.do",
            type:"post",
            data:{pr_id2:pr_id2,shoujian_name:shoujian_name,shoujian_tel:shoujian_tel,prAddress:prAddress,user_Id:user_Id},
            datatype:"json",
            async:true,
            success:function(data){
                selectAddress();
            }
        })
    }else{
        if(shoujian_name==""){
            $("#ad1 div:nth-child(2) input+span").css("display","inline-block");
        }else{
            $("#ad1 div:nth-child(2) input+span").css("display","none");
        }
        if(shoujian_detailAddress==""){
            $("#span99").css("display","inline-block");
        }else{
            $("#span99").css("display","none");
        }
        if(shoujian_tel==""){
            $("#span100").css("display","inline-block");
        }else{
            $("#span100").css("display","none");
        }
        if(prAddress=="省市县"){
            $(".small_arti span").css("display","inline-block");
        }else{
            $(".small_arti span").css("display","none");
        }
    }
}
function deleteAddress(obj){
    pr_id3=parseInt($(obj).attr("attr"));
    console.log(pr_id3);
    $.ajax({
        url: "/deleteAddress.do",
        type:"post",
        data:{pr_id3:pr_id3},
        datatype:"json",
        async:true,
        success:function(data){
            selectAddress();
        }
    })
}

//$(function(){
//    var indentid=sessionStorage.getItem("ind_Num");
//    $.ajax({
//        url:'/indentdetails1.do',
//        type:'post',
//        data:{indentid:indentid},
//        success:function(data){
//            $('.o-main').append(data);
//            uname=$('#o_uname').text();
//            $.ajax({
//                url:'/indentdetails2.do',
//                type:'post',
//                data:{uname:uname},
//                success:function(data){
//                    $('.o-main').append(data);
//                    var inid=$('#o_inid').text()
//                    $.ajax({
//                        url:'/indentdetails3.do',
//                        type:'post',
//                        data:{inid:inid},
//                        success:function(data){
//                            $('.o-main').append(data);
//                        }
//                    })
//                }
//            })
//        }
//    })
//});


//window.onload=function(){
//    //showActivity();
//};

//function showActivity(){
//    var oAct=document.getElementById("act-p9");
//    let username=sessionStorage.getItem("username");
//    $.ajax({
//        url: "/showActivity.do",
//        type: "post",
//        data: {username:username},
//        datytype:'json',
//        success:function(data){
//            for(var j=0;j<=data.length;j++){
//                var myTime=data[j].act_starapply;
//                var ab=myTime.substring(0,10);
//                oAct.innerHTML=oAct.innerHTML+"<div class='act-p1'><div><img src='../../images/personal/u=32061.jpg' class='img-p' alt=''/></div> <div class='act-pp'> <img src='../../images/img-logo.png' alt=''/> <div>狼途俱乐部</div> </div> <div class='act-ppp'> <div>主题：<a href=''>"+data[j].act_name+"</a></div> <div>时间：<a href=''>"+ab+"</a></div> </div> </div> <div></div>";
//            }
//        }
//    })
//}












$(function(){
    var layer;
    layui.use(['layer'], function(){
        layer=layui.layer;
        layer.config({
            extend: 'myskin/style.css' //加载您的扩展样式
            ,skin:"layui-ext-yourskin"
        });
    });
    $('#btn').click(function(){
        layer.open({
            title:'保存设置'
            ,content:'您确定修改吗？'
            ,btn:['确定','取消']
            ,yes:function(index){

                var phone = document.getElementById('testphone2').value;
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
                    layer.open({
                        title:'提示'
                        ,content:'请填写正确的手机号？'
                        ,btn:['确定']
                    });
                    return false;
                }
                amendInformation();
                layer.close(index)
            }
        })
    });
    $('#new').click(function(){
        layer.open({
            title:'更新头像'
            ,content:'您确定修改吗？'
            ,btn:['确定','取消']
            ,yes:function(index){
                confirmcommitHead();
                layer.close(index);
                window.location.href="information.html";
            }
        })
    })
});

$("#testphone2").keydown(function(){
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;
});
$("#checkEmail").click(function(){
    console.log(5453454)
    var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var em=document.getElementById("email").value;

    if(filter.test(em)){
        return true;
    }
    else{
        layer.open({
            title:'邮箱验证'
            ,content:'请输入正确的邮箱'
            ,btn:['确定']
            ,yes:function(index){
                layer.close(index)
            }
        });
        return false;
    }
});



$(function(){
    var layer;
    layui.use(['layer'], function(){
        layer=layui.layer;
        layer.config({
            extend: 'myskin/style.css' //加载您的扩展样式
            ,skin:"layui-ext-yourskin"
        });
    });
    $('#baocun').click(function(){
        layer.open({
            title:'保存地址'
            ,content:'您确定保存吗？'
            ,btn:['确定','取消']
            ,yes:function(index){
                layer.close(index);
                var phone = document.getElementById('testphone').value;
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
                    layer.open({
                        title:'提示'
                        ,content:'请填写正确的手机号？'
                        ,btn:['确定']
                    });
                    return false;
                }
                if(btnstay=="addData"){
                    address();
                    console.log(222)
                }else{
                    updateAddress2();
                    btnstay="addData";
                    console.log(333);
                }

            }
        })
    })
});
$("#testphone").keydown(function(){
    console.log(53453454)
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;

})