/**
 * Created by Administrator on 2017/2/18.
 */
function chooseAddress(n){
    var aPay_address=document.getElementsByClassName("pay_address");
    for(var i=0;i<aPay_address.length;i++){
        aPay_address[i].style.border="1px solid rgba(242,96,49,0.3)";
        aPay_address[n].style.border="1px solid rgba(242,96,49,1)";
    }
};
var username=sessionStorage.getItem("username");
var arr=sessionStorage.getItem("arrid");
var list=JSON.parse(arr);
window.onload=function(){
    getuseraddress();
    getalllist();
};
var confirm_ind_maindiv=$(".confirm_ind_maindiv").get(0);
function getuseraddress(){
    var pay_addressdiv=$(".pay_addressdiv").get(0);
    $.ajax({
        type:"post",
        url:"getuseraddress.do",
        async:false,
        data:{un:username},
        success:function(data){
            pay_addressdiv.innerHTML="";
            $.each(data,function(i,n){
                if(i==0){
                    pay_addressdiv.innerHTML=pay_addressdiv.innerHTML+"<div class='pay_address clear pay_address_default' onclick='chooseAddress("+i+")'> <div class='pay_address2'>默认地址</div> <div class='pay_address_ftLine clear'> <div class='shoujianren'>("+n.pr_personal+" 收)</div> <div style='clear: both'></div> </div> <div class='pay_address_line' style='margin-top: 33px'></div><div class='pay_address_detail'>"+n.pr_address+n.pr_tel+"</div><div style='clear:both'></div></div>"
                }else{
                    pay_addressdiv.innerHTML=pay_addressdiv.innerHTML+"<div class='pay_address clear' onclick='chooseAddress("+i+")'><div class='pay_address_ftLine clear'> <div class='shoujianren'>("+n.pr_personal+" 收)</div> <div style='clear: both'></div> </div> <div class='pay_address_line' style='margin-top: 33px'></div><div class='pay_address_detail'>"+n.pr_address+n.pr_tel+"</div><div style='clear:both'></div></div>"
                }
            })
        }
    })
}
function getalllist(){
    confirm_ind_maindiv.innerHTML="";
    $.ajax({
        type:"post",
        async:true,
        url:"getalllist.do",
        data:{list:list},
        success:function(data){
            $.each(data,function(i,n){
                if(n.t_b_b_id!=null){
                    getbicycleinfo(n.t_b_b_id);
                }
                if(n.t_a_a_id!=null){
                    getpartsinfo(n.t_a_a_id);
                }
            })
        }
    });
}
function getbicycleinfo(n){
    $.ajax({
        type:"post",
        url:"getbicycleinfo.do",
        ansyc:true,
        data:{n:n},
        success:function(data){
            var url=data[0].pc_src+"/"+data[0].pc_name;
            console.log(data[0].in_bynumber)
            var finalprice=parseInt(data[0].in_bynumber)*parseInt(data[0].b_price);
            confirm_ind_maindiv.innerHTML=confirm_ind_maindiv.innerHTML+"<div class='confirm_ind_head_detail'><div class='clear clear5'> " +
                "<div class='confirm_ind_head_detail_pic'><img src='"+url+"' alt=''/>" +
                "</div><div class='lagntubike'>"+data[0].b_name+"" +
                "</div><div style='clear: both'></div></div><div class='confirm_ind_head_detai_attr'>" +
                "<div>商品重量："+data[0].pa_weight+"</div><div>变速档位："+data[0].pa_system+"</div> <div style='margin-left: -2px'>" +
                "车架材质:"+data[0].pa_Frame+"</div> <div style='width: 100%;margin-left: -22px'>颜色："+data[0].pa_color+"</div> " +
                "</div> <div>"+data[0].b_price+"</div> <div> <span>"+data[0].in_bynumber+"</span> </div> <div class='xiaoji'>"+finalprice+"</div></div><div style='clear: both'></div>"
        }
    })
}
function getpartsinfo(n){
    $.ajax({
        type:"post",
        url:"getpartsinfo.do",
        ansyc:true,
        data:{n:n},
        success:function(data){
            console.log(data)
            var url=data[0].pc_src+"/"+data[0].pc_name;
            var finalprice=parseInt(data[0].in_acnumber)*parseInt(data[0].a_price);
            confirm_ind_maindiv.innerHTML=confirm_ind_maindiv.innerHTML+" <div class='confirm_ind_head_detail'><div class='clear clear5'> " +
                "<div class='confirm_ind_head_detail_pic'><img src='"+url+"' alt=''/>" +
                "</div><div class='lagntubike'>"+data[0].a_name+"" +
                "</div><div style='clear: both'></div></div><div class='confirm_ind_head_detai_attr'>" +
                "<div>商品重量："+data[0].a_weight+"</div><div style='margin-left: -2px'>" +
                "</div> <div style='width: 100%;margin-left: -22px'>颜色："+data[0].a_color+"</div> " +
                "</div> <div>"+data[0].a_price+"</div> <div> <span>"+data[0].in_acnumber+"</span> </div> <div class='xiaoji'>"+finalprice+"</div></div><div style='clear: both'></div>"
        }
    })
}
function changetheallprice(){
    var xiaoji=$(".xiaoji");
    var sum=0;
    $.each(xiaoji,function(i,n){
       sum=parseInt(sum+parseInt(n.innerHTML));
    })
    var allprice=$(".allprice").html(sum)
}
setInterval(changetheallprice,10);
$(".ltbtn").click(function(){
    var allprice=$(".allprice").html();
    allprice=parseInt(allprice);
    var newadd=$(".pay_address");
    $.each(newadd,function(i,n){
        var str=$(n).css("border");
        var newstr=str.split(",");
        var newstrnew=newstr[newstr.length-1];
        var n= parseInt(newstrnew)
        if(n==49){
            var address=$(this).children(".pay_address_detail").html();
            var name=$(this).children(".pay_address_ftLine").children(".shoujianren").html();
            var namelist=name.split(" ");
            var newname=namelist[0].slice(1,namelist[0].length);
            sessionStorage.setItem("address",address);
            sessionStorage.setItem("newname",newname);
        }
    })
    sessionStorage.setItem("price",allprice);
    window.location.href="lastpay.html";
});