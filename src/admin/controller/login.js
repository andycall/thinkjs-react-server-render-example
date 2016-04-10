'use strict'

import Base from './base.js'

export default class extends Base {
  __before() {
    if (!this.isPost()) {
      return this.http.redirect('../home/index');
    }
  }

  async indexAction() {
    //auto render template file index_index.html

    let usermail = this.post('usermail');
    let userModel = this.model('user');
    let userInfo = await userModel.where({
      name: usermail,
      email: usermail,
      _logic: 'OR'
    }).find();

    if (think.isEmpty(userInfo)) {
      return this.fail('NO_USER');
    }

    // 校验密码
    let password = this.post('password');
    if (!userModel.checkPassword(userInfo, password)) {
      return this.fail('PASSWORD_ERROR');
    }

    await this.session('userInfo', userInfo);

    return this.success();
  }
}