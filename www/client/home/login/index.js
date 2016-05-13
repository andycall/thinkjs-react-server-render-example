import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import UserMenu from '../components/usermenu/index'

import { browserHistory } from 'react-router'

import $ from 'jquery'

require('./index.scss');

export default class Home extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    let target = e.target;
    let data = $(target).serializeObject();

    $.ajax({
      url: '/home/login/main',
      method: 'post',
      data: data,
      success: (data) => {
        if (data.errno === 0) {
          location.href = '/';
        }
        else {
          console.log(data);
        }
      }
    })
  }

  render() {

    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <UserMenu />
          <div>
            <div className="login-page">
              <h4 className="title">
                <span>登陆</span>
              </h4>
              <div className="login-container">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <input type="hidden" name="__CSRF__" value={this.context.token}/>
                  <div className="form-group">
                    <span className="add-on"><i className="fa fa-envelope-o"></i></span>
                    <input type="text" name="email" placeholder="你的邮件地址"/>
                  </div>
                  <div className="form-group">
                    <span className="add-on"><i className="fa fa-unlock-alt"></i></span>
                    <input type="password" name="password" placeholder="输入密码"/>
                  </div>
                  <div className="form-group">
                    <button name="button" type="submit" className="ladda-button submit-button">
                      <span className="ladda-label">登陆</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    )
  }
}

Home.contextTypes = {
  token: React.PropTypes.string
};