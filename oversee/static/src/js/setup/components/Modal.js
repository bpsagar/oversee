import React from 'react'

class Modal extends React.Component {
  render = () => (
    <div className="modal">
      <div className="modal-backdrop" onClick={this.props.onClose}></div>
      <div className="modal-container">
        {this.props.children}
      </div>
    </div>
  )
}

export default Modal
