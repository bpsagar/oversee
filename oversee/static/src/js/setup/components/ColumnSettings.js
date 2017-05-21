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
    <Modal onClose={this.props.hide} title="Settings">
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
      <div className="vspacing">
        <div className="pull-right">
          <button className="button outline" onClick={this.props.delete}>Delete</button>
          <button className="button" onClick={this.props.hide}>Okay</button>
        </div>
        <div className="clearfix"></div>
      </div>
    </Modal>
  )
}

export default ColumnSettings
