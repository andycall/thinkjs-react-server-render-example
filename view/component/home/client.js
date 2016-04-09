import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createHistory } from 'history'
import routes from './routes/IndexRoute'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({ routes, location}, () => {
  render(
    <Router routes={routes} history={createHistory} />,
    document.getElementById('react-dom')
  )
});