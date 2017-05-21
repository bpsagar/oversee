import React from 'react'
import { connect } from 'react-redux'

import Layer from './Layer'
import * as actions from '../state'

class LayerStack extends React.Component {
  render = () => (
    <div className="container">
      <div>
        <button className="button block" onClick={this.props.addLayer}>Add Layer</button>
      </div>
      {this.props.layers.slice(0).reverse().map(layer =>
        <Layer key={layer.number} {...layer} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  layers: state.layers
})

const mapDispatchToProps = (dispatch) => ({
  addLayer: () => {
    dispatch(actions.addLayer())
  }
})

LayerStack = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayerStack)

export default LayerStack
