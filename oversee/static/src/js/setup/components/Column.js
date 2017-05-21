import React from 'react'

import Asset from './Asset'
import ColumnSettings from './ColumnSettings'

class Column extends React.Component {
  state = {
    showSettings: false
  }

  showSettings = () => {
    this.setState({...this.state, showSettings: true})
  }

  hideSettings = () => {
    this.setState({...this.state, showSettings: false})
  }

  render = () => (
    <div>
      <Asset {...this.props.asset} />
      <button className="button small" onClick={this.showSettings}>Settings</button>
      <button className="button outline small" onClick={this.props.delete}>Delete</button>
      {this.state.showSettings &&
        <ColumnSettings
          asset={this.props.asset}
          hide={this.hideSettings}
          properties={this.props.properties}
          updateProperty={this.props.updateProperty}
        />
      }
    </div>
  )
}

export default Column
