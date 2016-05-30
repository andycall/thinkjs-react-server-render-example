'use strict';
import xss from 'xss'

/**
 * model
 */
export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = "comment"
  }

  async writeComment (articleId, userId, commentContent, commentFor, commentId) {
    let createTime = +new Date();

    return await this.add({
      article_id: articleId,
      user_id: userId,
      comment_content: xss(commentContent),
      comment_time: createTime,
      comment_for: commentFor,
      comment_for_id: commentId
    })
  }
  
  async getCommentByArticleId (articleId) {
    let sql = this.parseSql(`select lawyer_comment.*, name, avatar from lawyer_user
	right join lawyer_comment
	on lawyer_user.id = lawyer_comment.user_id where lawyer_comment.article_id=${articleId}`);

    return await this.query(sql);
  }
}