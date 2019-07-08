import React, { Component } from 'react';
import './App.css';

import { Provider, createStore } from './react-redux'

import {themeReducer} from './reducer'
import Content from './containers/content'

const store = createStore(themeReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Content />
        </div>
      </Provider>
    );
  }
}

export default App;
