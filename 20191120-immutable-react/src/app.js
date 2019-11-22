import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./webApp/common/css/base";

import rootSaga from './sagas';
import apiloader from './util/apiloader';
import config from './config';
import apis from './apis';



import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
moment.locale('zh-cn');

import AppIndex from '_root/webApp'




store.runSaga(rootSaga);

// 初始化配置
config.merge({});
// 将解析API
apiloader.merge(apis);

ReactDOM.render(
  <Provider store={store} locale={zhCN}>
    {AppIndex}
  </Provider>,
  document.getElementById("root")
);

// 设置html的font-size
(function (win, doc) {
  const { viewpor_max, viewpor_min } = win.link_one_config;
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
