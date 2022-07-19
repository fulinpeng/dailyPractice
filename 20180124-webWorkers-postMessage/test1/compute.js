/**
 * Created by flp on 2018/1/24.
 */
var i=0;
function timedCount(){
    for(var j=0,sum=0;j<1000;j++){
        for(var i=0;i<1000000;i++){
            sum+=i;
        }
    }
    // 调用postMessage向主线程发送消息
    postMessage(sum);
}

postMessage("Before computing,"+new Date());
timedCount();
postMessage("After computing,"+new Date());