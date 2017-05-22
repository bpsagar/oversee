import axios from 'axios'
import { combineReducers } from 'redux'

// Actions
const LOAD_LAYERS = 'remote/LOAD_LAYERS'
const LOAD_SCREEN = 'remote/LOAD_SCREEN'

const SELECT_COLUMN = 'remote/SELECT_COLUMN'

// Action Creators
export const saveState = () => {
  return (dispatch, getState) => {
    var screen = getState().screen
    axios.post('/api/screen/update/', {screen})
  }
}

export const loadLayers = () => {
  return dispatch => {
    axios.get('/api/layers/')
      .then(response => {
        dispatch({type: LOAD_LAYERS, layers: response.data.layers})
      })
  }
}


export const loadScreen = () => {
  return dispatch => {
    axios.get('/api/screen/')
      .then(response => {
        dispatch({type: LOAD_SCREEN, screen: response.data.screen})
      })
  }
}

export const selectColumn = (layerNumber, columnNumber) => {
  return dispatch => {
    dispatch({type: SELECT_COLUMN, layerNumber, columnNumber})
    dispatch(saveState())
  }
}

// Reducers
const layers = (state = [], action) => {
  switch (action.type) {
    case LOAD_LAYERS:
      return action.layers
    default:
      return state
  }
}

const screen = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SCREEN:
      return action.screen
    case SELECT_COLUMN:
      return {
        ...state,
        [action.layerNumber]: action.columnNumber
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  layers,
  screen
})

export default reducer
