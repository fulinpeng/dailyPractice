/**
 * Created by sunsharp on 2017/8/15.
 */

$('html').css({'font-size':100+'px'});
window.onload = function () {
    var mySwiper = new Swiper ('.swiper-container.swiper-body', {
        direction: 'vertical'
    });
    var mySwiper2 = new Swiper ('.swiper-container.desbox', {
        direction: 'horizontal',
        autoplay : 2000,
        loop : true
    });

    var oldValue='';
    var newValue='';
    var user='';
    var psw='';
    var yzm='';
    var reg='';

    // 验证码
    $('.yanzheng .new').click(function () {
        newValue=new Date().getTime().toString() + parseInt(Math.random() * 100000);
        $('.yzmdes img').attr('src', api.getCaptcha + '?oldValue='+oldValue+'&newValue='+newValue);
    });
    $('.yzmdes img').on('load', function () {
        oldValue=newValue;
    });
    $('.yanzheng .new').click();

    $('.info input').focus(function () {
        $('.loginbox .info .error').css({'display': 'none'});
        $('.loginbox .info.error').css({'display': 'none'})
    });
    $('.info input').keydown(function (e) {
        if (e.keyCode == 13) {
            $('.info.login').click();
        }
    });

    // 登录
    function showSuccess(data) {
        var error=$('.loginbox .info.error');
        if (data.code===0){
            sessionStorage.setItem('token', JSON.stringify(data.data));
            sessionStorage.setItem('username', JSON.stringify(user));

            cookie.set('token', JSON.stringify(data.data));
            cookie.set('username', JSON.stringify(user));

            if (user.substring(0,1)==0) {
                window.location.href='./m_dowload.html'
            } else {
                window.location.href='./m_consumload.html'
            }
        } else if (data.code==2) {
            $('.loginbox .info.yanzheng .error').css({'display':'block'});
            error.css({'display':'block'});
            error.html('验证码错误');
        } else if (data.code==4) {
            error.css({'display':'block'});
            error.html('没有权限');
        } else if (data.code==7) {
            $('.loginbox .info.user .error').css({'display':'block'});
            $('.loginbox .info.pasw .error').css({'display':'block'});
            error.css({'display':'block'});
            error.html('帐号或密码错误');
        } else if (data.code==9) {
            error.css({'display':'block'});
            error.html('登录过期');
        }
    }

    $('.info.login').click(function () {
        var error=$('.loginbox .info.error');
        $('.loginbox .info.user .error').css({'display': 'none'});
        user = $.trim($('.info.user input').val());
        psw = $.trim($('.info.pasw input').val());
        yzm = $.trim($('.info.yanzheng input').val());
        reg = /^[A-Za-z0-9_-]+$/;
        var online = navigator.onLine ? navigator.onLine : true;
        if (!online) {
            error.css({'display': 'block'});
            error.html('请连接网络');
        } else if (!reg.test(yzm)) {
            $('.loginbox .info.yanzheng .error').css({'display': 'block'});
            error.css({'display': 'block'});
            error.html('验证码错误');
        } else if (!reg.test(user)) {
            $('.loginbox .info.user .error').css({'display': 'block'});
            error.css({'display': 'block'});
            error.html('用户名错误');
        } else if (!reg.test(psw)) {
            $('.loginbox .info.pasw .error').css({'display': 'block'});
            error.css({'display': 'block'});
            error.html('密码错误');
        } else if (reg.test(user) && reg.test(psw) && reg.test(yzm)) {
            var url=api.login;
            var data='userName='+user+'&userPwd='+psw+'&captchaValue='+yzm+'&oldValue='+oldValue;
            ajax(url, 'POST', data, showSuccess, true);
        }
    });
    //轮播效果
    var w = $('.archit .contentbox').width();
    var len = $('.archit .contentbox .content').length;
    var isfinish = true;
    //上一张
    $('.btn.pre').click(function () {
        clearInterval(interval);
        if (isfinish) {
            isfinish = false;
            var node = $('.archit .contentbox .content')[len - 1];
            $('.archit .contentbox ul').prepend(node);
            $('.archit .contentbox').scrollLeft($('.archit .contentbox').scrollLeft() + w);
            $('.archit .contentbox').animate({
                'scrollLeft': $('.archit .contentbox').scrollLeft() - w
            }, 500);
            setTimeout(function () {
                isfinish = true;
                interval = setInterval(function () {
                    $('.btn.next').click();
                }, 3000)
            }, 600);
        } else {
            return false;
        }
    });
    //下一张
    $('.btn.next').click(function () {
        clearInterval(interval);
        if (isfinish) {
            isfinish = false;
            var node = $('.archit .contentbox .content')[0];
            $('.archit .contentbox').animate({
                'scrollLeft': $('.archit .contentbox').scrollLeft() + w
            }, 500);
            setTimeout(function () {
                $('.archit .contentbox ul').append(node);
                $('.archit .contentbox').scrollLeft($('.archit .contentbox').scrollLeft() - w);
                isfinish = true;
                interval = setInterval(function () {
                    $('.btn.next').click();
                }, 3000)
            }, 600);
        } else {
            return false;
        }
    });
    var interval = setInterval(function () {
        $('.btn.next').click();
    }, 3000);

    $('.read-btn').click(function () {
        window.open(api.fileurl)
    })
};