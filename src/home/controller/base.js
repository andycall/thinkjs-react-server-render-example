'use strict';

import path from 'path'

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  __before () {
    this.__CLIENT_DATA__ = {};
    this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');

    let oldDisplay = this.display;
    this.display = (...args) => {

      this.assign('__CLIENT_DATA__', encodeURIComponent(JSON.stringify(this.__CLIENT_DATA__)));
      oldDisplay.apply(this, args);
    }
  }

  async isLogin() {
    let user = await this.session('userInfo') || {};
    return !think.isEmpty(user);
  }


  async init(http) {
    super.init(http);

    let isLogin = await this.isLogin();
    let token = await this.session('__CSRF__');

    this.__CLIENT_DATA__.isLogin = isLogin

    if (isLogin) {
      let user = await this.session('userInfo');

      this.__CLIENT_DATA__.username = user.name;
      this.__CLIENT_DATA__.avatar = user.avatar;
      this.__CLIENT_DATA__.token = token;
    }
  }
}