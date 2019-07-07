$(function(){
    $('.clu_replynone').click(function(){
        $(".clu_sereply").remove();
        var node=$(this).parent().parent().parent()
        var secnode="<div class='clu_answer clu_sereply'>"+
                        "<div class='clu_anseraer'>"+
                        "<div class='clu_requleft'>"+
                        "<div class='clu_userlogo'>"+
                        "<img src='../../images/img-logo.png' alt=''/>"+
                        "</div>"+
                        "</div>"+
                        "<div class='clu_retxtare'>"+
                        "<div class='clu_titxt'>"+
                        "<p class='clu_retitx1'>audjdk</p>"+
                        "</div>"+
                        "<form action='#'>"+
                        "<textarea name='replay' id='sereplay' cols='100' rows='6' maxlength='100'></textarea>"+
                        "<div>"+
                        "<button class='ltbtn clu_btn'>提交</button>"+
                        " <div class='clu_ltshou'>"+
                        " 活动规则"+
                        " </div>"+
                        "</div>"+
                        "</form>"+
                        " </div>"+
                        "</div>"+
                        "</div>"
        node.after(secnode);
    })
})