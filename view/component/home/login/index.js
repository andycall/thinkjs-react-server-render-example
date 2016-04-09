import React from 'react'
import $ from 'jquery'
import validator from 'revalidator'

export default class Login extends React.Component {
  
  componentDidMount () {
    $('body').addClass('login');
  }
  
  componentWillUnmount () {
    $('body').removeClass('login')
  }
  
  onSubmit (e) {
    e.preventDefault();
   
    return false;
  }
  
  render() {
    require('./index.scss');

    return (
      <div className="module form-module">
        <div className="form">
          <h2>登陆</h2>
          <form id="form" onSubmit={this.onSubmit.bind(this)}>
            <input type="text" name="username" placeholder="用户名"/>
            <input type="password" name="password" placeholder="密码"/>
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}