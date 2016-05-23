import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import ContextComponent from './context'

import routes from './route/RootRoute'
const {pathname, search, hash} = window.location
const location = `${pathname}${search}${hash}`

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './global.scss'

import './plugin'

console.error = (function() {
  var error = console.error

  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
      error.apply(console, arguments)
    }
  }
})()

match({routes, location}, () => {
  ReactDOM.render(
    <ContextComponent {...window.clientData}>
      <Router routes={routes} history={browserHistory}/>
    </ContextComponent>,
    document.getElementById('react-dom')
  )
})
