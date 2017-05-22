import React from 'react'

import Asset from '../../setup/components/Asset'

class Layer extends React.Component {
  render = () => (
    <div className="card">
      <div className="card-title">Layer {this.props.number}</div>
      <div className="card-content">
        <div>
          {this.props.columns.map(column =>
            <div
              className={column.number == this.props.selectedColumnNumber ? "grid-column bordered" : "grid-column"}
              key={column.number}
              onClick={() => this.props.selectColumn(column.number)}
            >
              <Asset {...column.asset} />
            </div>
          )}
          <div className={this.props.selectedColumnNumber == null ? "grid-column bordered" : "grid-column"}>
            <div className="preview-wrapper">
              <div className="preview button" onClick={() => this.props.selectColumn(null)} data-name="Blank"></div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

export default Layer
