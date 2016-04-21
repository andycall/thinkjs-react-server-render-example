'use strict';

import Base from './base.js';
import revalidator from 'revalidator'

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let isLogin = await this.isLogin();

    let token = await this.session('__CSRF__');

    this.assign('token', token);

    if (this.isPost()) {
      let usermail = this.post('username');
      let password = this.post('password');

      var validate = revalidator.validate({
        usermail: usermail,
        password: password
      }, {
        properties: {
          usermail: {
            required: true,
            pattern: /[a-zA-Z_0-9]{2,10}/,
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

      let result = await this.model('user').signin(usermail, password, ip);

      if (typeof result === 'string') {
        return this.fail(result);
      }

      // TODO 记录行为
      await this.session('userInfo', result);

      if (this.isAjax()) {
        this.success({
          status: 'ok'
        });
      }
      else {
        this.redirect('/admin/index');
      }
    }
    else {
      return this.display(this.templateFile);
    }
  }
}