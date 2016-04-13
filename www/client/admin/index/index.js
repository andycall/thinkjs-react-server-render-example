import React from 'react'
import {Link} from 'react-router'

require('./index.scss');

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>This is admin page</h2>
        <Link to="/admin/login">go Login</Link>
      </div>
    )
  }
}