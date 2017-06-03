import React from 'react'
import axios from 'axios'

import AssetCache from '../AssetCache'
import Layer from './Layer'
import Modal from '../../setup/components/Modal'

class Screen extends React.Component {
  state = {
    layers: [],
    contentLoaded: false,
    loadedAssets: [],
    status: ''
  }

  getAssetToLoad = () => {
    var asset = null
    this.state.layers.map(layer => {
      layer.layer.columns.map(column => {
        if (this.state.loadedAssets.indexOf(column.asset.filename) == -1) {
          asset = column.asset;
        }
      })
    })
    return asset
  }

  loadAsset = (asset, cb) => {
    this.setState({...this.state, status: `Loading ${asset.filename}`})
    AssetCache.load(asset, () =>{
      this.setState({
        ...this.state,
        loadedAssets: [
          ...this.state.loadedAssets,
          asset.filename
        ]
      })
      cb()
    })
  }

  loadAllAssets = () => {
    var asset = this.getAssetToLoad()
    if (asset === null) {
      this.setState({...this.state, contentLoaded: true})
      this.initInterval()
    }
    else {
      this.loadAsset(asset, () => {
        this.loadAllAssets()
      })
    }
  }

  fetchScreenAssets = () => {
    axios.get('/api/screen/assets/')
      .then(response => {
        this.setState({...this.state, layers: response.data.screen})
        this.loadAllAssets()
      })
  }

  initInterval = () => {
    if (this.intervalId !== null) {
      return
    }
    this.intervalId = setInterval(() => {
      this.fetchScreenAssets()
    }, 500)
  }

  componentDidMount = () => {
    this.intervalId = null
    this.fetchScreenAssets()
  }

  render = () => (
    <div className="output">
      {!this.state.contentLoaded &&
        <Modal title="Loading">
          <div>{this.state.status}</div>
        </Modal>
      }
      {this.state.contentLoaded &&
        <div className="output">
          {this.state.layers.map(layer =>
            <Layer key={layer.layer_number} {...layer} />
          )}
        </div>
      }
    </div>
  )
}

export default Screen
