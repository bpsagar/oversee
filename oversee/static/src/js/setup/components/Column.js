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
      <div onClick={this.showSettings}>
        <Asset {...this.props.asset} />
      </div>
      {this.state.showSettings &&
        <ColumnSettings
          asset={this.props.asset}
          delete={this.props.delete}
          hide={this.hideSettings}
          properties={this.props.properties}
          updateProperty={this.props.updateProperty}
        />
      }
    </div>
  )
}

export default Column
