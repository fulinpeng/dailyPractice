/**
 * Created by gxa on 2016/12/14.
 */
//�������

    //设置body高度
$(document).find("body").height($(".mymenu").height());

!function(){
    laydate.skin('molv');//�л�Ƥ������鿴skins����Ƥ����
    laydate({elem: '#demo'});//��Ԫ��
}();
//���ڷ�Χ����
var start = {
    elem: '#start',
    format: 'YYYY-MM-DD',
    min:'2014-06-16', //�趨��С����Ϊ��ǰ����
    max:laydate.now(), //�������
    istime: true,
    istoday: false,
    choose: function(datas){
        end.min = datas; //��ʼ��ѡ�ú����ý����յ���С����
        end.start = datas ;//�������յĳ�ʼֵ�趨Ϊ��ʼ��
    }
};
var end = {
    elem: '#end',
    format: 'YYYY-MM-DD',
    min: '2014-06-16',
    max: laydate.now(),
    istime: true,
    istoday: false,
    choose: function(datas){
        start.max = datas; //������ѡ�ú󣬳�ֵ��ʼ�յ��������
    }
};
laydate(start);
laydate(end);
//�Զ������ڸ�ʽ
laydate({
    elem: '#test1',
    format: 'YYYY��MM��DD��',
    festival: true, //��ʾ����
    choose: function(datas){ //ѡ��������ϵĻص�
        alert('�õ���'+datas);
    }
});
//���ڷ�Χ�޶������쵽����
//laydate({
//    elem: '#hello3',
//    min: laydate.now(-1), //-1�������죬-2����ǰ�죬�Դ�����
//    max: laydate.now(+1) //+1�������죬+2������죬�Դ�����
//});
////�л��˵�
//$("body").ready(function(){
//   $(".menudes").on("click",function(){
//       var n=$(".menudes").index(this);
//       $(".menudes").css({
//           "color": "#a9a9a9",
//           "border-bottom":"none"
//       }).eq(n).css({
//           "color": "#3aadb4",
//       "border-bottom":"3px #3aadb4 solid"
//       });
//       $(".mymenu").each(function(){
//           $(this).removeClass("mainvisible").addClass("mainhidden")
//       });
//       $(".mymenu").eq(n).toggleClass("mainvisible mainhidden")
//   })
//});
//����Ƿ��͹��ʼ�
  $("document").ready(function(){
      setInterval(function(){
          $(".sent").each(function(){
              if($(this).text()=="已推送"){
                  $(this).find('a').css("color", "#3aadb4");
              }else{
                  $(this).find('a').css("color", "#B43F49");
              }
          });
      },80)
  });
$(function(){
    $(".sent").find("a").on("click",function(){
        if($(this).text()=="已推送"){
            layer.open({
                title: '警告',
                content: '已经将信息发送给该家长',
                btn: ['确定']
            })
        }else{
            var myobj=$(this);
            layer.open({
                title: '警告',
                content: '确定要发送条信息给家长吗？',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    myobj.text("已推送");
                    layer.open({
                        title: '警告',
                        content: '已发送给该家长',
                        btn: ['确定'],
                        yes: function (index, layero) {
                            layer.close(index);
                        }
                    })
                }
            })
        }
    })
});


//点击搜索按钮
$("body").ready(function(){
    //第一行
    $(".myselect").on("click",function(){
        var n=$(".myselect").index(this);
        $(".myselect").each(function(){
            $(this).removeClass("prechoice").addClass("nowchoice");
        });
        $(".myselect").eq(n).toggleClass("prechoice nowchoice")

    });
    //第二行
    $(".myselectline2").on("click",function(){
        var n=$(".myselectline2").index(this);
        $(".myselectline2").each(function(){
            $(this).removeClass("prechoice").addClass("nowchoice");
        });
        $(".myselectline2").eq(n).toggleClass("prechoice nowchoice")

    })

});
//删除表格
   $("body").ready(function(){
       $(".deltable").on("click",function(){
           var obj=this;
           layer.open({
               title:'警告',
               content:'确定要删除这条信息吗？',
               btn: ['确定', '取消'],
               yes:function(index, layero){
                   $(obj).parent().remove();
                   layer.close(index);
               }
           });
       })
   });

