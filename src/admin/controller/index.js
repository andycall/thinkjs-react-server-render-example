'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let token = await this.session('__CSRF__');
    
    this.assign('token', token);
    
    return this.display();
  }
}