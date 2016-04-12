'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    var token = await this.session('__CSRF__'); 
    var userInfo = await this.session('userInfo');
    
    this.assign('page', 'home');   
    this.assign('__CSRF__', token);
    this.assign('html', this.http._body);
    
    return this.display();
  }
}