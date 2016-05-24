'use strict';

import Base from './base.js';
import revalidate from 'revalidator'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let isLogin = await this.isLogin();

    if (isLogin) {
      return this.redirect('/');
    }

    return this.display(this.templateFile);
  }

  async mainAction() {
    let isLogin = await this.isLogin();

    if (!isLogin) {
      let email = this.post('email');
      let password = this.post('password');

      let validate = revalidate.validate({
        email: email,
        password: password
      }, {
        properties: {
          email: {
            required: true,
            format: 'email',
            type: 'string',
            description: '用户名错误'
          },
          password: {
            required: true,
            pattern: /\w{2,10}/,
            type: 'string',
            description: '密码错误'
          }
        }
      });

      if (!validate.valid) {
        return this.fail('PASSWORD_ERROR');
      }

      let ip = this.ip();
      let result = await this.model('admin/user').signin(email, password, ip);

      if (typeof result === 'string') {
        return this.fail(result);
      }

      await this.session('userInfo', result);

      if (this.isAjax()) {
        this.success({
          status: 'ok'
        });
      }
      else {
        this.redirect('/');
      }
    }
    else {
      if (this.isAjax()) {
        this.success({
          status: 'ok'
        });
      }
      else {
        this.redirect('/');
      }
    }
  }

  async logoutAction () {
    let isLogin = await this.isLogin();

    if (isLogin) {
      await this.session('userInfo', null);

      if (this.isAjax()) {
        this.success({
          status: 'ok'
        })
      }
      else {
        this.redirect('/');
      }
    }
    else {
      if (this.isAjax()) {
        this.success({
          status: 'ok'
        })
      }
      else {
        this.redirect('/');
      }
    }
  }
}