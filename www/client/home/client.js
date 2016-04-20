import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import ContextComponent from './context'

import routes from './route/RootRoute'
const {pathname, search, hash} = window.location
const location = `${pathname}${search}${hash}`

match({routes, location}, () => {
  ReactDOM.render(
    <ContextComponent token={window.csrfToken}>
      <Router routes={routes} history={browserHistory}/>
    </ContextComponent>,
    document.getElementById('react-dom')
  )
})
