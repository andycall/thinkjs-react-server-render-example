import React from 'react'
import {Link} from 'react-router'

import './index.scss'

import image from './image/user.png'

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
        <div className="login-form">
          <a className="user avatar" data-toggle="dropdown" href="javascript:void(0)">
            <img src={image} />
            <b className="caret" />
          </a>
          <ul className="dropdown-menu arrow-top">
            <li>
              <Link to="/home/write"><i className="fa fa-pencil" /> 写文章</Link>
            </li>
            <li>
              <a href="/home/login/logout"><i className="fa fa-sign-out" /> 登出</a>
            </li>
          </ul>
        </div>
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