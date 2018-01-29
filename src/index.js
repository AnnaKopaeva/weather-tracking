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



//initialization store
const store = createStore(
  addData,
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  )
);

// save the state for get data after reload
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)