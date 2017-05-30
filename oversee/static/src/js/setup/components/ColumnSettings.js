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

  handlePlayNextChange = (e) => {
    if (e.target.checked) {
      this.props.updateProperty('play_next', true)
    }
    else {
      this.props.updateProperty('play_next', false)
    }
  }

  render = () => (
    <Modal onClose={this.props.hide} title="Settings">
      {this.props.asset.type == 'image' && 
        <div>No settings for images yet</div>
      }
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
              <input
                type="checkbox"
                checked={this.props.properties.play_next || false}
                onChange={this.handlePlayNextChange}
              />
              Play Next
            </label>
          </div>
          <div>
            <label>
              Blend Mode
              <select onChange={this.handleBlendModeChange}>
                {BLEND_MODES.map(mode =>
                  <option value={mode} selected={mode === this.getCurrentBlendMode()}>{mode}</option>
                )}
              </select>
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
