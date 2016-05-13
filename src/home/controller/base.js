'use strict';

import path from 'path'

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  async __before() {
    this.assign('html', this.http._body);
  }

  async isLogin() {
    let user = await this.session('userInfo') || {};
    return !think.isEmpty(user);
  }


  async init(http) {
    super.init(http);

    let isLogin = await this.isLogin();

    let __CLIENT_DATA__ = {};

    __CLIENT_DATA__.isLogin = isLogin;

    if (isLogin) {
      let user = await this.session('userInfo');

      __CLIENT_DATA__.username = user.name;
      __CLIENT_DATA__.avatar = user.avatar;
    }

    this.assign('__CLIENT_DATA__', encodeURIComponent(JSON.stringify(__CLIENT_DATA__)));
    this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');
  }
}