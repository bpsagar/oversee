import React from 'react'
import axios from 'axios'

import Layer from './Layer'

class Screen extends React.Component {
  state = {
    layers: []
  }

  fetchScreenAssets = () => {
    axios.get('/api/screen/assets/')
      .then(response => {
        this.setState({...this.state, layers: response.data.screen})
      })
  }

  componentDidMount = () => {
    this.fetchScreenAssets()
    this.intervalId = setInterval(() => {
      this.fetchScreenAssets()
    }, 500)
  }

  render = () => (
    <div className="output">
      {this.state.layers.map(layer =>
        <Layer key={layer.layer_number} {...layer} />
      )}
    </div>
  )
}

export default Screen
