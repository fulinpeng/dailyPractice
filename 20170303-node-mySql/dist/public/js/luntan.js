$(function(){
    loadpage();
});
$(function(){
    var pagenumber;
    var text=$('.l_active').text().split(" ")[1];
    $('.l_ryre').click(function(){
        mytaget("reply.html")
    });
    var layer;
    var layedit,laypage;
    $('.l_new').click(function(){
        var fhindex;
        layer.open({
            title: '新主题'
            ,content:'<input type="text" id="tztitle" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">    ' +
            '<textarea id="newtopic" style="display: none;" maxlength="500"></textarea>'
            ,btn:['提交','取消']
            ,offset:['100px','400px']
            ,yes:function(index,layero){
               var tzlb=$('.l_active').text().split(" ")[1];
               var username=sessionStorage.getItem("username");
               var tzname= $('#tztitle').val();
               var tzcontent=layedit.getText(fhindex);
               var u_id;
                if(username==undefined||username==null||username==""){
                    layer.open({
                        titile:'信息'
                        ,content:'您尚未登录，无法发布新的主题，是否前往登录界面。'
                        ,btn:['确定','离开']
                        ,yes:function(index){
                            mytaget("../login-reg/login.html");
                            layer.close(index);
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
                                url:"l_newTopic.do",
                                type:"post",
                                data:{tzlb:tzlb,u_id:u_id,tzname:tzname,tzcontent:tzcontent},
                                dataType:"json"
                            });
                            window.location.reload();

                        }
                    });
                }
                layer.close(index)
            }
        });
        fhindex=layedit.build('newtopic',{
            tool: ['left', 'center', 'right', '|', 'face', 'strong','italic','underline','del' ,'help','unlink']
        }); //建立编辑器
    });
    $('.l_menu li').click(function(){
        $('.l_menu li').removeClass('l_active');
        $(this).addClass('l_active');
        var text=$('.l_active').text().split(" ")[1];
        sessionStorage.setItem('tzlb',text);
        $('.l_text1').text(text);
        $.ajax({
            url:'l_tzrefesh.do',
            type:'get',
            data:'&tzlb='+text,
            success:function(data){
                $('.l_content').html("");
                $('.l_content').html(data);
                $('#tzsum').text($('.l_content>div').length);
                sumreply();
                window.location.reload();
            }
        });
    });
    $.ajax({
        url:'pagenumer.do',
        type:'post',
        data:{text:text},
        dataType:'json',
        success:function(data){
            pagenumber=data[0].number;
            pagenumber=Math.ceil(pagenumber/10);
        }
    });
    layui.use(['layedit','layer','laypage'], function(){
        layer=layui.layer;
        layedit = layui.layedit;
        laypage=layui.laypage;
        layer.config({
            extend: 'myskin/style.css' //加载您的扩展样式
            ,skin:"layui-ext-yourskin"
        });
        laypage({
            cont:'page'
            ,pages:pagenumber
            ,groups:5
            ,skin:'#f26031'
            ,skip:true
            ,jump:function(obj,first){
                var curr = obj.curr;
                var text=sessionStorage.getItem('tzlb');
                $.ajax({
                    url:'l_tzrefesh.do',
                    type:'get',
                    data:{tzlb:text,page:curr},
                    success:function(data){
                        $('.l_content').html("");
                        $('.l_content').html(data);
                        $('#tzsum').text($('.l_content>div').length);
                        sumreply();
                        //window.location.reload();
                    }
                })
            }
        })
    });
});
/***
 * 页面跳转
 * @param url
 */
function mytaget(url){
    loca=window.location;
    loca.href=url;
}
/***
 * 动态加载页面
 */
function loadpage(){
    var text1=sessionStorage.getItem('tzlb');//获取session值
    $('.l_menu li').removeClass('l_active');
    for(var j=0;j<3;j++){
        var a=$('.l_menu li')[j].innerText;
        if(a.split(' ')[1]==text1){
            $('.l_menu li')[j].className="l_active"
        }
    }
    var b=$('.l_active').text().split(" ")[1];
    $('.l_text1').text(text1);
    $.ajax({
        url:'l_tzrefesh.do',
        type:'get',
        data:'&tzlb='+text1,
        success:function(data){
            $('.l_content').html("");
            $('.l_content').html(data);
            $('#tzsum').text($('.l_content>div').length);
            var nowdate=new Date().toLocaleDateString();
            $('#l_date').text(nowdate);
            sumreply();
        }
    })
}
/***
 * 刷新回复总数
 */
function sumreply(){
    $('.l_reply').each(function(i){
        var tzname=$(this).find('.l_ryre a').text();
        var mythis=$(this);
        $.ajax({
            url:'sumreply.do',
            type:'post',
            data:{tzname:tzname},
            success:function(data){
                mythis.find('.l_rynu').html( '<div class="iconfont">&#xe654;&emsp;'+data[0].sum+'</div>')
            }
        })
    })
}
function fenye(){

}