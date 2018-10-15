import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Context from './component/context/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Context/>
        <hr/>
      </div>
    );
  }
}

export default App;
