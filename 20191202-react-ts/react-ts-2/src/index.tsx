// import "./base.scss";
// import {
//   log
// } from "./test";

// console.log(process.env.NODE_ENV);
// if (module.hot) {
//   module.hot.accept('./test', function () {
//     console.log('Accepting the updated printMe module!');
//     log();
//   })
// }

import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{ compiler: string, framework: string }> = (props) => {
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>
    </div>
  );
}

ReactDOM.render(
  <App compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);

