$(function(){
	
	var liNum = 4*4*4; // 暂且认为li个数为 5*5*5 个

	// 拖拽 滚轮
	(function(){
		var nowX , lastX , minusX = 0, nowY , lastY , minusY = 0;
		var roY = 0 , roX = 0 , tZ = -2000;
		var timer1 , timer2;
		$("body").mousedown(function(ev){
			ev = ev || window.event;
			lastX = ev.clientX;
			lastY = ev.clientY;
			clearInterval( timer1 );
			$(this).on('mousemove',function(ev){
				ev = ev || window.event; //ev 事件对象 存放事件的相关信息
				nowX = ev.clientX;  // ev.clientX  clientX属性存放鼠标x坐标
				nowY = ev.clientY;
				minusX = nowX - lastX;  // 两者差值
				minusY = nowY - lastY;
				roY += minusX*0.2;
				roX -= minusY*0.2;
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
				lastX = nowX; // 存放前一点的x坐标
				lastY = nowY;
			});
			return false;
		}).mouseup(function(){
			$(this).off('mousemove');
			timer1 = setInterval(function(){
				minusX *= 0.95;
				minusY *= 0.95;
				if ( Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5 )
				clearInterval( timer1 );
				roY += minusX*0.2;
				roX -= minusY*0.2;
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
			} , 13);
		}).mousewheel(function(e,d){ //滚轮事件
			//var d = arguments[1]   arguments 不定参   实参的集合
			clearInterval( timer2 );
			tZ += d*80;
			tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
			tZ = Math.max(-8000,tZ); // Math.max()  …… 最大
			// -8000 < tZ < 0
			$('#main').css({
				'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
			});

			timer2 = setInterval(function(){
				d *= 0.85;
				if ( Math.abs(d) < 0.01 )
				{
					clearInterval( timer2 );
				}
				tZ += d*80;
				tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
				tZ = Math.max(-8000,tZ); // Math.max()  …… 最大
				// -8000 < tZ < 0
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
			} , 13);
		});
	})()

	init();
	
	function init(){
		//给#main里面添加 liNum个 li标签
		for ( var i=0 ; i<liNum ; i++ )
		{
			var $li = $('<li onclick="showdetailFreind(this)"><p class="title"></p><p class="author"></p><p class="time"></p></li>');
			var x = (Math.random()-0.5)*5000;
			var y = (Math.random()-0.5)*5000;
			var z = (Math.random()-0.5)*5000;
			// Math.random()   [0,1)*2000  [0,2000) ->  [-1000 , 1000)
			$li.css({
				'transform' : 'translate3d('+x+'px,'+y+'px,'+z+'px)'
			});
			$('#main').append($li);
		}
		setTimeout(function(){
			Grid();
			$('#styleBtn').css({
				transform : 'scale(1)',
				opacity : 1
			});
		},300);

		$('#styleBtn li').on('click',function(){
			var index = $(this).index();
			switch ( index )
			{
				//case 0:
				//	Table();
				//	break;
				//case 1:
				//	Sphere();
				//	break;
				//case 2:
				//	Helix();
				//	break;
				//case 3:
				//	Grid();
				//	break;

				case 0:
					Table();
					break;
				//case 1:
				//	Sphere();
				//	break;
				//case 2:
				//	Helix();
				//	break;
				case 1:
					Grid();
					break;
			}
		});

	}

	function Grid(){
		var tX = 400 , tY = 400 , tZ = 500;  // 水平 垂直间隔
		var firstX = - 1.5*tX; //第一个li水平偏移量
		var firstY = - 1.5*tY; //第一个li垂直偏移量
		var firstZ = - 1.5*tZ; //第一个li Z轴偏移量
		$('#main li').each(function(i){
			var iX = (i % 16) % 4; // x方向，要增加的倍数
			var iY = parseInt((i % 16) / 4); //y方向，要增加的倍数
			var iZ = parseInt(i / 16); //z方向，要增加的倍数
			$(this).css({
				'transform' : 'translate3d('+ ( firstX + iX*tX ) +'px,'+ ( firstY + iY*tY ) +'px,'+ (firstZ + iZ*tZ) +'px)'
			});
		});
	}

	function Helix(){
		var roY = 10 , tY = 10;
		var mIndex = Math.floor($('#main li').length / 2);
		var firsttY = -tY*mIndex;
		$('#main li').each(function(i){
			$(this).css({
				'transform' : 'rotateY('+ 10*i +'deg) translateY('+ (firsttY+tY*i) +'px) translateZ(1000px)'
			});
		})
	}

	function Sphere(){
		var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];
		var roX = 180/arr.length;
		var fisrtRoX = 90;
		$('#main li').each(function(j){
			var sum = 0;
			var index , num;
			for ( var i=0;i<arr.length;i++ )
			{
				sum += arr[i];
				if ( sum >= j+1 )
				{
					index = i;
					num = arr[i] - (sum-j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = index%2?fisrtRoX+index*roX:fisrtRoX-index*roX;
			var y = num*roY;
			var z = 0;
			if ( x > 90 && x < 270 )
			{
				z = 180;
			}
			$(this).css({
				transform : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});
	}
	function Table(){
		
		var tX = 160 , tY = 200;
		var firstX = -9*tX + 60;
		var firstY = -4*tY;
		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];
		$('#main li').each(function(i){
			var x , y;
			if ( i < 18 )
			{
				x = arr[i].x;
				y = arr[i].y;
			}else
			{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)'
			});
		});
	}
	
	(function(){
		var $mainLi = $('#main li');
		var $show = $('#show');
		$mainLi.click(function(ev){
			ev = ev || window.event;
			$show.fadeIn(1000).css({
				'transform' : 'rotateY(0deg)scale(1)'
			});
			ev.stopPropagation();
		});
		$(document).click(function(){
			$show.fadeOut(1000,function(){
				$(this).css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				});
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			});
		});
	})();
});


var index6=0;
index6=parseInt(Math.random()*64+1);





var user_Id;
$(function(){
	getUserIdFd();
	showFriend();
});

function getUserIdFd(){
	var pr_username=sessionStorage.getItem("username");
	$.ajax({
		url: "/getUserIdFd.do",
		type:"post",
		data:{pr_username:pr_username},
		datatype:"json",
		async:false,
		success:function(data){
			user_Id=data[0].u_id;
		}
	})
}
function showFriend(){
	$.ajax({
		url: "/showFriend.do",
		type:"post",
		data:{user_Id:user_Id},
		datatype:"json",
		async:true,
		success:function(data){
					for(var i=0;i<data.length;i++){
						$('#main li').eq(data[i]. bf_id+40).css("background","url("+data[i].pc_src+")");
						$(".author").eq(data[i]. bf_id+40).text(data[i].u_nickname);
						$('#main li').eq(data[i]. bf_id+40).attr("attr",data[i]. bf_id);
						//console.log($('#main li').eq(data[i]. bf_id+40).attr("attr"));
					}
		}
	})
}
function showdetailFreind(obj){
	var friend_id=$(obj).attr("attr");
	$.ajax({
		url: "/showdetailFreind.do",
		type:"post",
		data:{user_Id:user_Id,friend_id:friend_id},
		datatype:"json",
		async:false,
		success:function(data){
			$("#show .s-title").text(data[0].u_share);
			$("#show .s-img").css("background","url("+data[0].pc_src+") center");           /*data[0].pc_src*/
			$("#show .s-author").text(data[0].u_nickname);
			$("#show .s-dec div:nth-child(1) a").text(data[0].u_nickname);
			$("#show .s-dec div:nth-child(2) a").text(data[0].u_nickname);

		}
	})
}

