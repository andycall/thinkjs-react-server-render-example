import React from 'react'
import {Link, IndexLink} from 'react-router'
import Tooltip from 'rc-tooltip'

import 'rc-tooltip/assets/bootstrap.css'
import './index.scss'

export default class Navigator extends React.Component {
  render() {
    let isLogin = this.context.isLogin;
    let loginToolKit;

    if (isLogin) {
      loginToolKit = (
      <a className="signin" href="/home/login/logout">
        <Tooltip
          placement="right"
          overlay={'登出'}
          mouseEnterDelay={0.1}
          animation="zoom"
        >
          <i className="fa fa-sign-in" />
        </Tooltip>
      </a>
      )
    }
    else {
      loginToolKit = (
        <Link className="signin" to="/home/login">
          <Tooltip
            placement="right"
            overlay={'登入'}
            mouseEnterDelay={0.1}
            animation="zoom"
          >
            <i className="fa fa-sign-in" />
          </Tooltip>
        </Link>
      )
    }

    return (
      <div className="_namespace">
        <div className="dropdown">
          <Tooltip
            placement="right"
            mouseEnterDelay={0.1}
            overlay={'helloworld'}
            animation="zoom"
          >
            <IndexLink className="home" to="/" activeClassName="active">
              <b>坛</b>
            </IndexLink>
          </Tooltip>
          <Tooltip
            placement="right"
            overlay={'helloworld'}
            mouseEnterDelay={0.1}
            animation="zoom"
          >
            <Link className="home" to="/home/write" activeClassName="active">
              <i className="fa fa-pencil"></i>
            </Link>
          </Tooltip>
        </div>
        <div className="users">
          {loginToolKit}
        </div>
      </div>
    )
  }
}

Navigator.contextTypes = {
  isLogin: React.PropTypes.bool
};