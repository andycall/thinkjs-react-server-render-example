'use strict';

import moment from 'moment'
import xss from 'xss'

/**
 * model
 */
export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = "article"
  }

  async getArticleByUserID (userId, page = 0, limit = 10) {
    return await this.page(page, limit).where({
      article_creator: userId
    }).countSelect();
  }

  async getArticles (page = 0, limit = 10) {
    return await this.page(page, limit).countSelect();
  }

  async getArticleWithUser (page = 0, limit = 10) {
    let sql = this.parseSql(`select lawyer_article.*, name from lawyer_user
	right join lawyer_article
	on lawyer_user.id = lawyer_article.article_creator`);

    return await this.query(sql);
  }

  async addArticle (userId, title, content, obj) {
    let createTime = +new Date();

    return this.add({
      article_title: title,
      article_content: xss(content),
      article_creator: userId,
      article_obj: obj,
      create_time: createTime
    });
  }

  async updateArticle (articleId, title, content, obj) {
    let updateTime = +new Date();

    return await this.where({
      article_id: articleId
    }).update({
      article_title: title,
      article_content: xss(content),
      article_obj: obj,
      update_time: updateTime
    })
  }
}