layer.config({
    skin: 'layui-layer-molv'
})
//增加请假信息
  $("body").ready(function() {
      $(".btn-md").on("click", function () {
          var type = true;
          $(".mybtn").on("click",function(){
              windowTurnup(type)
          });
      });
      $(".reset").on("click", function () {
          var mypre_obj=$(this).parent();
          $(".stuName").eq(0).val(mypre_obj.find(".name").eq(0).text());
          $(".stuCLass").eq(0).val(mypre_obj.find(".class1").eq(0).text());
          $(".stuDaytime").eq(0).val(mypre_obj.find(".daytime").eq(0).text());
          $(".stuHoltime").eq(0).val(mypre_obj.find(".time").eq(0).text());
          $(".stuReason").eq(0).val(mypre_obj.find(".reason").eq(0).text());
          $(".stuOther").eq(0).val(mypre_obj.find(".othermes").eq(0).text());
          $(".inSchool").eq(0).val(mypre_obj.find(".inschool").eq(0).text());
          $(".outSchool").eq(0).val(mypre_obj.find(".outschool").eq(0).text());
          var type = false;
          $(".mybtn").on("click",function(){
                  windowTurnup(type,mypre_obj)
          });
      })
  });


function windowTurnup(type,mypre_obj){
    if(type==true){
            layer.open({
                title:'警告',
                content:'确定要增加这条信息吗？',
                btn: ['确定', '取消'],
                yes:function(index, layero){
                    var myobj=$(".lastTr").eq(0).removeClass("lastTr").clone(true).addClass("lastTr");
                    var myname=$(".stuName").eq(0).val();
                    var myclass=$(".stuCLass").eq(0).val();
                    var mystudaytime=$(".stuDaytime").eq(0).val();
                    var mystuholtime=$(".stuHoltime").eq(0).val();
                    var mystuReason=$(".stuReason").eq(0).val();
                    var mystuOther=$(".stuOther").eq(0).val();
                    myobj.find(".name").eq(0).text(myname);
                    myobj.find(".class1").eq(0).text(myclass);
                    myobj.find(".daytime").eq(0).text(mystudaytime);
                    myobj.find(".time").eq(0).text(mystuholtime);
                    myobj.find(".reason").eq(0).text(mystuReason);
                    myobj.find(".othermes").eq(0).text(mystuOther);
                    myobj.find(".sent").find('a').text("邮件推送");
                    myobj.appendTo($("#mytable"));
                    layer.close(index);
                    $('#myModal').modal('hide');
                }
            })
    }else{
        layer.open({
            title:'警告',
            content:'确定要修改这条信息吗？',
            btn: ['确定', '取消'],
            yes:function(index, layero){
                var myname=$(".stuName").eq(0).val();
                var myclass=$(".stuCLass").eq(0).val();
                var mystudaytime=$(".stuDaytime").eq(0).val();
                var mystuholtime=$(".stuHoltime").eq(0).val();
                var mystuReason=$(".stuReason").eq(0).val();
                var mystuOther=$(".stuOther").eq(0).val();
                var stuin_school=$(".inSchool").eq(0).val();
                var stuout_school=$(".outSchool").eq(0).val();
                mypre_obj.find(".name").eq(0).text(myname);
                mypre_obj.find(".class1").eq(0).text(myclass);
                mypre_obj.find(".daytime").eq(0).text(mystudaytime);
                mypre_obj.find(".time").eq(0).text(mystuholtime);
                mypre_obj.find(".reason").eq(0).text(mystuReason);
                mypre_obj.find(".othermes").eq(0).text(mystuOther);
                mypre_obj.find(".inschool").eq(0).text(stuin_school);
                mypre_obj.find(".outschool").eq(0).text(stuout_school);
                layer.close(index);
                $('#myModal').modal('hide');
            }
        })
        }
    }
