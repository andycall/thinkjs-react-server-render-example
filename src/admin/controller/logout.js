'use strict'

import Base from './base.js'

export default class extends Base {
  async indexAction() {
    let isLogin = await this.isLogin();
    if (isLogin) {
      await this.session('userInfo', null);
      this.redirect('/admin/login');
    } else {
      this.redirect('/admin/login');
    }
  }
}