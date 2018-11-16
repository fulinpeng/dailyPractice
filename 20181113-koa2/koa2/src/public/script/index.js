/**
 * Created by flp on 2018/4/14.
 */

~(function($) {
  var thumbBox = $(".thumbBox"),
    showNum = $(".showNum");
  $.fn.extend({
    thumb: Thumb
  });
  var thumb2 = new thumbBox.thumb({
    target: thumbBox.get(0),
    showNum: showNum.get(0)
  });
  thumb2.initnum();
  thumb2.addClick();
})($);
