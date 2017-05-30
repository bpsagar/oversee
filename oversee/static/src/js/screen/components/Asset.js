import React from 'react'
import axios from 'axios'

class Asset extends React.Component {
  state = {
    videoEnded: false
  }

  playNextColumn = () => {
    axios.post(
      '/api/select-column/',
      {layer: this.props.layer_number, column: (this.props.number + 1)}
    )
  }

  handleVideoEnd = () => {
    this.setState({...this.state, videoEnded: true})
  }

  handleTimeUpdate = (e) => {
    if (this.asset.currentTime >= this.asset.duration - 1) {
      if (!this.state.videoEnded) {
        if (this.props.properties.play_next) {
          this.playNextColumn()
        }
      }
    }
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.asset.type == 'video') {
      if (!this.props.visible && newProps.visible) {
        this.asset.play()
        this.asset.addEventListener('timeupdate', this.handleTimeUpdate, false)
        this.asset.addEventListener('ended', this.handleVideoEnd, false)
      }
      else if (this.props.visible && !newProps.visible) {
        this.asset.pause()
        this.asset.currentTime = 0
        this.asset.removeEventListener('timeupdate', this.handleTimeUpdate)
        this.asset.removeEventListener('ended', this.handleVideoEnd)
        this.setState({...this.state, videoEnded: false})
      }
    }
  }

  componentDidMount = () => {
    if (this.props.asset.type == 'video' && this.props.visible) {
      this.asset.play()
      this.asset.addEventListener('timeupdate', this.handleTimeUpdate, false)
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
          loop={this.props.properties.loop}
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
