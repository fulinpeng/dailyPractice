
	function getByClass(oParent,sClass){
		var aEle=oParent.getElementsByTagName('*');
		var aResult=[];
		for(var i=0; i<aEle.length; i++){
			if(aEle[i].className==sClass){
				aResult.push(aEle[i]);
			};
		};
		return aResult;
	};
	
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		};
	};

	
	function startMove(obj,attr,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iCur=0;
			if(attr=='opacity'){//乘以100让小数变成整数,加上parseInt去掉小数部分
				iCur=parseInt(parseFloat(getStyle(obj,'opacity'))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			};
			
			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
			
			if(iSpeed==0){
				clearInterval(obj.timer);
			}else{
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+iCur+ iSpeed+')';
					obj.style.opacity=(iCur + iSpeed)/100;
				}else{
					obj.style[attr]=iCur+iSpeed+'px';
				};
			};
		},30);
	};
	
	
	

