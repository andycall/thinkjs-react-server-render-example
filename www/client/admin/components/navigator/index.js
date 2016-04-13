import React from 'react'
import logo from './logo_dark.png'

import './index.scss'

export default class Navigator extends React.Component {
  render() {
    return (
      <div id="header">
        <div className="container">
          <img src={logo}/>
        </div>
      </div>
    )
  }
}