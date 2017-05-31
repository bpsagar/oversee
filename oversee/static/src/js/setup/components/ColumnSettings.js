import React from 'react'
import Modal from './Modal'

const BLEND_MODES = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
  'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
  'exclusion', 'hue', 'saturation', 'color', 'luminosity'
]

class ColumnSettings extends React.Component {
  getCurrentBlendMode = () => {
    return this.props.properties.blend_mode || 'normal'
  }

  handleBlendModeChange = (e) => {
    this.props.updateProperty('blend_mode', e.target.value)
  }

  handleLoopChange = (e) => {
    if (e.target.checked) {
      this.props.updateProperty('loop', true)
    }
    else {
      this.props.updateProperty('loop', false)
    }
  }

  handleLoopPointChange = (e) => {
    this.props.updateProperty('loop_point', e.target.value)
  }

  render = () => (
    <Modal onClose={this.props.hide} title="Settings">
      <div>
        <label>
          Blend Mode
          <select value={this.getCurrentBlendMode()} onChange={this.handleBlendModeChange}>
            {BLEND_MODES.map(mode =>
              <option key={mode} value={mode}>{mode}</option>
            )}
          </select>
        </label>
      </div>
      {this.props.asset.type == 'video' &&
        <div>
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
          <div>
            <label>
              Loop Point
              <input
                type="text"
                value={this.props.properties.loop_point || 0}
                onChange={this.handleLoopPointChange}
              />
            </label>
          </div>
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
