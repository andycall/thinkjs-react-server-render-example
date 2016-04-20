import React from 'react'
import SuperAgent from 'superagent'
import superAgentPromise from 'superagent-promise'
import $ from 'jquery'

var agent = superAgentPromise(SuperAgent, Promise);

import './index.less'
import './font.css'

export default class Test extends React.Component {
  constructor(props, context) {
    super(props);
  }

  componentWillMount () {
  }

  componentDidMount () {

  }

  onFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var data = $(form).serializeObject();

    data.__CSRF__ = this.context.token;

    agent.post('/admin/login', data)
      .end()
      .then(function (data) {
        console.log(data)
      });

    return false;
  }

  render() {

    return (
      <div className="_namespace">
        <div className="container">
          <h1>Welcome</h1>
          <form onSubmit={this.onFormSubmit.bind(this)} className="form">
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
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

Test.contextTypes = {
  token: React.PropTypes.string.isRequired
}