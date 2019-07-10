import React from 'react';
import ExampleUseState from './components/ExampleUseState';
import ExampleUseEffect from './components/ExampleUseEffect';
import CountUseReducer from './components/CountUseReducer';
import ExampleUseRef from './components/ExampleUseRef';

function App() {
  return (
    <div className="App">
      <ExampleUseState></ExampleUseState>
      <hr/>
      <ExampleUseEffect></ExampleUseEffect>
      <hr/>
      <CountUseReducer initialState={{count: 0}}></CountUseReducer>
      <hr/>
      <ExampleUseRef></ExampleUseRef>
      <hr/>
    </div>
  );
}

export default App;
