import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'

import Counter from './Counter'
import reducer from './reducers'

import createSagaMiddleware from 'redux-saga'
import  mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT_ASYNC')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
