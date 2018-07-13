/**
 * Created by sunsharp on 2017/8/10.
 */

var username='',
    token='';
if (sessionStorage.getItem('token')) {
    username=sessionStorage.getItem('username');
    token=sessionStorage.getItem('token');
} else {
    username=cookie.get('username');
    token=cookie.get('token');
}
username=username!=='undefined'?username.substring(1,username.length-1):'';
token=token!=='undefined'?token.substring(1,token.length-1):'';


if (!token) {
    window.location.href='../pc/home.html'
}
window.onload=function () {
    $("body").css({'height':$(window).height()+'px'});
    var area=[];
    var type=mobileType=='pc'?'0':'1';
    var timer=null;
    var currentRollDom=null;

    //用户名
    $('.userinfo span').html(username);

    //退出
    $('.outbtn').click(function (event) {
        event.stopPropagation();
        if ($(this).attr('isshow')=='false') {
            $('.outbtn .sureout').css({'display':'block'});
            $(this).attr('isshow','true');
        } else {
            $('.outbtn .sureout').css({'display':'none'});
            $(this).attr('isshow','false');
        }
    });
    $('.sureout span.yes').click(function () {
        sessionStorage.clear();
        cookie.clear();
        window.location.href='../pc/home.html'
    });

    //请求左侧数据
    function successLeftData(data) {
        if (data.code===0){
            area=data.data;
            showLeft();
        } else if (data.code==9) {
            sessionStorage.clear();
            cookie.clear();
            window.location.href='../pc/home.html'
        }
    }
    var areaurl=api.area;
    var areadata='token='+token;
    ajax(areaurl, 'GET', areadata, successLeftData, true);

    //展示左侧数据
    function showLeft(){
        var level1='';
        for (var i=0; i<area.length; i++) {
            var level1data=area[i];
            var level2='';
            if (level1data.childList) {
                for (var j=0; j<level1data.childList.length; j++) {
                    var level2data=level1data.childList[j];
                    var level3='';
                    if (level2data.childList) {
                        for (var h=0; h<level2data.childList.length; h++) {
                            var level3data=level2data.childList[h];
                            level3+=
                                '<li>'+
                                '<p level="'+level3data['level']+'" areaid="'+level3data['id']+'">'+level3data['name']+'</p>'+
                                '</li>';
                        }
                    }
                    level2+=
                        '<li>'+
                        '<p level="'+level2data['level']+'" areaid="'+level2data['id']+'">'+level2data['name']+'</p>'+
                        '<ul class="xian">'+ level3+ '</ul>'+
                        '</li>';
                }
            }
            level1+=
                '<li>'+
                '<p level="'+level1data['level']+'" areaid="'+level1data['id']+'">'+level1data['name']+'</p>'+
                '<ul class="shi">'+ level2+ '</ul>'+
                '</li>';
        }
        $('.sidebar .sheng').html(level1);

        //添加点击事件
        $('.sidebar ul li p').click(function (event) {
            event.stopPropagation();
            $('.sidebar ul li p').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            $(this).next('ul').slideToggle(500);

            //更新右侧文件列表
            var areaid=$(this).attr('areaid');
            showRight(areaid);
            //更新面包屑导航
            showNav($(this));
        });

        //初始化右侧文件列表
        var areaid=username.slice(0,-2);
        showRight(areaid);
    }

    //更新面包屑导航
    function showNav(that) {
        var shengname='';
        var shiname='';
        var xianname='';
        var navhtml='';
        $('.content .nav').html('');
        var thislevel=that.parent().parent().attr('class');
        if (thislevel=='sheng') {
            shengname=that.html();
            navhtml='<a>'+shengname+'</a>';
        } else if (thislevel=='shi') {
            shengname=that.parent().parent().prev().html();
            shiname=that.html();
            navhtml='<a>'+shengname+'</a><span>></span><a>'+shiname+'</a>';
        } else if (thislevel=='xian') {
            shengname=that.parent().parent().parent().parent().prev().html();
            shiname=that.parent().parent().prev().html();
            xianname=that.html();
            navhtml='<a>'+shengname+'</a><span>></span><a>'+shiname+'</a><span>></span><a>'+xianname+'</a>';
        }
        $('.bodybox .content .nav').html(navhtml);
    }
    //请求右侧文件列表
    function successRightData(data) {
        var html='';
        if (data.code===0) {
            var file=data.data,parentName;
            if (file.length!==0) {
                for (var i=0; i<file.length; i++) {
                    parentName=file[i].parentName ? file[i].parentName+'-' : '';
                    html+='<div class="p_box">'+
                        '<span class="ppt">'+parentName+file[i]['fileName']+file[i]['fileTime']+file[i]['description']+'.ppt</span>'+
                        // 1、url在下面的$('.p_box .changetype p').click()中会被修改，
                        ///2、如果需要再次添加参数，请在type字段的前面添加
                        '<span class="loadbtn load" url="'+api.download+'?token='+token+'&id='+file[i]['id']+'&type='+type+'" id="'+file[i]['id']+'" type="'+type+'"fileType="'+file[i]['type']+'">立即下载</span>'+
                        '<div class="loadbtn type"><span>PDF</span><img src="../images/show.png"></div>'+
                        '<div class="changetype"><div>更换格式</div><p class="p_two" tooltype="0">PPT<span><img src="../images/m_ok.png"></span></p><p class="p_three" tooltype="1">PDF<span><img src="../images/m_ok.png"></span></p></div>' +
                        '<div style="height:1px;clear: both"></div>'+
                        '</div>';
                }
            } else {
                html='*暂无文件！';
            }
        } else if (data.code===4) {
            html='*您没有权限，请重新选择！';
        } else if(data.code==9) {
            sessionStorage.clear();
            cookie.clear();
            window.location.href='../m/m_home.html'
        };
        $('.concrete').html(html);
        listAddEvent();
    }
    function showRight(areaid) {
        // $('.concrete').html('');
        var fileurl=api.file;
        var filedata='token='+token+'&areaId='+areaid+'&type='+type;
        ajax(fileurl, 'GET', filedata, successRightData, true);
    }
    function listAddEvent() {
        //打开类型选择的div
        $('.loadbtn.type').click(function (event) {
            event.stopPropagation();
            $('.changetype').css({'display':'none'});
            $(this).parent().find('.changetype').css({'display':'block'});
        });
        //选择类型
        $('.p_box .changetype p').click(function (event) {
            event.stopPropagation();
            var filename= $(this).parent().parent().find('.ppt').html();
            filename=filename.substring(0,filename.length-3);
            type=$(this).attr('tooltype');
            $(this).parent().parent().find('.ppt').html(filename+(type=='0'?'ppt':'pdf'));
            $(this).parent().parent().find('.loadbtn.type span').html(type=='0'?'PPT':'PDF');
            var url=$(this).parent().parent().find('.loadbtn.load').attr('url');
            url=url.substring(0,url.length-1)+type;
            $(this).parent().parent().find('.loadbtn.load').attr('url', url);
            $(this).parent().find('span').css({'opacity':'0'});
            $(this).find('span').css({'opacity':'1'});
            $('.changetype').css({'display':'none'});
        });
        //初始化类型
        $('.changetype .p_two').click();
        //点击文字超出部分滚动显示
        $('.concrete .p_box .ppt').click(function (event) {
            event.stopPropagation();
            clickRolling($(this));
        });
        //下载
        $('.loadbtn.load').click(function (event) {
            event.stopPropagation();

            //判断是否有ppt/pdf
            var filetype=$(this).attr('filetype');
            if (filetype=='0' && type=='1') {
                //没有pdf，却选了pdf
                $('.nofile').css({'display':'block'});
            } else if (filetype=='1' && type=='0') {
                //没有ppt，却选了ppt
                $('.nofile').css({'display':'block'});
            } else {
                window.open($(this).attr('url'), "_blank");
            }

        })
    }
    $('.nofile .tit').click(function (event) {
        event.stopPropagation();
        $('.nofile').css({'display':'none'});
    });

    $(document).click(function () {
        $('.changetype').css({'display':'none'});
        $('.outbtn .sureout').css({'display':'none'});
        $('.outbtn').attr('isshow','false');
        $('.nofile').css({'display':'none'});
        stopRolling(currentRollDom);
    });

    //文字超出部分滚动显示
    function clickRolling(that) {
        stopRolling(currentRollDom);
        currentRollDom=that;
        var str = that.html();
        var len = str.length;
        var lengthParent = that.width();
        var lengthChild = parseInt(that.css('font-size'))*len;
        var nowleft=that.scrollLeft();
        var preleft=nowleft-1;
        if (lengthChild>lengthParent) {
            timer=setInterval(function () {
                nowleft=that.scrollLeft();
                if (preleft==nowleft) {
                    that.scrollLeft(0);
                } else {
                    that.scrollLeft(that.scrollLeft()+1);
                    preleft=nowleft;
                }
            }, 100);
        }
    }
    //取消所有滚动
    function stopRolling(currentRollDom){
        if (currentRollDom) {
            currentRollDom.scrollLeft(0);
            clearInterval(timer);
        }
    }

    //右侧按钮点击事件
    // $('.content .types .btn').click(function () {
    //     $('.content .types .btn').each(function() {
    //         $(this).removeClass('active');
    //     });
    //     $(this).addClass('active');
    // })
};