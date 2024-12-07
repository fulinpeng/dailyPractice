import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";

const data = window.__INITIAL_DATA__;
ReactDOM.hydrate(<App data={data} />, document.getElementById("root"));
