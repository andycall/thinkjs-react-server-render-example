'use strict';

import path from 'path'

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  init(http) {
    super.init(http);

    this.templateFile = path.join(__dirname, '../../../view/home/index_index.html');

    this.assign('html', this.http._reactBody);
  }
}