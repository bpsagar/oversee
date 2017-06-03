import React from 'react'

class Asset extends React.Component {
  render = () => (
    <div className="preview-wrapper">
      {this.props.type == 'image' &&
        <div className="preview" data-name={this.props.name} style={{backgroundImage: `url('${this.props.url}')`}}></div>
      }
      {this.props.type == 'video' &&
        <div className="preview" data-name={this.props.name} style={{backgroundImage: `url('${this.props.preview}')`}}></div>
      }
    </div>
  )
}

export default Asset
