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
            setTimeout(ert,1000);
            pr_index=0;
        }
    }
}
function ert(){
    $("#pr_main_nav_logo").css("display","block")
}
$(document).mousemove(qwe);





var user_id2;
var pageNum=1;
var allCoutInd;
var isLimit=1;
$(function(){
    getUserIndId();
    selectAllCoutInd();
    showInd();
});
function getUserIndId(){
    var pr_username=sessionStorage.getItem("username");
    $.ajax({
        url: "/getUserIndId.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:false,
        success:function(data){
            user_id2=data[0].u_id;
        }
    })
}
function showInd(){
    isLimit=1;
    if(isLimit==1){
        showInd2();
    }
}
function showInd2(){
    var pr_username=sessionStorage.getItem("username");
    var aInd_r=document.getElementsByClassName("ind_r");
    $.ajax({
        url: "/showInd.do",
        type:"post",
        data:{pr_username:pr_username,pageNum:pageNum},
        datatype:"json",
        async:true,
        success:function(data){
            aInd_r[0].innerHTML="<div class='ind_nav clear'> <div id='ind_nav_ft' style='border-bottom: none' onclick='showInd()'>全部订单</div> <div onclick='waitPay()'>等待付款</div> <div onclick='hadPay()'>已付款</div> <div onclick='finishedPay()'>交易完成</div> <!--<div id='yushou'>预售订单</div>-->  </div> <div class='ind-ft clear' style='margin-top: -7px'> <div>订单信息</div> <div>订购商品</div> <div>件数</div> <div>单价</div> <!--<div>商品操作</div>--> <div>订单状态</div> <div id='ind-ft-last'>订单操作</div>  </div>";
            for(var i=0;i<data.length;i++){
                var g=data[i].pc_src+"/"+data[i].pc_name;
                if(data[i].t_b_b_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }

                if(data[i].t_a_a_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }
            }
            aInd_r[0].innerHTML=aInd_r[0].innerHTML+" <div class='ind_pages'> <div class='ind_pages_pre' onclick='lastIndPage()'>上一页</div> <div class='ind_pages_next' onclick='skipIndPage()'>下一页</div> <div style='clear: both'></div> </div>";
        }
    });
}
function waitPay(){
    waitPay2();
    isLimit=0;
}
function waitPay2(){
    var pr_username=sessionStorage.getItem("username");
    var aInd_r=document.getElementsByClassName("ind_r");
    $.ajax({
        url: "/waitPay.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:true,
        success:function(data) {
            aInd_r[0].innerHTML="<div class='ind_nav clear'> <div id='ind_nav_ft' style='border-bottom: none' onclick='showInd()'>全部订单</div> <div onclick='waitPay()'>等待付款</div> <div onclick='hadPay()'>已付款</div> <div onclick='finishedPay()'>交易完成</div> <!--<div id='yushou'>预售订单</div>-->  </div> <div class='ind-ft clear' style='margin-top: -7px'> <div>订单信息</div> <div>订购商品</div> <div>件数</div> <div>单价</div> <!--<div>商品操作</div>--> <div>订单状态</div> <div id='ind-ft-last'>订单操作</div>  </div>";
            for(var i=0;i<data.length;i++){
                var g=data[i].pc_src+"/"+data[i].pc_name;
                if(data[i].t_b_b_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }

                if(data[i].t_a_a_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }
            }
            aInd_r[0].innerHTML=aInd_r[0].innerHTML+" <div class='ind_pages'> <div class='ind_pages_pre' onclick='lastIndPage()'>上一页</div> <div class='ind_pages_next' onclick='skipIndPage()'>下一页</div> <div style='clear: both'></div> </div>";

        }
    })
}
function hadPay(){
    hadPay2();
    isLimit=0;
}
function hadPay2(){
    var pr_username=sessionStorage.getItem("username");
    var aInd_r=document.getElementsByClassName("ind_r");
    $.ajax({
        url: "/hadPay.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:true,
        success:function(data){
            aInd_r[0].innerHTML="<div class='ind_nav clear'> <div id='ind_nav_ft' style='border-bottom: none' onclick='showInd()'>全部订单</div> <div onclick='waitPay()'>等待付款</div> <div onclick='hadPay()'>已付款</div> <div onclick='finishedPay()'>交易完成</div> <!--<div id='yushou'>预售订单</div>-->  </div> <div class='ind-ft clear' style='margin-top: -7px'> <div>订单信息</div> <div>订购商品</div> <div>件数</div> <div>单价</div> <!--<div>商品操作</div>--> <div>订单状态</div> <div id='ind-ft-last'>订单操作</div>  </div>";
            for(var i=0;i<data.length;i++){
                var g=data[i].pc_src+"/"+data[i].pc_name;
                if(data[i].t_b_b_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }

                if(data[i].t_a_a_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }
            }
            aInd_r[0].innerHTML=aInd_r[0].innerHTML+" <div class='ind_pages'> <div class='ind_pages_pre' onclick='lastIndPage()'>上一页</div> <div class='ind_pages_next' onclick='skipIndPage()'>下一页</div> <div style='clear: both'></div> </div>";

        }
    })
}
function finishedPay(){
    finishedPay2();
    isLimit=0;
}
function finishedPay2(){
    var pr_username=sessionStorage.getItem("username");
    var aInd_r=document.getElementsByClassName("ind_r");
    $.ajax({
        url: "/finishedPay.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:true,
        success:function(data){
            aInd_r[0].innerHTML="<div class='ind_nav clear'> <div id='ind_nav_ft' style='border-bottom: none' onclick='showInd()'>全部订单</div> <div onclick='waitPay()'>等待付款</div> <div onclick='hadPay()'>已付款</div> <div onclick='finishedPay()'>交易完成</div> <!--<div id='yushou'>预售订单</div>-->  </div> <div class='ind-ft clear' style='margin-top: -7px'> <div>订单信息</div> <div>订购商品</div> <div>件数</div> <div>单价</div> <!--<div>商品操作</div>--> <div>订单状态</div> <div id='ind-ft-last'>订单操作</div>  </div>";
            for(var i=0;i<data.length;i++){
                var g=data[i].pc_src+"/"+data[i].pc_name;
                if(data[i].t_b_b_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_bynumber+"</div> <div>￥"+data[i].b_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }

                if(data[i].t_a_a_id!=null){
                    if(data[i].in_state==1){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>已付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==2){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>未付款</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                    if(data[i].in_state==3){
                        aInd_r[0].innerHTML=aInd_r[0].innerHTML+"<div class='ind_detail clear ind_detail_ft'> <div>交易单号："+data[i].in_id+"</div> <div class='shoppingSmaImg'><a href='../store/s-details.html' onclick='getBicycleId(this)'><img src="+g+" alt=''/></a></div> <div>"+data[i].in_acnumber+"</div> <div>￥"+data[i].a_price+"</div> <!--<div>已评价</div>--> <div>交易完成</div> <div class='ind_detail_last' style='border-top: none'><a href='order-details.html'  onclick='getBicycleId(this)'>查看详情</a></div>  </div>"
                    }
                }
            }
            aInd_r[0].innerHTML=aInd_r[0].innerHTML+" <div class='ind_pages'> <div class='ind_pages_pre' onclick=''lastIndPage()''>上一页</div> <div class='ind_pages_next' onclick='skipIndPage()'>下一页</div> <div style='clear: both'></div> </div>";
        }
    })
}
function selectAllCoutInd(){
    selectAllCoutInd2();
    isLimit=0;
}
function selectAllCoutInd2(){
    var pr_username=sessionStorage.getItem("username");
    $.ajax({
        url: "/selectAllCoutInd.do",
        type:"post",
        data:{pr_username:pr_username},
        datatype:"json",
        async:false,
        success:function(data){
            allCoutInd=data[0].h;
        }
    })
}
function skipIndPage(){
    if(pageNum<Math.ceil(allCoutInd/3)&&isLimit==1){
        pageNum++;
        showInd();
    }
}
function lastIndPage(){
   if(pageNum>1&&isLimit==1){
       pageNum--;
       showInd();
   }
}
function getBicycleId(obj){
    var mytext=$(obj).parent().parent().find("div:nth-child(1)").text();
    var bb= mytext.substr(5,mytext.length-1).trim();
    sessionStorage.setItem("ind_Num",bb);
}









