/*
 * @Description: 入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import WebApp from "./webApp/index";
import "./webApp/common/css/base";

ReactDOM.render(
  <Provider store={store}>
    <WebApp />
  </Provider>,
  document.getElementById("root")
);

// 设置html的font-size
(function (win, doc) {
  const {viewpor_max, viewpor_min} = win.webapp_config;
  function fontSizeAuto(oriWidth) {
    return function () {
      var viewportWidth = doc.documentElement.clientWidth;
      console.log(oriWidth);
      viewportWidth > viewpor_max && (viewportWidth = oriWidth);
      viewportWidth < viewpor_min && (viewportWidth = viewpor_min);
      doc.documentElement.style.fontSize = viewportWidth / (oriWidth / 100) + "px";
    };
  }
  fontSizeAuto(viewpor_max)();
  win.onresize = fontSizeAuto(viewpor_max);
})(window, document);