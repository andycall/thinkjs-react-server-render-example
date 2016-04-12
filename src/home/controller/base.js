'use strict';

import path from 'path'
import HomeBundle from '../../../share/home.bundle'

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  async init(http) {
    super.init(http);
    this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');
    this.reactBody = HomeBundle(http);

    var token = await this.session('__CSRF__');
    this.assign('__CSRF__', token);

    this.assign('page', 'home');
    this.assign('html', this.reactBody);
  }
}