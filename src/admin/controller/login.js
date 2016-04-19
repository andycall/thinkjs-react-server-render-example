'use strict';

import Base from './base.js';

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
      let usermail = this.post('usermail');
      let password = this.post('password');
      let ip = this.ip();

      let result = this.model('user').signin(usermail, password, ip);

      if (typeof result === 'string') {
        return this.fail(result);
      }

      // TODO 记录行为
      await this.session('userInfo', result);

      if (this.isAjax()) {
        this.success({
          status: 0
        });
      }
      else {
        this.redirect('/admin/index');
      }
    }
    else {
      if (isLogin) {
        this.redirect('/admin/index');
      }
      else {
        return this.display(this.templateFile);
      }
    }
  }
}