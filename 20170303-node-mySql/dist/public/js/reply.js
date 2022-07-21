$(function(){
    var layer,layedit,hftext;
    layui.use(['layedit','layer'], function(){
        layer=layui.layer;
        layedit = layui.layedit;
        layer.config({
            extend: 'myskin/style.css' //加载您的扩展样式
            ,skin:"layui-ext-yourskin"
        });
        hftext=layedit.build('replay',{
            tool: ['left', 'center', 'right', '|', 'face', 'strong','italic','underline','del' ,'help','unlink']
        }); //建立编辑器
    });
    $('#rehuifu').click(function(){
        var content=layedit.getText(hftext);
        var tzid=$('#r_tzid').text();
        var username=sessionStorage.getItem("username");
        var u_id;
        if(username==""||username==undefined||username==null){
            layer.open({
                titile:'错误'
                ,content:'请登录后再执行这项操作！'
                ,btn:['登录','离开']
                ,yes:function(){
                    mytaget('../login-reg/login.html')
                }
            })
        }else{
        $.ajax({
           url:'uid.do',
            type:'post',
            data:{username:username},
            dataType:"json",
            success:function(data){
                u_id=data[0].u_id;
                $.ajax({
                    url:"r_topic.do",
                    type:"post",
                    data:{tzid:tzid,u_id:u_id,content:content},
                    dataType:"json"
                });
                window.location.reload();
            }
            });
        }
    });
    $(".clu_ltshou").click(function(){
        layer.open({
            title: "论坛守则"
            ,area:'500px'
            ,content:'⑴　违反中华人民共和国宪法和法律法规的言论；<br/>'+
        '⑵　危害国家安全，泄露国家机密，颠覆国家政权，破坏国家统一的言论；<br/>'+
        '⑶　损害国家荣誉和利益的言论；<br/>'+
        '⑷　攻击中华人民共和国政府、中国共产党及其领导人的言论；<br/>'+
        '⑸　散布谣言，扰乱社会秩序，破坏社会稳定的言论；<br/>'+
       '⑹　侮辱、中伤、诽谤恐吓他人、侵害他人合法权益的言论；<br/>'+
        '⑺　宣扬暴力、凶杀、恐怖、色情、淫秽、****的言论；<br/>'+
       '⑻　破坏国家宗教政策，宣扬邪教和封建迷信的的言论；<br/>'+
       ' ⑼　教唆犯罪的资料言论；<br/>'+
        '⑽　含有其它有违国家法律法规的内容。<br/>'+
        '版主发现用户所发布信息明显属于上述所列内容之一的，有权对信息予以删除并视情节轻重对用户实施相应处罚(警告、锁定、扣分)，同时保存有关记录和用户资料并通知管理员备查。用户发现本站出现上述信息时有义务及时通知管理员进行处理。管理员对会员在会员在论坛发表上述言论的，将视情节的严重性，采取警告、扣分、锁定直永久性取消其会员资格。上述规则若与中华人民共和国现行法律、法规不一致，以中华人民共和国现行法律法规为准。'
            ,btn:['确定']
        })
    });
    $("#r_langlu").click(function(){
        mytaget("julebu.html")
    });
    $("#r_shequ").click(function(){
        mytaget("luntan.html")
    });
});
$(function(){
    var tzid=$('#r_tzid').text();
    $.ajax({
        url:'getreply.do',
        type:'get',
        data:{tzid:tzid},
        success:function(data){
            $('#r_content').html("");
            $('#r_content').html(data);
            $('.star').bind('click',function(){
                star(this);
            });
            $('.nostar').bind('click',function(){
               nostar(this);
            });
        }
    });
    var usernaem=sessionStorage.getItem("username");
    if(usernaem==undefined||usernaem==null||usernaem==""){
        $('#hfuname').text('未登录');
    }else{
        $('#hfuname').text(usernaem);
        $.ajax({
            url:'touxiang.do',
            type:"post",
            dataType:'json'
            ,data:{usernaem:usernaem}
            ,success:function(data){
                var pcsrc=data[0].pc_src;
                $('#userimg').attr({src:pcsrc})
            }
        })
    }


});
function mytaget(url){
    loca=window.location;
    loca.href=url;
}
/***
 * 点赞
 * @param obj 节点对象
 */
function star(obj){
    var rcolor=$(obj).attr("class");
    var iscl=rcolor.indexOf('r_color')>0?true:false;
    var nextcolcor=$(obj).next().next().attr("class");
    var isnextcolcor=nextcolcor.indexOf('r_color')>0?true:false;
    var num1=Number($(obj).next().text());
    if(iscl==false){
        $(obj).addClass("r_color");
        num1++;
        $(obj).next().text(num1);
        if(isnextcolcor==true){
            $(obj).next().next().removeClass('r_color');
            var a=Number($(obj).next().next().next().text())-1;
            $(obj).next().next().next().text(a);
        }
  }else if(iscl==true){
        $(obj).removeClass("r_color");
        num1--;
        $(obj).next().text(num1);
    }
}
/***
 * 踩
 * @param obj 节点对象
 */
function nostar(obj){
    var rcolor=$(obj).attr("class");
    var iscl=rcolor.indexOf('r_color')>0?true:false;
    var num1=Number($(obj).next().text());
    var nextcolcor=$(obj).parent().find('.star').attr("class");
    var isnextcolcor=nextcolcor.indexOf('r_color')>0?true:false;
    if(iscl==false){
        $(obj).addClass("r_color");
        num1++;
        $(obj).next().text(num1);
        if(isnextcolcor==true){
            $(obj).parent().find('.star').removeClass('r_color');
            var a=Number($(obj).parent().find('.star').next().text())-1;
            $(obj).parent().find('.star').next().text(a);
        }
    }else if(iscl==true){
        $(obj).removeClass("r_color");
        num1--;
        $(obj).next().text(num1);
    }
}