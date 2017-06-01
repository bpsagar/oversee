import axios from 'axios'
import { combineReducers } from 'redux'

// Actions
const LOAD_ASSETS = 'setup/LOAD_ASSETS'
const LOAD_LAYERS = 'setup/LOAD_LAYERS'

const ADD_LAYER = 'setup/ADD_LAYER'
const DELETE_LAYER = 'setup/DELETE_LAYER'
const MOVE_LAYER = 'setup/MOVE_LAYER'

const ADD_COLUMN = 'setup/ADD_COLUMN'
const DELETE_COLUMN = 'setup/DELETE_COLUMN'
const MOVE_COLUMN = 'setup/MOVE_COLUMN'

const UPDATE_COLUMN_PROPERTY = 'setup/UPDATE_COLUMN_PROPERTY'

// Action Creators
export const saveState = () => {
  return (dispatch, getState) => {
    var layers = getState().layers
    axios.post('/api/layers/update/', {layers})
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

export const loadAssets = () => {
  return dispatch => {
    axios.get('/api/assets/')
      .then((response) => {
        dispatch({type: LOAD_ASSETS, assets: response.data.assets})
      })
  }
}

export const addLayer = () => {
  return dispatch => {
    dispatch({type: ADD_LAYER})
    dispatch(saveState())
  }
}

export const deleteLayer = (number) => {
  return dispatch => {
    dispatch({type: DELETE_LAYER, number})
    dispatch(saveState())
  }
}

export const moveLayer = (direction, number) => {
  return dispatch => {
    dispatch({type: MOVE_LAYER, direction, number})
    dispatch(saveState())
  }
}

export const addColumn = (layerNumber, asset, properties = {}) => {
  return dispatch => {
    dispatch({type: ADD_COLUMN, layerNumber, asset, properties})
    dispatch(saveState())
  }
}

export const deleteColumn = (layerNumber, columnNumber) => {
  return dispatch => {
    dispatch({type: DELETE_COLUMN, layerNumber, columnNumber})
    dispatch(saveState())
  }
}

export const moveColumn = (direction, layerNumber, columnNumber) => {
  return dispatch => {
    dispatch({type: MOVE_COLUMN, direction, layerNumber, columnNumber})
    dispatch(saveState())
  }
}

export const updateColumnProperty = (layerNumber, columnNumber, name, value) => {
  return dispatch => {
    dispatch({type: UPDATE_COLUMN_PROPERTY, layerNumber, columnNumber, name, value})
    dispatch(saveState())
  }
}

// Reducers
const assets = (state = [], action) => {
  switch (action.type) {
    case LOAD_ASSETS:
      return action.assets
    default:
      return state
  }
}

const layers = (state = [], action) => {
  switch (action.type) {
    case LOAD_LAYERS:
      return action.layers
    case ADD_LAYER:
      return [
        ...state,
        {
          columns: [],
          number: state.length + 1
        }
      ]
    case DELETE_LAYER:
      return [
        ...state.slice(0, action.number - 1),
        ...(state.slice(action.number).map(layer => ({
          ...layer,
          number: layer.number - 1
        })))
      ]
    case MOVE_LAYER:
      if (action.direction === 'up') {
        if (action.number === state.length) {
          return state
        }
        var index = action.number - 1
        return [
          ...state.slice(0, index),
          {
            ...state[index + 1],
            number: index + 1
          },
          {
            ...state[index],
            number: index + 2
          },
          ...state.slice(index + 2)
        ]
      }
      else {
        if (action.number === 1) {
          return state
        }
        var index = action.number - 1
        return [
          ...state.slice(0, index - 1),
          {
            ...state[index],
            number: index
          },
          {
            ...state[index - 1],
            number: index + 1
          },
          ...state.slice(index + 1)
        ]
      }
    case ADD_COLUMN:
      return state.map(layer => {
        if (layer.number === action.layerNumber) {
          return {
            ...layer,
            columns: [
              ...layer.columns,
              {
                number: layer.columns.length + 1,
                asset: action.asset,
                properties: action.properties
              }
            ]
          }
        }
        return layer
      })
    case DELETE_COLUMN:
      var layer = state[action.layerNumber - 1]
      return [
        ...state.slice(0, action.layerNumber - 1),
        {
          ...layer,
          columns: [
            ...layer.columns.slice(0, action.columnNumber - 1),
            ...(layer.columns.slice(action.columnNumber).map(column => ({
              ...column,
              number: column.number - 1
            })))
          ]
        },
        ...state.slice(action.layerNumber)
      ]
    case MOVE_COLUMN:
      var layer = state[action.layerNumber - 1]
      if (action.direction === 'left' && action.columnNumber === 1) {
        return state
      }
      if (action.direction === 'right' && action.columnNumber === layer.columns.length) {
        return state
      }
      var index = action.columnNumber - 1
      if (action.direction == 'left') {
          index = action.columnNumber - 2
      }
      return [
        ...state.slice(0, action.layerNumber - 1),
        {
          ...layer,
          columns: [
            ...layer.columns.slice(0, index),
            {
              ...layer.columns[index + 1],
              number: index + 1
            },
            {
              ...layer.columns[index],
              number: index + 2
            },
            ...layer.columns.slice(index + 2)
          ]
        },
        ...state.slice(action.layerNumber)
      ]
    case UPDATE_COLUMN_PROPERTY:
      return state.map(layer => {
        if (layer.number === action.layerNumber) {
          return {
            ...layer,
            columns: layer.columns.map(column => {
              if (column.number == action.columnNumber) {
                return {
                  ...column,
                  properties: {
                    ...(column.properties || {}),
                    [action.name]: action.value
                  }
                }
              }
              return column
            })
          }
        }
        return layer
      })
    default:
      return state
  }
}

const reducer = combineReducers({
  assets,
  layers
})

export default reducer
