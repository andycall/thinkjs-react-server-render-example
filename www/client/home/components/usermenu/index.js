import React from 'react'
import {Link} from 'react-router'


import './index.scss'

export default class UserMenu extends React.Component {
  render() {
    return (
      <div className="_namespace">
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
}