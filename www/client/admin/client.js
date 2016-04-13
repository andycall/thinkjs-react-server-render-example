import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'

import routes from './route/RootRoute'
const {pathname, search, hash} = window.location
const location = `${pathname}${search}${hash}`

match({routes, location}, () => {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('react-dom')
  )
});