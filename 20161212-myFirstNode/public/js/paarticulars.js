/**
 * Created by Administrator on 2016/12/17.
 */
var P=document.getElementById("p1");
var size=parseInt(P.style.fontSize);
console.log(P);
function setfont(str){
    if(str=="+"){
        size++;
        if(size>=30){
            size=30
        }
    }
    else if(str=="-"){
        size--;
        if(size<=12){
            size=12
        }
    }
    P.style.fontSize=size+"px"
}