//???????
//验证姓名
function nameMatch(a){
    var reg= /^[\u4e00-\u9fa5 ]{2,20}$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".namewarning").html("<span>请输入正确的姓名（2位以上汉字）</span>").addClass("font-color");
    }
}
$(".stuName").blur(function(){
    var stu_name=$(".stuName").val();
    nameMatch(stu_name)
});
$(".stuName").focus(function(){
    $(".namewarning").html("").removeClass("font-color")
});
//验证班级
function classMatch(a){
    var reg= /^[\u4e00-\u9fa5 ]{4,20}$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".classwarning").html("<span>请输入正确的班级格式'(X班X班)'</span>").addClass("font-color")
    }
}
$(".stuClass").blur(function(){
    var stu_class=$(".stuClass").val();
    classMatch(stu_class)
});
$(".stuClass").focus(function(){
    $(".classwarning").html("").removeClass("font-color")
});
//验证请假日期
function daytimeMatch(a){
    var reg= /^(^(\d{4}|\d{2})(\-|\/|\.)\d{1,2}\3\d{1,2}$)/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".daytimewarning").html("<span>请输入正确的日期格式YYYY/MM/DD</span>").addClass("font-color");
    }
}
$(".stuDaytime").blur(function(){
    var stu_daytime=$(".stuDaytime").val();
    daytimeMatch(stu_daytime)
});
$(".stuDaytime").focus(function(){
    $(".daytimewarning").html("").removeClass("font-color")
});
//验证请假天数
function holtimeMatch(a){
    var reg= /^[\u4e00-\u9fa5 ]{2,20}$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".holtimewarning").html("<span>请输入正确格式（2位以上汉字）</span>").addClass("font-color")
    }
}
$(".stuHoltime").blur(function(){
    var stu_holtime=$(".stuHoltime").val();
    holtimeMatch(stu_holtime)
});
$(".stuHoltime").focus(function(){
    $(".holtimewarning").html("").removeClass("font-color")
});
//验证请假原因
function reasonMatch(a){
    var reg= /^[\u4e00-\u9fa5 ]{2,20}$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".reasonwarning").html("<span>请输入正确格式（2位以上汉字）</span>").addClass("font-color")
    }
}
$(".stuReason").blur(function(){
    var stu_reason=$(".stuReason").val();
    reasonMatch(stu_reason)
});
$(".stuReason").focus(function(){
    $(".reasonwarning").html("").removeClass("font-color")
});
//验证请假备注
function otherMatch(a){
    var reg= /^[\u4e00-\u9fa5 ]{1,20}$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".otherwarning").html("<span>请输入正确格式（1位以上汉字）</span>").addClass("font-color")
    }
}
$(".stuOther").blur(function(){
    var stu_otherreason=$(".stuOther").val();
    otherMatch(stu_otherreason)
});
$(".stuOther").focus(function(){
    $(".otherwarning").html("").removeClass("font-color")
});
//验证入园时间
function ingardenMatch(a){
    var reg= /^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".inwarning").html("<span>请输入正确格式（hh:mm）</span>").addClass("font-color")
    }
}
$(".inSchool").blur(function(){
    var stu_intime=$(".inSchool").val();
    ingardenMatch(stu_intime)
});
$(".inSchool").focus(function(){
    $(".inwarning").html("").removeClass("font-color")
});
//验证离园时间
function outgardenMatch(a){
    var reg= /^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/;
    console.log(reg.test(a));
    if(!reg.test(a)){
        $(".outwarning").html("<span>请输入正确格式（hh:mm）</span>").addClass("font-color")
    }
}
$(".outSchool").blur(function(){
    var stu_outtime=$(".outSchool").val();
    outgardenMatch(stu_outtime)
});
$(".outSchool").focus(function(){
    $(".outwarning").html("").removeClass("font-color")
});





