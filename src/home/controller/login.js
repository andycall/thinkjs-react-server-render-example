'use strict';

import Base from './base.js';


export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    return this.display(this.templateFile);
  }

  async loginAction() {
    let isLogin = this.isLogin();

    let token = await this.session('__CSRF__');

    this.assign('token', token);
  }
}