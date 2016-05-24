import React from 'react'
import _ from 'lodash'

console.error = (function() {
  var error = console.error

  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
      error.apply(console, arguments)
    }
  }
})()

export default class ContextComponent extends React.Component {
  getChildContext() {
    let { token, isLogin, username, avatar, postList, articleList } = this.props;

    return {
      token,
      isLogin,
      username,
      avatar,
      postList,
      articleList
    };
  }

  render() {
    return this.props.children
  }
}

ContextComponent.childContextTypes = {
  token: React.PropTypes.string,
  isLogin: React.PropTypes.bool,
  username: React.PropTypes.string,
  avatar: React.PropTypes.any,
  postList: React.PropTypes.object,
  articleList: React.PropTypes.object
}