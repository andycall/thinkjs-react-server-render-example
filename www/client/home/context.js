import React from 'react'

export default class ContextComponent extends React.Component {
  getChildContext() {
    let { token, isLogin, username} = this.props;

    return {
      token,
      isLogin,
      username
    };
  }

  render() {
    return this.props.children
  }
}

ContextComponent.childContextTypes = {
  token: React.PropTypes.string,
  isLogin: React.PropTypes.bool,
  username: React.PropTypes.string
}