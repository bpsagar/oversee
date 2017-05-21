import React from 'react'

class Asset extends React.Component {
  state = {
    previewURL: null
  }

  componentDidMount = () => {
    if (this.props.type == 'video') {
      var video = document.createElement('video')
      video.src = this.props.url
      var canvas = document.createElement('canvas')
      video.addEventListener('loadeddata', () => {
        var ctx = canvas.getContext('2d')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)
        this.setState({...this.state, previewURL: canvas.toDataURL()})
        video.currentTime = video.duration / 2
        video.addEventListener('seeked', () => {
          ctx.drawImage(video, 0, 0)
          this.setState({...this.state, previewURL: canvas.toDataURL()})
        })
      })
    }
  }

  render = () => (
    <div className="preview-wrapper">
      {this.props.type == 'image' &&
        <div className="preview" data-name={this.props.name} style={{backgroundImage: `url('${this.props.url}')`}}></div>
      }
      {this.props.type == 'video' &&
        <div className="preview" data-name={this.props.name} style={{backgroundImage: `url('${this.state.previewURL}')`}}></div>
      }
    </div>
  )
}

export default Asset
