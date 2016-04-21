import React from 'react'

import './index.scss'

export default class ContentContainer extends React.Component {
  render() {
    return (
      <div className="_namespace">
        {this.props.children}
      </div>
    )
  }
}