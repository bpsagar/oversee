import React from 'react'

class Modal extends React.Component {
  render = () => (
    <div className="modal">
      <div className="modal-backdrop" onClick={this.props.onClose}></div>
      <div className="modal-container">
        <div className="modal-title">{this.props.title}</div>
        <div className="modal-content">{this.props.children}</div>
      </div>
    </div>
  )
}

export default Modal
