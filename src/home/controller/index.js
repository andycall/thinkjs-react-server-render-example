'use strict';

import Base from './base.js';
import moment from 'moment'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html

    let articleModel = this.model('article');
    let articleList = await articleModel.getArticleWithUser();

    moment.locale('zh-CN');

    this.__CLIENT_DATA__.articleList = {
      data: articleList.map((val) => {
        val.create_time = moment(parseInt(val.create_time)).fromNow();
        return val;
      })
    };

    return this.display(this.templateFile);
  }

  async articleAction () {
    let articleModel = this.model('article');
    let page = this.get('page') || 0;

    let articleList = await articleModel.getArticleWithUser(page);

    return this.success(articleList);
  }
}