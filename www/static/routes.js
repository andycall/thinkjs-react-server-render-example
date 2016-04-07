import React from 'react'
import { Router, Route, hashHistory} from 'react-router'
import Login from './login/index'

const MainRouter = (
    <Router history={hashHistory}>
        <Route path="login" component={Login}></Route>
    </Router>
)

export default MainRouter;