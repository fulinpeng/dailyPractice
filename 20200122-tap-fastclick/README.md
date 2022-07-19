* 相对于fastclick用两个时间戳的方式

```js
TouchHandler.TIME_FOR_LONG_PRESS_ = 500;
this.longPressTimeout_ = window.setTimeout(this.onLongPress_.bind(this),TouchHandler.TIME_FOR_LONG_PRESS_);

//...
onLongPress_: function() {
  this.disableTap_ = true;
}

if (!this.disableTap_)
    this.dispatchEvent_(TouchHandler.EventType.TAP, touch);
```

* 按位移偏差判断的tap