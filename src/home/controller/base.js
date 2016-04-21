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


  init(http) {
    super.init(http);


    this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');
  }
}