/**
 * Created by Administrator on 2017/2/24.
 */
$(function(){

    var sheng = areaData.sheng;
    var $sheng = $('#sheng');
    var $shi = $('#shi');
    var $xian = $('#xian');
    var shiIndex = 0;
    for ( var i=0;i<sheng.length;i++ )
    {
        var $option = $('<option value='+ (i+1) +'>'+ sheng[i] +'</option>');
        $sheng.append( $option );
    }
    $sheng.change(function(){
        shiIndex = this.selectedIndex - 1;
        if ( shiIndex < 0 )
        {

        }
        else
        {
            var shi = areaData.shi['a_'+shiIndex];
            $shi.html('<option value="0">市</option>');
            $xian.html('<option value="0">县</option>');
            for (var i=0;i<shi.length;i++ )
            {
                var $option = $('<option value='+ (i+1) +'>'+ shi[i] +'</option>');
                $shi.append( $option );
            }
        }
    });
    $shi.change(function(){
        var index = this.selectedIndex - 1;
        if ( index < 0 )
        {

        }
        else
        {
            var xian = areaData.xian['a_'+shiIndex+'_'+index];
            $xian.html('<option value="0">县</option>');
            for (var i=0;i<xian.length;i++ )
            {
                var $option = $('<option value='+ (i+1) +'>'+ xian[i] +'</option>');
                $xian.append( $option );
            }
        }
    });
});
$(function(){
    var layer;
    layui.use(['layer'], function(){
        layer=layui.layer;
        layer.config({
            extend: 'myskin/style.css' //加载您的扩展样式
            ,skin:"layui-ext-yourskin"
        });
    });
    $('#baocun').click(function(){
        layer.open({
            title:'保存地址'
            ,content:'您确定保存吗？'
            ,btn:['确定','取消']
     ,yes:function(index){
                layer.close(index);
                var phone = document.getElementById('testphone').value;
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
                    layer.open({
                        title:'提示'
                        ,content:'请填写正确的手机号？'
                        ,btn:['确定']
                    });
                    return false;
                }

}
})
    })
    });
$("#testphone").keydown(function(){
    console.log(53453454)
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;

})


