import React from 'react'
import $ from 'jquery'
import validator from 'revalidator'

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

export default class Login extends React.Component {
  
  componentDidMount () {
    $('body').addClass('login');
  }
  
  componentWillUnmount () {
    $('body').removeClass('login')
  }
  
  onSubmit (e) {
    e.preventDefault();
    var data = $(e.target).serializeObject();
    
    
    $.ajax({
      url: '/admin/login',
      method: 'post',
      data: data,
      success: (data) => {
        location.href = '/admin'
      }
    });
   
    return false;
  }
  
  render() {
    require('./index.scss');


    return (
      <div className="module form-module">
        <div className="form">
          <h2>网站后台管理系统</h2>
          <form id="form" onSubmit={this.onSubmit.bind(this)}>
            <input type="text" name="usermail" placeholder="用户名或者邮箱"/>
            <input type="password" name="password" placeholder="密码"/>
            <input type="hidden" name="__CSRF__" defaultValue={window.csrfToken} />
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}