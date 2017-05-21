import React from 'react'
import Modal from './Modal'

class ColumnSettings extends React.Component {
  handleLoopChange = (e) => {
    if (e.target.checked) {
      this.props.updateProperty('loop', true)
    }
    else {
      this.props.updateProperty('loop', false)
    }
  }

  render = () => (
    <Modal onClose={this.props.hide}>
      <div className="container">
        <div>Column Settings</div>
        {this.props.asset.type == 'image' && 
          <div>No settings for images yet</div>
        }
        {this.props.asset.type == 'video' &&
          <div>
            <label>
              <input
                type="checkbox"
                checked={this.props.properties.loop || false}
                onChange={this.handleLoopChange}
              />
              Loop Video
            </label>
          </div>
        }
      </div>
    </Modal>
  )
}

export default ColumnSettings
