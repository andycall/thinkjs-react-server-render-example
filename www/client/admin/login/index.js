import React from 'react'
import {Link} from 'react-router'

export default class Test extends React.Component {
  render() {
    console.log('login rendering');

    return <div>
      <h2>This is Login page</h2>
      <div><Link to="/admin">go home</Link></div>
    </div>
  }
}