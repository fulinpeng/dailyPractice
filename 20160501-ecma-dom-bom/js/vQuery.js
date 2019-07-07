/**
 * Created by Administrator on 2016/12/6.
 */
//面向对象写成的，先写个构造函数
function myAddEvent(obj,sEv,fn){
    if(obj.attachEvent){
        obj.attachEvent("on"+sEv,function(){
            fn.call(obj);//处理ie下this指向的问题//////////////////注意这个写法放在function(){}里面的////////////////////
        });

    }else{
        obj.addEventListener(sEv,fn,false);
    }
}
function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName("*");
    var aResult=[];
    for(var i=0; i<aEle.length; i++){
        if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return(aResult)
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function vQuery(vArg){
    this.elements=[];//这个数组用来装选择器选择的元素节点
    switch(typeof(vArg)){
        case "function":
           //window.onload=vArg;
            myAddEvent(window,"load",vArg);//不要on，不是onload
        break;
        case "string":
            switch(vArg.charAt(0)){
                case "#":   //id
                    var obj=document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case ".":   //class
                    this.elements=getByClass(document,vArg.substring(1));
                    break;
                default:    //tagName
                    this.elements=document.getElementsByTagName(vArg);
                    break;
            }
            break;
        case "object":
            this.elements.push(vArg);
    }
    this.click=function(fn){//这里必须用click不能加on,因为jQuery里没有onXX
        for(var i=0; i<this.elements.length; i++){
            myAddEvent(this.elements[i],"click",fn)
        }
    };
    this.show=function(){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style.display="block";
        }
    };
    this.hide=function(){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style.display="none";
        }
    };
    //hover----$("#div1").hover(function(){},function(){});
    this.hover=function(fnover,fnout){
        for(var i=0; i<this.elements.length; i++){
            myAddEvent(this.elements[i],"mouseover",fnover);
            myAddEvent(this.elements[i],"mouseout",fnout);
        }
    };
    //$("#div1").css("background","red")或者$("#div1").css("width")
    this.css=function(att,value){
        if(arguments.length==2){//设置样式
            for(var i=0; i<this.elements.length; i++){
                this.elements[i].style[att]=value;
            }
        }else{//获取样式值
            for(var i=0; i<this.elements.length; i++){
                return getStyle(this.elements[i],att)
            }
        }
    };
    //$("#btn2").toggle(function(){},function(){},function(){});
    this.toggle=function(){
        var _arguments=arguments;
        for(var i=0; i<this.elements.length; i++){
            addTaggle(this.elements[i]);
        }
        function addTaggle(obj){
            var count=0;
            myAddEvent(obj,"click",function(){
                _arguments[count++%_arguments.length].call(obj);//这里arguments指的是当前的函数的参数数组
            });
        }
    }
}
function $(vArg){
    return new vQuery(vArg);
}