import React from 'react'



const MainRouter = (
    <Router history={hashHistory}>
        <Route path="login" component={Login}></Route>
        <Route path="/" component={Home}></Route>
    </Router>
)

export default MainRouter;