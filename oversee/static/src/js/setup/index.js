import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import * as actions from './state'
import configureStore from './configureStore'
import LayerStack from './components/LayerStack'

const store = configureStore()

render(
  <Provider store={store}>
    <LayerStack />
  </Provider>,
  document.getElementById('setup')
)

store.dispatch(actions.loadAssets())
store.dispatch(actions.loadLayers())
