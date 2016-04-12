import React from 'react'
import {Link} from 'react-router'
import Navigator from '../components/navigator/index'

require('./index.scss');

export default class Home extends React.Component {
  render() {

    return (
      <div>
        <Navigator />
        Home pag <a href="/admin/login">login</a>
        <Link to="/test">Test</Link>
        {this.props.children}
      </div>
    )
  }
}