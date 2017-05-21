import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducer from './state'

const configureStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(
      thunk
    )
  )
  return store
}

export default configureStore
