/**
 * Created by Administrator on 2017/2/16.
 */
//window.onscroll=function(){
//        var scrollY =document.documentElement.scrollTop||document.body.scrollTop;
//        if(scrollY>=1300){
//          $("#shoe").css({"position":"relative","left":"6%","transition":"all 1s linear"});
//        }
//        if(scrollY<1200){
//          $("#shoe").css({"position":"relative","left":"35%","transition":"all 2s linear"});
//        }
//};
//$(document).ready(function(){
//        $
//})

/*商城首页更新的ajax*/
var
    bikeMessage=1;
window.onload=function(){
     storeMessge1();
     storeMessge2();
     storeMessge3();
     storeMessge4();
};
/*商城整车一展示部分*/
function storeMessge1(){
        $.ajax({
                url:'storeIndex1.do',
                type:'post',
                dataType:'json',
                async:'true',
                data:{Message:bikeMessage},
                success:function(data){
                        var section03_3_html="";
                        for(var i=0; i<3; i++) {
                                section03_3_html +=
                                    "<div>" +
                                    "<a href="+"getbikeMessage1.do?name="+data[i].pc_name+"&&src="+data[i].pc_src+">" +
                                    "<img src='" + data[i].pc_src +"/"+data[i].pc_name+ "' alt='' id='bike1'/>" +
                                    "</a><div class='bikeMessage'>" +
                                    "<p>"+data[i].b_name+"</p>" +
                                    "<p>¥："+data[i].b_price+"</p>" +

                                    "</div>" +
                                    "<div class='circle'>" +
                                    "<div class='circle1' id='blue1'></div>" +
                                    "<div class='circle1 circle2' id='black1'></div>" +
                                    "</div>" +
                                    "</div>"
                        }
                        section03_3_html+=
                            "<div id='section03-3-4'>"+
                            "<img src='../../images/store/langtu--logo.gif' alt=''/>"+
                            "<span>专卖新理念，自由新体验</span>"+
                            "<button class='ltbtn'><a href='Vehicle.html'>更多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→</a></button>"+
                            "</div>";
                        $(".section03-3").html(section03_3_html)
                }
        })
}
/*商城整车二展示部分*/
function storeMessge2(){
        $(".section03-3-5-1").html("");
        $.ajax({
                url:'storeIndex2.do',
                type:'post',
                dataType:'json',
                async:'true',
                data:{Message:bikeMessage},
                success:function(data){
                        var section03_3_5_1_html="";
                        for(var i=0; i<1; i++){
                                section03_3_5_1_html+=
                               "<a href="+"getbikeMessage2.do?name="+data[i].pc_name+"&&src="+data[i].pc_src+">"+
                                    "<div class='shade'>"+
                                    "<span>"+
                                    data[i].b_name+
                                    "</span>"+
                                    "<div></div>"+
                                    "<p class='money'>￥："+data[0].b_price+"</p>"+
                                "</div>"+
                                "</a>"+
                                "<img src='"+data[i].pc_src+"/"+data[i].pc_name+"' alt=''/>"
                        }
                        $(".section03-3-5-1").html(section03_3_5_1_html)
                }
        })
}
/*商城整车三展示部分*/
function storeMessge3(){
        $(".section03-3-5-2").html("");
        $.ajax({
                url:'storeIndex3.do',
                type:'post',
                dataType:'json',
                async:'true',
                data:{Message:bikeMessage},
                success:function(data){
                        var section03_3_5_2_html="";
                                section03_3_5_2_html+=
                        "<img src='"+data[0].pc_src+"/"+data[0].pc_name+"'/>"+
                            "<a href="+"getbikeMessage3.do?name="+data[0].pc_name+"&&src="+data[0].pc_src+">"+
                            "<div class='shade shade1'>"+
                            "<span>"+
                                   data[0].b_name+
                            "</span>"+
                            "<div class='shadeline'></div>"+
                            "<p class='money'>￥："+data[0].b_price+"</p>"+
                        "</div>"+
                        "</a>"+
                        "&nbsp;";
                     $(".section03-3-5-2").html(section03_3_5_2_html)
                }
        })
}
/*商城配件展示部分*/
function storeMessge4(){
      $.ajax({
              url:'storeIndex4.do',
              type:'post',
              dataType:'json',
              async:"true",
              data:{Message:bikeMessage},
              success:function(data){
                      var section04_3_html="";
                      section04_3_html=
                              "<div class='section04-3-log'>"+
                                  "<img src='../../images/store/langtu_logo1.gif' alt=''/>"+
                                  "<span class='s-log-2'>更好的产品，更好的体验</span>"+
                              "<button class='ltbtn'><a href='parts.html'>更多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→</a></button>"+
                              "</div>";
                      for(var i=0;i<3;i++){
                              section04_3_html+=
                               "<div class='peijian'>"+
                                   //href后跟的拦截数据到详情页面
                                  "<a href="+"getStorDetails.do?name="+data[i].pc_name+"&&src="+data[i].pc_src+">"+
                          "<img class='img-responsive' src='"+data[i].pc_src+"/"+data[i].pc_name+"'/></a>"+
                                  "<div class='bikeMessage'>"+
                                       "<p class='peijian_name'>"+data[i].a_name+"</p>"+
                                       "<p class='peijian_price'>¥："+data[i].a_price+"</p>"+
                                  "</div>"+
                               "</div>"
                      }
                  /*页面重构*/
                      $(".section04-3").html(section04_3_html);
              }
      })
}

