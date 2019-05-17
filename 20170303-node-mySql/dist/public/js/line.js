/**
 * Created by gxa on 2017/2/16.
 */
$(document).ready(function(){
    $(window).scroll(function() {
        if ($(window).scrollTop()>200) {
            $(".line_firstdes p").css({"visibility":"visible",
            "margin-top":"0px",
             "transform":"scale(1.0)"

            });
            $(".line_firstright").css({"visibility":"visible",
                "margin-top":"0px"
            });
        }
        if($(window).scrollTop()>800){
            $(".line_secleft").css({"visibility":"visible",
                "margin-top":"0px"
            });
            $(".line_seccontent").css({"visibility":"visible",
                "margin-top":"0px"
            });

        }
        if($(window).scrollTop()>850){
            $(".line_secdes p").css({"visibility":"visible",
                "margin-top":"0px",
                "transform":"scale(1.0)"
            });
            $(".line_secdes1 p").css({"visibility":"visible",
                "margin-top":"0px"
            });
        }
        if($(window).scrollTop()>1600){
            $(".line_thirdright").css({"visibility":"visible",
                "margin-top":"0px"
            });
            $(".line_thirdcontent").css({"visibility":"visible",
                "margin-top":"0px"
            });
        }
        if($(window).scrollTop()>1750){
            $(".line_thirdcontent2,.line_thirdcontent3").css({"visibility":"visible",
                "margin-top":"0px"
            });

        }
        if($(window).scrollTop()>2400){
            $(".line_forthleft,.line_forthcontent1,.line_forthcontent2,.line_forthcontent3").css({"visibility":"visible",
                "margin-top":"0px"
            });
        }

    })
    });


