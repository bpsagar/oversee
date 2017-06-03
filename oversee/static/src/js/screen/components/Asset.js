import React from 'react'
import axios from 'axios'

class Asset extends React.Component {
  state = {
    videoEnded: false
  }

  getLoopPoint = () => {
    return this.props.properties.loop_point || 0
  }

  handleVideoEnd = () => {
    if (this.props.properties.loop) {
      this.asset.currentTime = this.props.properties.loop_point
      this.asset.play()
    }
    else {
      this.setState({...this.state, videoEnded: true})
    }
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.asset.type == 'video') {
      if (!this.props.visible && newProps.visible) {
        this.asset.play()
        this.asset.addEventListener('ended', this.handleVideoEnd, false)
      }
      else if (this.props.visible && !newProps.visible) {
        this.asset.pause()
        this.asset.currentTime = 0
        this.asset.removeEventListener('ended', this.handleVideoEnd)
        this.setState({...this.state, videoEnded: false})
      }
    }
  }

  componentDidMount = () => {
    if (this.props.asset.type == 'video' && this.props.visible) {
      this.asset.play()
      this.asset.addEventListener('ended', this.handleVideoEnd, false)
    }
  }

  getStyle = () => {
    var style = {}

    if (this.state.videoEnded) {
      style.opacity = 0
    }

    return style
  }

  render = () => {
    if (this.props.asset.type == 'image') {
      return (
        <img src={this.props.asset.url}></img>
      )
    }
    if (this.props.asset.type == 'video') {
      return (
        <video
          loop={this.props.properties.loop && this.getLoopPoint() === 0}
          ref={dom => { this.asset = dom }}
          style={this.getStyle()}
        >
          <source src={this.props.asset.url}></source>
        </video>
      )
    }
  }
}

export default Asset
