'use strict';

import Base from './base.js';

export default class extends Base {
  async __before () {
    super.__before();

    let isLogin = await this.isLogin();

    if (!isLogin) {
      this.redirect('/home/login');
    }
  }

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html

    this.__CLIENT_DATA__.postList = await this.listAction();

    return this.display(this.templateFile);
  }

  async listAction () {
    let page = this.get('page') || 0;
    let limit = this.get('limit') || 10;
    let model = this.model('article');

    return await model.page(page, limit).countSelect();
  }

  async submitAction () {
    let data = this.post();

    let model = this.model('article');

    let userInfo = await this.session('userInfo');

    let insertId = await model.addArticle(userInfo.id, data.title, data.content);

    return this.success(insertId);
  }
}