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

    let userInfo = await this.session('userInfo');

    this.__CLIENT_DATA__.postList = await this.getList(userInfo.id);

    return this.display(this.templateFile);
  }

  async getList (user_id) {
    let page = this.get('page') || 0;
    let limit = this.get('limit') || 10;
    let model = this.model('article');

    return model.getArticleByUserID(user_id, page, limit);
  }

  async listAction () {
    let userInfo = await this.session('userInfo');
    let postList = await this.getList(userInfo.id);

    return this.success(postList);
  }

  async submitAction () {
    let data = this.post();
    let mode = data.mode;

    let model = this.model('article');
    let userInfo = await this.session('userInfo');
    let insertId;

    if (mode === 'new') {
      insertId = await model.addArticle(userInfo.id, data.title, data.content, data.obj);
    }
    else if (mode === 'update'){
      insertId = await model.updateArticle(data.id, data.title, data.content, data.obj);
    }
    else {
      return this.fail('unknown editor mode')
    }

    return this.success(insertId);
  }
}