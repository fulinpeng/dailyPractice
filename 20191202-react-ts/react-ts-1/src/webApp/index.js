import React, { Component } from "react";
import { HashRouter as Router, Route} from "react-router-dom";

import Layout from "_root/webApp/containers/layout";
import Home from "_root/webApp/pages/home";

class WebApp extends Component {
  render() {
    const { store } = this.props;
    return (
      <Router>
        <Route path="/">
        {/* Route 必须要一个div包一层，不然要提示警告，所以干脆用了这个Layout组建来包裹 */}
          <Layout>
            <Route path="/" exact component={Home}/>
          </Layout>
        </Route>
      </Router>
    );
  }
}

export default WebApp;
