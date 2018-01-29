import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import App from './constructor/App'
import addData from './reducers/addData'

//style
import './reset.css'

const loggerMiddleware = createLogger()

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

//initialization store
const store = createStore(
  addData,
  persistedState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)