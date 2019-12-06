import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import Main from "./page/main";
import "./base.scss";

ReactDOM.render(
  <HashRouter>
    <Main />
  </HashRouter>,
  document.getElementById("root")
);
