'use strict';
/**
 * rest controller
 * @type {Class}
 */

'use strict'

import Base from './base.js'

export default class extends Base {
  __before () {
    if (!this.isPost()) {
      return this.http.redirect('/');
    }
  }
  
  async indexAction () {
    let username = this.post('username');
    let password = this.post('password');
    let email = this.post('email');
    let ip = this.http.ip();
    
    let userModel = this.model('user');

    // TODO 邮箱验证
    let status = await userModel.addUser({
      username: username,
      password: password,
      email: email
    }, ip);
    
    return this.success({
      status: status
    })
  }
}