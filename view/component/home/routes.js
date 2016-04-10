import React from 'react'
import { Router, Route, hashHistory } from 'react-router'


import Login from './login'
import Index from './index/index'

const MainRouter = (
    <Router history={hashHistory}>
        <Route path="login" component={Login}></Route>
        <Route path="/" component={Index}></Route>
    </Router>
)

export default MainRouter;