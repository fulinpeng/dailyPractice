/**
 * Created by yitjhy on 2017/9/8.
 */

window.onload=function(){

    var isEnter=false;
    var inputNum2="";
    var inputNum="";
    function change($obj) {console.log('哈哈propertychange')
        inputNum=$obj.val();
        var isHasPoint = inputNum.indexOf(".");
        var str=inputNum.charAt(inputNum.length-1);

        if(str=="."){console.log('哈哈=="."')
            if(inputNum.charAt(inputNum.length-2)=="."){
                $obj.val(inputNum.substring(0,inputNum.length-1));
                $obj.css("paddingRight", "78px");
            }
        }
        if (isHasPoint != -1) {console.log('哈哈!= -1')
            if(isEnter==false||inputNum.length==1){

                isEnter=true;
                var pointChange=inputNum.charAt(isHasPoint);
                var pointBefore = inputNum.substring(0, isHasPoint);
                var pointAfter = inputNum.substring(isHasPoint, inputNum.length - 1);
                pointChange = " " + pointChange;
                inputNum2 = pointBefore + pointChange+pointAfter;
                $obj.val(inputNum2);
                $obj.css("paddingRight", "78px");

            }
            var pointBeforeStr = inputNum.substring(inputNum.indexOf(".")+1, inputNum.length),
                pointBeforeStr2,
                pointAfter2,
                pointBeforeStr3;

            if (pointBeforeStr.length >= 2) {console.log('哈哈>= 2')

                $obj.css("padding", "1px 0px 1px 0px");
                console.log("二位", $obj.css('padding-right'));
                pointBeforeStr2=inputNum.substring(0,isHasPoint+1);
                pointAfter2=inputNum.substring(isHasPoint+1,isHasPoint+3);
                $obj.val(pointBeforeStr2+pointAfter2);

            }else if(pointBeforeStr.length == 1&&str!="."){console.log('哈哈== 1&&str!="."')

                $obj.css("padding", "1px 41px 1px 0px");
                console.log("一位", $obj.css('padding-right'));

                pointBeforeStr2=inputNum.substring(0,isHasPoint+1);
                pointAfter2=inputNum.substring(isHasPoint+1,isHasPoint+3);
                $obj.val(pointBeforeStr2+pointAfter2);

            }else if(pointBeforeStr.length == 0){console.log('哈哈== 0')

                $obj.css("padding", "1px 80px 1px 0px");
                pointBeforeStr2=inputNum.substring(0,isHasPoint+1);
                pointAfter2=inputNum.substring(isHasPoint+1,isHasPoint+3);
                $obj.val(pointBeforeStr2+pointAfter2);
                console.log("点位", $obj.css('padding-right'));

            }
        }else if (isHasPoint == -1) {console.log('哈哈== -1')

            isEnter=false;
            $obj.val(inputNum.replace(/(^\s*)|(\s*$)/g, ""));
            $obj.css("paddingRight", "127px");

            if(inputNum.length >= 12){console.log('哈哈>= 12')
                pointBeforeStr3=inputNum.substring(0,12);
                $obj.val(pointBeforeStr3);
            }

        }

        $obj.css('paddingRight')
    }


    change($(".myinput"));

    $(".myinput").bind('input propertychange', function () {
        change($(".myinput"));
    });
};
