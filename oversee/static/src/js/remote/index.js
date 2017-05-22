import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import * as actions from './state'
import configureStore from './configureStore'
import Remote from './components/Remote'

const store = configureStore()

render(
  <Provider store={store}>
    <Remote />
  </Provider>,
  document.getElementById('remote')
)

store.dispatch(actions.loadLayers())
store.dispatch(actions.loadScreen())
