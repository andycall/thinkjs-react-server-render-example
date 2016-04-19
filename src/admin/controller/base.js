'use strict';

import path from 'path'

export default class extends think.controller.base {
  /**
   * some base method in here
   */


  async __before () {
    let http = this.http;
    var errorMount = await this.session('errorMount');

    let token = await this.session('__CSRF__');
    this.assign('token', token);

    if (errorMount > 10) {
      this.fail('MAX_MOUNT_ERROR');
    }

    if (http.controller === 'login' && http.action === 'index') {
      return;
    }

    let userInfo = await this.session('userInfo') || {};

    if (think.isEmpty(userInfo)) {
      if (this.isAjax()) {
        return this.fail('NOT_LOGIN');
      }
      else {
        return this.redirect('/admin/login');
      }
    }

    this.userInfo = userInfo;

    if (!this.isAjax()) {
      this.assign('userInfo', {
        id: userInfo.id,
        name: userInfo.username,
        email: userInfo.email
      });
    }
  }

  async isLogin() {
    let user = await this.session('userInfo') || {};
    return !think.isEmpty(user);
  }

  init(http) {
    super.init(http);

    this.templateFile = path.join(__dirname, '../../../view/admin/index_index.html');

    this.assign('html', this.http._reactBody);
  }
}