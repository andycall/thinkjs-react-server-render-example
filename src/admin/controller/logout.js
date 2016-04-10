'use strict'

import Base from './base.js'

export default class extends Base {
  async indexAction() {
    await this.session('userInfo', '');
    
    return this.redirect('/')
  }
}