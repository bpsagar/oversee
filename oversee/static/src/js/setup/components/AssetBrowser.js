import React from 'react'
import { connect } from 'react-redux'

import Asset from './Asset'

class AssetBrowser extends React.Component {
  render = () => (
    <div>
      <div>
        {this.props.assets.map(asset =>
          <div key={asset.name} className="grid-column" onClick={() => this.props.onAssetClick(asset)}>
            <Asset {...asset} />
          </div>
        )}
        <div className="clearfix"></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  assets: state.assets
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

AssetBrowser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetBrowser)

export default AssetBrowser
