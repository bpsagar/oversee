import React from 'react'

import Asset from './Asset'

class Layer extends React.Component {
  state = {
    currentColumnNumber: this.props.column_number,
    nextColumnNumber: this.props.column_number
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.column_number !== this.state.currentColumnNumber) {
      this.setState({
        ...this.state,
        nextColumnNumber: newProps.column_number
      })

      setTimeout(() => {
        this.setState({
          ...this.state,
          currentColumnNumber: newProps.column_number
        })
      }, 1000)
    }
  }

  getColumn = (columnNumber) => {
    if (columnNumber === null) {
      return null
    }
    return this.props.layer.columns.find(column => column.number == columnNumber)
  }

  render = () => {
    return (
      <div>
        {this.state.currentColumnNumber !== this.state.nextColumnNumber &&
          this.state.currentColumnNumber !== null &&
          this.state.nextColumnNumber !== null &&
          <div className="output" style={{backgroundColor: 'black'}}></div>
        }
        {this.props.layer.columns.map(column => {
          if (this.state.currentColumnNumber === column.number) {
            return (
              <div key={column.number} className={this.state.nextColumnNumber !== this.state.currentColumnNumber ? "output fade out" : "output"}>
                <Asset layer_number={this.props.layer_number} {...column} visible={true} />
              </div>
            )
          }
          if (this.state.nextColumnNumber === column.number && this.state.currentColumnNumber !== this.state.nextColumnNumber) {
            return (
              <div key={column.number} className={this.state.nextColumnNumber ? "output fade in" : "output"}>
                <Asset layer_number={this.props.layer_number} {...column} visible={true} />
              </div>
            )
          }
          return (
            <div key={column.number} className="output hidden">
              <Asset layer_number={this.props.layer_number} {...column} visible={false} />
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default Layer
