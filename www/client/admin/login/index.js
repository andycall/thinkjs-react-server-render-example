import React from 'react'


import './index.less'
import './font.css'

export default class Test extends React.Component {
  componentWillMount () {

  }

  componentDidMount () {

  }

  render() {

    return (
      <div className="_namespace">
        <div className="container">
          <h1>Welcome</h1>
          <form className="form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}