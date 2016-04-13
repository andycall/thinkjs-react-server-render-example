import React from 'react'
import {Link} from 'react-router'
import Navigator from '../components/navigator/index'

require('./index.scss');

export default class Home extends React.Component {
  render() {
    console.log('index page rendering');
    return (
      <div>
        <Navigator />
        <p><Link to="/test">Go to test page</Link></p>
      </div>
    )
  }
}