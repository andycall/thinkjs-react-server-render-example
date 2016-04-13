import React from 'react'
import {Link} from 'react-router'

export default class Test extends React.Component {
  render() {
    console.log('test rendering');

    return <div>
      <h2>This is Test page</h2>
      <div><Link to="/">go home</Link></div>
    </div>
  }
}