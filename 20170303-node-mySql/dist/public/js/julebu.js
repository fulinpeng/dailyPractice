$(function(){
    $(".j_line1").css("width","300px")
    $(".j_line2").css("height","300px")
    $(".j_line3").css("height","300px")
    $(".j_line4").css("width","300px")
    $(".j_title").css({"margin-top":"250px","opacity":1})
    $("#j_scroll").click(function(){
        $("html,body").animate({scrollTop: $("#j_sekuai").offset().top}, 1000);
    });
    layer.config({
        extend: 'myskin/style.css' //加载您的扩展样式
        ,skin:"layui-ext-yourskin"
    });
    $(".j_hdbtn").click(function(){
        var hdname=$(this).parent().parent().next().text();
        var actid;
        $.ajax({
            url:"j_hdxq.do",
            type:"post",
            data:{hdname:hdname},
            dataType:"json",
            success:function(data){
                actid=data[0].act_id;
                layer.open({
                    title:'活动详情'
                    ,content:'<p>活动名称：'+data[0].act_name+'</p>'
                    +'<p>开始时间：'+data[0].act_starTime.split('T')[0]+'</p>'
                    +'<p>结束时间：'+data[0].act_endTime.split('T')[0]+'</p>'
                    +'<p>活动详情:'+data[0].act_particulars+'</p>'
                    +'<p>联系电话：'+data[0].act_tel+'</p>'
                    +'<p>报名结束时间：'+data[0].act_endapply.split('T')[0]+'</p>'
                    ,btn:['报名参加','离开']
                    ,yes:function(){
                            var username=sessionStorage.getItem('username');
                            var uid;
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
                                layer.open({
                                        title:'报名参加'
                                        ,content:'点击确定后我们会将您的信息发送给主办方，确定参加吗？'
                                        ,btn:['确定','取消']
                                        ,yes:function(){
                                            $.ajax({
                                                url:'uid.do',
                                                type:'post',
                                                dataType:'json',
                                                data:{username:username},
                                                success:function(data){
                                                    uid=data[0].u_id;
                                                    $.ajax({
                                                        url:'isRepeat.do',
                                                        type:'post',
                                                        data:{uid:uid,actid:actid},
                                                        success:function(data){
                                                            if(data=="0"){
                                                                $.ajax({
                                                                    url:'submitinformation.do',
                                                                    type:'post',
                                                                    dataType:'json',
                                                                    data:{uid:uid,actid:actid}
                                                                });
                                                                layer.alert('您的信息已经提交给了主办方，稍后工作人员会与您联系！')
                                                            }else if(data="1"){
                                                                layer.alert('请不要重复参加一项活动！')
                                                            }
                                                        }
                                                    });



                                                }
                                            });

                                        }
                                    })
                            }
                    }
                    ,area:['500px','500px']
                  }
            )}
        });


    });
    $(".j_sqlink").click(function(){
        sqlinktaget(this,"luntan.html");
    });
    $('.j_qukuai').css('margin-top','-20px');
    $(window).scroll(function(){
        if($(document).scrollTop()>250){
            $('.j_text3').css({"margin-top":"10px","opacity":1});
        }
    })
});
$(function(){
    loca=window.location;
});
function mytaget(url){
    loca.href=url;
}
/***
 * 带session值的社区页面跳转
 * @param obj 点击对象
 * @param url 链接
 */
function sqlinktaget(obj,url){
    var text=$(obj).find('.j_text8').text();
    console.log(text);
    sessionStorage.setItem("tzlb",text);//设置session值
    loca.href=url;
}