import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../state'
import AssetBrowser from './AssetBrowser'
import Column from './Column'
import Modal from './Modal'

class Layer extends React.Component {
  state = {
    showAssetsBrowser: false
  }

  addColumn = (asset) => {
    this.setState({...this.state, showAssetsBrowser: false})
    this.props.addColumn(asset, {})
  }

  showAssetsBrowser = () => {
    this.setState({...this.state, showAssetsBrowser: true})
  }

  hideAssetsBrowser = () => {
    this.setState({...this.state, showAssetsBrowser: false})
  }

  render = () => (
    <div className="card">
      <div className="card-title">
        Layer {this.props.number}
        <div className="pull-right">
          <button className="button outline small" onClick={this.props.deleteLayer}>Delete</button>
        </div>
      </div>
      <div className="card-content">
        {this.props.columns.map(column =>
          <div key={`${column.number}-${column.asset.name}`} className="grid-column">
            <Column
              {...column}
              delete={() => this.props.deleteColumn(column.number)}
              updateProperty={(name, value) => this.props.updateColumnProperty(column.number, name, value)}
            />
          </div>
        )}
        <div className="grid-column">
          <div className="preview-wrapper">
            <div className="preview button" onClick={this.showAssetsBrowser} data-name="Add Column"></div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
      {this.state.showAssetsBrowser &&
        <Modal onClose={this.hideAssetsBrowser} title="Assets">
          <AssetBrowser onAssetClick={this.addColumn} />
        </Modal>
      }
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addColumn: (asset, properties) => {
    dispatch(actions.addColumn(ownProps.number, asset, properties))
  },
  deleteLayer: () => {
    dispatch(actions.deleteLayer(ownProps.number))
  },
  deleteColumn: (columnNumber) => {
    dispatch(actions.deleteColumn(ownProps.number, columnNumber))
  },
  updateColumnProperty: (columnNumber, name, value) => {
    dispatch(actions.updateColumnProperty(ownProps.number, columnNumber, name, value))
  }
})

Layer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layer)

export default Layer
