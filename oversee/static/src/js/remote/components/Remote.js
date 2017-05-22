import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../state'
import Layer from './Layer'

class Remote extends React.Component {
  render = () => (
    <div className="container">
      {this.props.layers.slice(0).reverse().map(layer =>
        <Layer
          key={layer.number} {...layer}
          selectedColumnNumber={this.props.screen[layer.number] || null}
          selectColumn={(columnNumber) => this.props.selectColumn(layer.number, columnNumber)}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  layers: state.layers,
  screen: state.screen
})

const mapDispatchToProps = dispatch => ({
  selectColumn: (layerNumber, columnNumber) => {
    dispatch(actions.selectColumn(layerNumber, columnNumber))
  }
})

Remote = connect(
  mapStateToProps,
  mapDispatchToProps
)(Remote)

export default Remote
