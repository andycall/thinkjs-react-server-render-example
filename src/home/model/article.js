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

  async addArticle (userId, title, content) {
    let createTime = moment().format('YYYY-MM-DD HH:mm:ss');

    return this.add({
      article_title: title,
      article_content: xss(content),
      article_creator: userId,
      create_time: createTime
    });
  }
}