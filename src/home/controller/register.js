'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    //auto render template file index_index.html
    return this.display(this.templateFile);
  }

  async mainAction () {
    let username = this.post('username');
    let password = this.post('password');
    let email = this.post('email');
    let ip = this.http.ip();

    let userModal = this.model('admin/user');

    let status = await userModal.addUser({
      username: username,
      email: email,
      password: password,
      type: 0
    }, ip);

    if (status.type == 'exist') {
      return this.fail('USER_EXIST');
    }
    else if (status.type !== 'add') {
      return this.fail('ACCOUNT_ERROR');
    }

    return this.success(status);
  }
}