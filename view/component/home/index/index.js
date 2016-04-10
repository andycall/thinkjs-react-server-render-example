import React from 'react'
import { Link } from 'react-router'


export default class Home extends React.Component {
  render () {
    require('./index.scss');
    
    return (
      <div>Home pag <Link to="/login">login</Link></div>
    )
  }
}