import React from 'react'
import {Link} from 'react-router'

import './index.scss'

export default class UserMenu extends React.Component {
  render() {
    let isLogin = this.context.isLogin;
    let loginForm;

    if (!isLogin) {
      loginForm = (
        <div>
          <Link to="/home/register" className="login">
            <i className="fa fa-user"></i>
            <span>注册</span>
          </Link>
          <Link to="/home/login" className="login">
            <i className="fa fa-sign-in"></i>
            <span>登陆</span>
          </Link>
        </div>
      )
    }
    else {
      loginForm = (
          <div>The username is : {this.context.username}</div>
      )
    }

    return (
      <div className="_namespace">
        {loginForm}
      </div>
    )
  }
}

UserMenu.contextTypes = {
  isLogin: React.PropTypes.bool,
  username: React.PropTypes.string
};