'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let postId = this.get('post_id');
    let postContent = await this.getContent(postId);
    this.__CLIENT_DATA__.postContent = postContent;

    return this.display(this.templateFile);
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

    return articleContent;
  }

  async contentAction () {
    let postId = this.get('post_id');
    let postContent = await this.getContent(postId);

    return this.success(postContent);
  }
}