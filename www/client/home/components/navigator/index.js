import React from 'react'
import {Link} from 'react-router'
import Tooltip from 'rc-tooltip'

import 'rc-tooltip/assets/bootstrap.css'
import './index.scss'

export default class Navigator extends React.Component {
  render() {
    return (
      <div className="_namespace">
        <div className="dropdown">
          <Tooltip
            placement="right"
            mouseEnterDelay={0.1}
            overlay={'helloworld'}
            animation="zoom"
          >
            <Link className="home" activeClassName="active" to="/">
              <b>坛</b>
            </Link>
          </Tooltip>
          <Tooltip
            placement="right"
            overlay={'helloworld'}
            mouseEnterDelay={0.1}
            animation="zoom"
          >
            <Link to="/test" activeClassName="active">
              <i className="fa fa-th"></i>
            </Link>
          </Tooltip>
        </div>
        <div className="users">
          
        </div>
      </div>
    )
  }
}