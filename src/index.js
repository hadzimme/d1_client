import 'babel-polyfill'
import React from 'react'
import {
  render,
} from 'react-dom'
import {
  Provider,
} from 'react-redux'
import configureStore from './configureStore'
import App from './containers/App'

const store = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)
render(<Root />, rootElement)
