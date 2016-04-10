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
    
    return this.display();
  }
  
  loginAction () {
    
  }
}