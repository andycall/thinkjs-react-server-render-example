import React from 'react'

export default class ContextComponent extends React.Component {
  getChildContext() {
    return {
      token: this.props.token
    };
  }

  render() {
    return this.props.children
  }
}

ContextComponent.childContextTypes = {
  token: React.PropTypes.string
}