'use strict';

import Base from './base.js';
import moment from 'moment'
import Promise from 'bluebird'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let postId = this.get('post_id');
    let postContent = await this.getContent(postId);
    let commentContent = await this.getComment(postId);
    this.__CLIENT_DATA__.postContent = postContent;
    this.__CLIENT_DATA__.commentContent = commentContent;

    return this.display(this.templateFile);
  }

  async getComment (postId) {
    if (!postId) {
      return this.fail('need post id!!!');
    }

    let commentModel = this.model('comment');
    let commentContent = await commentModel.getCommentByArticleId(postId);
    let userModel = this.model('user');

    for (let con of commentContent) {
      con.comment_time = moment(parseInt(con.comment_time)).format('YYYY-MM-DD hh:mm');

      if (con.comment_for > 0) {
        let comment_for_user = await userModel.getUserById(con.comment_for);
        con.comment_for_name = comment_for_user.name;
      }
    }

    return commentContent
  }

  async getContent (postId) {
    if (!postId) {
      return this.fail('need post id!!!');
    }

    let articleModel = this.model('article');
    let userModel = this.model('user');
    let articleContent = await articleModel.getArticleById(postId);
    let user = await userModel.getUserById(articleContent.article_creator);

    articleContent.name = user.name;
    articleContent.create_time = moment(parseInt(articleContent.create_time)).format('YYYY-MM-DD hh:mm');

    return articleContent;
  }

  async contentAction () {
    let postId = this.get('post_id');
    let postContent = await this.getContent(postId);

    return this.success(postContent);
  }

  async commentAction () {
    let isLogin = await this.isLogin();
    let method = this.method();

    if (!isLogin) {
      this.redirect('/home/login');
    }

    if (method == 'get') {
      let postId = this.get('post_id');
      let commentContent = await this.getComment(postId);

      return this.success(commentContent);
    }
    else if (method === 'post') {
      let postId = this.post('post_id');
      let commentText = this.post('comment_text');
      let commentFor = this.post('comment_for') || -1;
      let commentId = this.post('comment_id');

      let commentModel = this.model('comment');
      let user = await this.session('userInfo');

      let writeResult = await commentModel.writeComment(parseInt(postId), user.id, commentText, parseInt(commentFor), commentId);

      if (typeof writeResult !== 'string') {
        return this.success(writeResult);
      }
      else {
        return this.fail(writeResult);
      }
    }
  }
}